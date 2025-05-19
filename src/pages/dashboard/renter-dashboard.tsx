
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useMockData } from "@/context/MockDataContext";
import { Link } from "react-router-dom";
import { ItemCard } from "@/components/item-card";

export function RenterDashboard() {
  const { user } = useAuth();
  const { getFeaturedItems } = useMockData();
  
  // For demo, we'll use featured items instead of actual rentals
  const featuredItems = getFeaturedItems();

  return (
    <div className="container py-12">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Left column - User summary and stats */}
        <div className="lg:w-1/3 space-y-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Welcome, {user?.name || "Renter"}!</CardTitle>
              <CardDescription>Here's a summary of your rental activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-md">
                  <div className="text-sm font-medium text-muted-foreground">Active Rentals</div>
                  <div className="text-3xl font-bold mt-2">2</div>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <div className="text-sm font-medium text-muted-foreground">Past Rentals</div>
                  <div className="text-3xl font-bold mt-2">5</div>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <div className="text-sm font-medium text-muted-foreground">Upcoming</div>
                  <div className="text-3xl font-bold mt-2">1</div>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <div className="text-sm font-medium text-muted-foreground">Total Spent</div>
                  <div className="text-3xl font-bold mt-2">$1,250</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="outline">
                <Link to="/rentals">View All Rentals</Link>
              </Button>
              <Button asChild className="bg-brand hover:bg-brand-dark">
                <Link to="/listings">Rent Equipment</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle>Upcoming Rentals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <p className="font-medium">LED Party Lights Pack</p>
                    <p className="text-sm text-muted-foreground">May 25 - May 27, 2023</p>
                  </div>
                  <span className="text-brand font-medium">$240</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sound System - Premium</p>
                    <p className="text-sm text-muted-foreground">June 5 - June 7, 2023</p>
                  </div>
                  <span className="text-brand font-medium">$500</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="link" className="text-brand">
                <Link to="/rentals">See all upcoming rentals</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {/* Right column - Recommended items */}
        <div className="lg:w-2/3">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-1">Recommended for You</h2>
            <p className="text-muted-foreground">Based on your rental history and preferences</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featuredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button asChild className="bg-brand hover:bg-brand-dark">
              <Link to="/listings">Browse All Equipment</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RenterDashboard;
