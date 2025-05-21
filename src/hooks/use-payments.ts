
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

export interface PaymentData {
  authorization_url: string;
  reference: string;
}

export function usePayments() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const initializePayment = async (rentalId: string) => {
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error("You must be logged in to make a payment");
      }

      const { data, error } = await supabase.functions.invoke('initialize-payment', {
        body: { rentalId },
      });

      if (error) {
        throw new Error(error.message || 'Failed to initialize payment');
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to initialize payment');
      }

      // Redirect to Paystack checkout
      window.location.href = data.data.authorization_url;
      return data.data;
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message || "An error occurred while processing your payment",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPayment = async (reference: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { reference },
      });

      if (error) {
        throw new Error(error.message || 'Failed to verify payment');
      }

      if (!data.success) {
        throw new Error(data.error || 'Payment verification failed');
      }

      toast({
        title: "Payment Successful",
        description: "Your payment has been verified successfully",
      });

      return data;
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "An error occurred while verifying your payment",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initializePayment,
    verifyPayment,
    isLoading,
  };
}
