import React, { useState, useEffect } from "react";
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
import { Search, Filter, Loader } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Item } from "@/types";
import { itemsService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";

interface ListingFilters {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
}

export function ListingsPage() {
  const { categories } = useMockData();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [filters, setFilters] = useState<ListingFilters>({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    minPrice: Number(searchParams.get("minPrice")) || 0,
    maxPrice: Number(searchParams.get("maxPrice")) || 50000,
    sortBy: searchParams.get("sortBy") || "newest",
  });
  
  const [showFilters, setShowFilters] = useState(!!searchParams.get("category"));
  
  // Fetch items from the API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const fetchedItems = await itemsService.getAll();
        setItems(fetchedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
        toast({
          title: "Failed to load listings",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchItems();
  }, []);
  
  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.search) params.set("search", filters.search);
    if (filters.category) params.set("category", filters.category);
    if (filters.minPrice > 0) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice < 50000) params.set("maxPrice", filters.maxPrice.toString());
    if (filters.sortBy !== "newest") params.set("sortBy", filters.sortBy);
    
    setSearchParams(params);
  }, [filters, setSearchParams]);
  
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
      maxPrice: 50000,
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

  // Format price in Naira
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

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
                        <SelectItem value="">All Categories</SelectItem>
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
                        <span>{formatPrice(filters.minPrice)}</span>
                        <span>{formatPrice(filters.maxPrice)}</span>
                      </div>
                    </div>
                    <Slider
                      min={0}
                      max={50000}
                      step={1000}
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
              <CategoryCard 
                key={category.id} 
                category={category} 
                active={filters.category === category.id}
                onClick={() => {
                  if (filters.category === category.id) {
                    handleFilterChange("category", "");
                  } else {
                    handleFilterChange("category", category.id);
                  }
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Listings grid */}
        <div className="container py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Available Equipment</h2>
            <p className="text-sm text-muted-foreground">
              {isLoading ? (
                <span className="flex items-center">
                  <Loader className="h-3 w-3 mr-2 animate-spin" />
                  Loading...
                </span>
              ) : (
                `${sortedItems.length} item${sortedItems.length !== 1 ? 's' : ''} found`
              )}
            </p>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <Card key={index} className="overflow-hidden card-hover-effect animate-pulse">
                  <div className="aspect-square bg-muted"></div>
                  <CardContent className="p-4">
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-full mb-1"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <div className="h-6 bg-muted rounded w-1/3"></div>
                    <div className="h-8 bg-muted rounded w-1/4"></div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : sortedItems.length > 0 ? (
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
