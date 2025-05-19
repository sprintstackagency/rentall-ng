
import React from "react";
import { useMockData } from "@/context/MockDataContext";
import { CategoryCard } from "@/components/category-card";

export function PopularCategories() {
  const { categories } = useMockData();

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Browse by Category</h2>
          <p className="text-muted-foreground">
            Explore our wide range of rental equipment categories to find exactly what you need.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
