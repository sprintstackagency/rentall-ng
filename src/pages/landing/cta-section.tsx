
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function CtaSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-16 md:py-24 bg-brand-light">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Rent Equipment for Your Event?</h2>
          <p className="text-lg mb-8 text-muted-foreground">
            Join thousands of event planners who trust RentGear for quality equipment rental.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Button asChild size="lg" className="bg-brand hover:bg-brand-dark button-hover-effect">
                <Link to="/listings">Browse Equipment</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-brand hover:bg-brand-dark button-hover-effect">
                  <Link to="/auth/signup">Sign Up Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="button-hover-effect">
                  <Link to="/listings">Explore Rentals</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
