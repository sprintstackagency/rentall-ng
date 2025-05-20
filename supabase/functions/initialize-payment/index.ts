
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

    // Get request body
    const { rentalId } = await req.json();
    if (!rentalId) {
      throw new Error("Rental ID is required");
    }

    // Get rental details
    const { data: rental, error: rentalError } = await supabase
      .from("rentals")
      .select(`
        *,
        items:item_id (title),
        renter:renter_id (name, email)
      `)
      .eq("id", rentalId)
      .single();

    if (rentalError) {
      throw new Error(rentalError.message);
    }

    if (!rental) {
      throw new Error("Rental not found");
    }

    // Create transaction record
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        rental_id: rentalId,
        amount: rental.total_price,
        status: "pending",
        payment_gateway: "paystack",
      })
      .select()
      .single();

    if (transactionError) {
      throw new Error(transactionError.message);
    }

    // Initialize payment with Paystack
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: rental.renter.email,
        amount: Math.round(Number(rental.total_price) * 100), // Convert to kobo
        reference: transaction.id,
        callback_url: `${Deno.env.get("PUBLIC_SITE_URL") || ""}/payment/callback`,
        metadata: {
          rental_id: rental.id,
          transaction_id: transaction.id,
          custom_fields: [
            {
              display_name: "Item Name",
              variable_name: "item_name",
              value: rental.items.title,
            },
            {
              display_name: "Quantity",
              variable_name: "quantity",
              value: rental.quantity,
            },
          ],
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Paystack error: ${errorData}`);
    }

    const paymentData = await response.json();

    // Update transaction with reference
    await supabase
      .from("transactions")
      .update({ reference: paymentData.data.reference })
      .eq("id", transaction.id);

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          authorization_url: paymentData.data.authorization_url,
          reference: paymentData.data.reference,
        },
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error initializing payment:", error);
    
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
