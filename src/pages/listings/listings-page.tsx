
import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useMockData } from "@/context/MockDataContext";
import { ItemCard } from "@/components/item-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { CategoryCard } from "@/components/category-card";
import { Search, Filter } from "lucide-react";

interface ListingFilters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
}

export function ListingsPage() {
  const { items, categories } = useMockData();
  const [filters, setFilters] = useState<ListingFilters>({
    search: "",
    category: "",
    minPrice: 0,
    maxPrice: 500,
    sortBy: "newest",
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (key: keyof ListingFilters, value: string | number) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "",
      minPrice: 0,
      maxPrice: 500,
      sortBy: "newest",
    });
  };

  // Apply filters to items
  const filteredItems = items.filter((item) => {
    return (
      (filters.search === "" || 
        item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.category === "" || item.category === filters.category) &&
      item.price >= filters.minPrice &&
      item.price <= filters.maxPrice
    );
  });

  // Sort items
  const sortedItems = filteredItems.sort((a, b) => {
    switch (filters.sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "newest":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-muted">
          <div className="container py-8">
            <h1 className="text-3xl font-bold mb-2">Equipment Listings</h1>
            <p className="text-muted-foreground">Browse and rent high-quality event equipment from trusted vendors</p>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search equipment..."
                  className="pl-10"
                  value={filters.search}
                  onChange={(e) => handleFilterChange("search", e.target.value)}
                />
              </div>
              <div className="w-full sm:w-auto flex gap-2">
                <Select 
                  value={filters.sortBy} 
                  onValueChange={(value) => handleFilterChange("sortBy", value)}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={toggleFilters} className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
            
            {/* Advanced filters - shown when expanded */}
            {showFilters && (
              <div className="mt-4 p-4 border rounded-md bg-background animate-fade-in">
                <h3 className="font-medium mb-4">Filters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Category</label>
                    <Select 
                      value={filters.category} 
                      onValueChange={(value) => handleFilterChange("category", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-categories">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="col-span-1 sm:col-span-2">
                    <div className="mb-1">
                      <label className="text-sm font-medium block">Price Range</label>
                      <div className="text-xs text-muted-foreground flex justify-between">
                        <span>${filters.minPrice}</span>
                        <span>${filters.maxPrice}</span>
                      </div>
                    </div>
                    <Slider
                      min={0}
                      max={500}
                      step={10}
                      value={[filters.minPrice, filters.maxPrice]}
                      onValueChange={(values) => {
                        handleFilterChange("minPrice", values[0]);
                        handleFilterChange("maxPrice", values[1]);
                      }}
                      className="py-4"
                    />
                  </div>
                  
                  <div className="flex items-end">
                    <Button onClick={resetFilters} variant="outline" className="w-full">
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Categories section */}
        <div className="container py-8">
          <h2 className="text-xl font-semibold mb-4">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
        
        {/* Listings grid */}
        <div className="container py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Available Equipment</h2>
            <p className="text-sm text-muted-foreground">
              {sortedItems.length} item{sortedItems.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          {sortedItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg font-medium mb-2">No items found</p>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={resetFilters} variant="outline">
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ListingsPage;
