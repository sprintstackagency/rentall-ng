
import React from "react";
import { Button } from "@/components/ui/button";
import { useMockData } from "@/context/MockDataContext";
import { ItemCard } from "@/components/item-card";
import { Link } from "react-router-dom";

export function FeaturedItems() {
  const { getFeaturedItems } = useMockData();
  const featuredItems = getFeaturedItems();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Equipment</h2>
            <p className="text-muted-foreground">
              Discover our most popular rental items for your next event.
            </p>
          </div>
          <Button asChild variant="outline" className="button-hover-effect">
            <Link to="/listings">View All Equipment</Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
