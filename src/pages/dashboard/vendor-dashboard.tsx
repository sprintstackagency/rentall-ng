
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useMockData } from "@/context/MockDataContext";
import { Link } from "react-router-dom";
import { ArrowUpRight, Package, DollarSign, Calendar } from "lucide-react";

export function VendorDashboard() {
  const { user } = useAuth();
  const { items } = useMockData();
  
  // For the demo, we'll filter to just show first 2 items
  const vendorItems = items.slice(0, 2);

  return (
    <div className="container py-12">
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Left column - Vendor stats */}
        <div className="lg:w-1/3 space-y-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Welcome, {user?.name || "Vendor"}!</CardTitle>
              <CardDescription>Here's how your listings are performing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-4 rounded-md">
                  <div className="text-sm font-medium text-muted-foreground">Active Rentals</div>
                  <div className="text-3xl font-bold mt-2">4</div>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <div className="text-sm font-medium text-muted-foreground">Total Listings</div>
                  <div className="text-3xl font-bold mt-2">{vendorItems.length}</div>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <div className="text-sm font-medium text-muted-foreground">This Month</div>
                  <div className="text-3xl font-bold mt-2">$890</div>
                </div>
                <div className="bg-muted p-4 rounded-md">
                  <div className="text-sm font-medium text-muted-foreground">Total Revenue</div>
                  <div className="text-3xl font-bold mt-2">$2,450</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="outline">
                <Link to="/vendor/rentals">View All Rentals</Link>
              </Button>
              <Button asChild className="bg-brand hover:bg-brand-dark">
                <Link to="/vendor/add-listing">Add New Listing</Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="p-2 bg-brand-light rounded-full text-brand">
                    <DollarSign size={16} />
                  </div>
                  <div>
                    <p className="font-medium">Payment Received</p>
                    <p className="text-sm text-muted-foreground">$250 for Premium Sound System</p>
                  </div>
                  <p className="ml-auto text-xs text-muted-foreground">2 days ago</p>
                </div>
                
                <div className="flex items-center gap-3 border-b pb-4">
                  <div className="p-2 bg-brand-light rounded-full text-brand">
                    <Package size={16} />
                  </div>
                  <div>
                    <p className="font-medium">Listing Updated</p>
                    <p className="text-sm text-muted-foreground">Event Chairs inventory changed</p>
                  </div>
                  <p className="ml-auto text-xs text-muted-foreground">3 days ago</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-light rounded-full text-brand">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <p className="font-medium">New Booking</p>
                    <p className="text-sm text-muted-foreground">Sound System booked for Jun 15</p>
                  </div>
                  <p className="ml-auto text-xs text-muted-foreground">5 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right column - Vendor listings */}
        <div className="lg:w-2/3">
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-1">Your Listings</h2>
            <p className="text-muted-foreground">Manage your equipment listings</p>
          </div>
          
          <div className="space-y-6">
            {vendorItems.map((item) => (
              <Card key={item.id} className="animate-fade-in card-hover-effect">
                <div className="sm:flex">
                  <div className="w-full sm:w-1/4 h-32 sm:h-auto bg-muted">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        No image
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        <span className="text-brand font-bold">${item.price}/day</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <span className="text-sm font-medium">Quantity: {item.quantity}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="inline-flex items-center bg-brand/10 text-brand text-xs px-2 py-1 rounded-full">
                            {item.category === "1" ? "Sound" : item.category === "2" ? "Lighting" : "Equipment"}
                          </span>
                          <span className="inline-flex items-center bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full">
                            {item.quantity > 0 ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm" className="button-hover-effect">
                        <Link to={`/vendor/listings/${item.id}`} className="flex items-center">
                          Manage <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            
            {/* Add New Listing Card */}
            <Card className="animate-fade-in border-dashed">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-40">
                <Package className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">Add New Equipment Listing</h3>
                <Button asChild className="bg-brand hover:bg-brand-dark mt-2 button-hover-effect">
                  <Link to="/vendor/add-listing">Add Listing</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <Button asChild variant="outline" className="button-hover-effect">
              <Link to="/vendor/listings">View All Listings</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorDashboard;
