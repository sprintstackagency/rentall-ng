
import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "./landing/hero-section";
import { FeaturesSection } from "./landing/features-section";
import { PopularCategories } from "./landing/popular-categories";
import { FeaturedItems } from "./landing/featured-items";
import { Testimonials } from "./landing/testimonials";
import { CtaSection } from "./landing/cta-section";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PopularCategories />
        <FeaturedItems />
        <Testimonials />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
