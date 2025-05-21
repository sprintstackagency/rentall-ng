
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { usePayments } from "@/hooks/use-payments";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

const PaymentCallback = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyPayment } = usePayments();

  useEffect(() => {
    const verifyTransaction = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const reference = params.get("reference");
        
        if (!reference) {
          setStatus("error");
          setMessage("No reference found in the URL");
          return;
        }
        
        // Verify the payment with our backend
        await verifyPayment(reference);
        setStatus("success");
        setMessage("Your payment has been successfully processed.");
      } catch (error: any) {
        console.error("Payment verification error:", error);
        setStatus("error");
        setMessage(error.message || "There was an error verifying your payment");
      }
    };

    verifyTransaction();
  }, [location.search, verifyPayment]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Payment {status === "loading" ? "Processing" : status === "success" ? "Successful" : "Failed"}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4 py-8">
          {status === "loading" ? (
            <Loader2 className="h-16 w-16 text-brand animate-spin" />
          ) : status === "success" ? (
            <CheckCircle className="h-16 w-16 text-green-500" />
          ) : (
            <XCircle className="h-16 w-16 text-destructive" />
          )}
          
          <p className="text-center text-muted-foreground">{message}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            onClick={() => navigate(status === "success" ? "/dashboard" : "/")}
            className={status === "success" ? "bg-brand hover:bg-brand-dark" : ""}
          >
            {status === "success" ? "Go to Dashboard" : "Return to Home"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentCallback;
