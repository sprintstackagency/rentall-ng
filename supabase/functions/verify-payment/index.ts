
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Handle CORS preflight requests
function handleCors(req: Request) {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }
  return null;
}

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Get Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get Paystack secret key
    const paystackSecretKey = Deno.env.get("PAYSTACK_SECRET_KEY");
    if (!paystackSecretKey) {
      throw new Error("Paystack secret key not found");
    }

    // Verify this is from Paystack
    const hash = req.headers.get("x-paystack-signature");
    const body = await req.text();
    
    // For simplicity, we're not verifying the signature in this example
    // In production, you should verify the signature
    // const expectedHash = crypto.createHmac('sha512', paystackSecretKey).update(body).digest('hex');
    // if (hash !== expectedHash) {
    //   throw new Error("Invalid signature");
    // }

    const event = JSON.parse(body);
    const { event: eventType, data } = event;

    if (eventType === "charge.success") {
      const reference = data.reference;
      
      // Verify transaction status with Paystack API
      const verifyResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${paystackSecretKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!verifyResponse.ok) {
        throw new Error("Failed to verify transaction with Paystack");
      }

      const verificationData = await verifyResponse.json();
      
      if (verificationData.data.status === "success") {
        // Update transaction status
        const { data: transaction, error: transactionError } = await supabase
          .from("transactions")
          .update({ status: "success" })
          .eq("reference", reference)
          .select()
          .single();

        if (transactionError) {
          throw new Error(transactionError.message);
        }

        // Update rental status
        await supabase
          .from("rentals")
          .update({ status: "accepted" })
          .eq("id", transaction.rental_id);

        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
    }

    return new Response(JSON.stringify({ success: true, message: "Event processed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
