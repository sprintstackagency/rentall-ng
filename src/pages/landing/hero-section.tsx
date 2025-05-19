
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function HeroSection() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-brand-light to-background">
      <div className="container flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in">
            Rent <span className="text-brand">Premium Equipment</span> for Your Next Event
          </h1>
          <p className="text-xl text-muted-foreground animate-slide-in">
            Access top-quality sound systems, lighting, catering supplies, and more - without the hassle of ownership.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {isAuthenticated ? (
              <Button asChild size="lg" className="bg-brand hover:bg-brand-dark button-hover-effect">
                <Link to="/listings">Browse Equipment</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-brand hover:bg-brand-dark button-hover-effect">
                  <Link to="/auth/signup">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="button-hover-effect">
                  <Link to="/listings">Browse Equipment</Link>
                </Button>
              </>
            )}
          </div>
          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center ring-2 ring-background text-xs">
                AB
              </div>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center ring-2 ring-background text-xs">
                CD
              </div>
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center ring-2 ring-background text-xs">
                EF
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Trusted by <span className="font-medium text-foreground">500+</span> users
            </p>
          </div>
        </div>
        <div className="flex-1 flex justify-center animate-fade-in">
          <div className="aspect-video max-w-lg w-full bg-muted rounded-lg shadow-lg overflow-hidden relative">
            <img 
              src="/placeholder.svg" 
              alt="Event Equipment" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <div className="text-white font-bold text-sm md:text-xl">Demo Image: Event Equipment</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
