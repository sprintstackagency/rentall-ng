
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useMockData } from "@/context/MockDataContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon, MapPin, Star, ChevronLeft, User, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getItemById } = useMockData();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const item = getItemById(id || "");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });
  
  if (!item) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="container py-12 flex-1">
          <Button onClick={() => navigate("/listings")} variant="outline" className="mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </Button>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Item Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The item you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate("/listings")} className="bg-brand hover:bg-brand-dark">
              Browse Other Equipment
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qty = parseInt(e.target.value);
    if (!isNaN(qty) && qty > 0 && qty <= item.quantity) {
      setSelectedQuantity(qty);
    }
  };

  const calculateTotalDays = () => {
    if (!dateRange.to) return 1;
    const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const calculateTotalPrice = () => {
    const days = calculateTotalDays();
    return selectedQuantity * item.price * days;
  };

  const handleRentNow = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in or sign up to rent equipment",
        variant: "destructive",
      });
      navigate("/auth/login", { state: { from: location } });
      return;
    }

    // Mock rental success
    toast({
      title: "Rental Request Submitted!",
      description: `Your rental request for ${item.title} has been received.`,
    });

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="container py-8">
          <Button onClick={() => navigate("/listings")} variant="outline" className="mb-4">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Listings
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Item details */}
            <div className="lg:col-span-2">
              {/* Image gallery */}
              <div className="bg-muted rounded-lg overflow-hidden mb-6">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full aspect-video object-cover"
                  />
                ) : (
                  <div className="w-full aspect-video flex items-center justify-center text-muted-foreground">
                    No image available
                  </div>
                )}
              </div>
              
              {/* Item info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>4.8 (24 reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>Available in your area</span>
                    </div>
                  </div>
                </div>
                
                <Tabs defaultValue="details">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="pt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">About This Equipment</h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="bg-muted p-4 rounded-md">
                          <div className="text-sm font-medium">Available Quantity</div>
                          <div className="text-2xl font-bold mt-1">{item.quantity}</div>
                        </div>
                        <div className="bg-muted p-4 rounded-md">
                          <div className="text-sm font-medium">Daily Rate</div>
                          <div className="text-2xl font-bold mt-1">${item.price.toFixed(2)}</div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <h3 className="text-lg font-semibold mb-2">About the Vendor</h3>
                        <div className="flex items-center gap-3">
                          <div className="bg-muted rounded-full p-2">
                            <User className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-medium">{item.vendorName}</p>
                            <p className="text-sm text-muted-foreground">
                              Member since {new Date(item.createdAt).getFullYear()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features" className="pt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Equipment Features</h3>
                      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        <li>High-quality performance and reliability</li>
                        <li>Professional-grade components</li>
                        <li>Setup assistance available</li>
                        <li>Comes with all necessary cables and accessories</li>
                        <li>Delivery and pickup options available</li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="pt-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Customer Reviews</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="font-medium">4.8</span>
                          <span className="text-muted-foreground ml-1">(24 reviews)</span>
                        </div>
                      </div>
                      
                      {/* Review examples */}
                      <div className="space-y-4">
                        {["Jane D.", "Michael S.", "Sarah T."].map((name, i) => (
                          <Card key={i}>
                            <CardContent className="p-4">
                              <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="bg-muted rounded-full p-1">
                                    <User className="h-4 w-4" />
                                  </div>
                                  <span className="font-medium">{name}</span>
                                </div>
                                <div className="flex">
                                  {Array(5).fill(null).map((_, starIdx) => (
                                    <Star 
                                      key={starIdx} 
                                      className={cn(
                                        "h-4 w-4", 
                                        starIdx < (5 - i * 0.5) ? "text-yellow-400" : "text-muted"
                                      )} 
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm mt-2">
                                {[
                                  "Great equipment, worked perfectly for our event. The vendor was very helpful with setup.",
                                  "Quality rental, everything was as described. Would rent again for future events.",
                                  "The equipment was clean and in excellent condition. Delivery was on time."
                                ][i]}
                              </p>
                              <div className="text-xs text-muted-foreground mt-2">
                                {["3 weeks ago", "1 month ago", "2 months ago"][i]}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Right column - Booking widget */}
            <div className="lg:col-span-1">
              <Card className="animate-fade-in sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">${item.price.toFixed(2)} / day</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="dates">Rental Dates</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="dates"
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange.from ? (
                              dateRange.to ? (
                                <>
                                  {format(dateRange.from, "LLL dd, y")} -{" "}
                                  {format(dateRange.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(dateRange.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Select dates</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={dateRange.from}
                            selected={dateRange}
                            onSelect={(range) => setDateRange({
                              from: range?.from || new Date(),
                              to: range?.to
                            })}
                            numberOfMonths={1}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min={1}
                        max={item.quantity}
                        value={selectedQuantity}
                        onChange={handleQuantityChange}
                      />
                      <p className="text-xs text-muted-foreground">
                        {item.quantity} available
                      </p>
                    </div>
                    
                    <div className="pt-2 space-y-4">
                      <div className="flex justify-between">
                        <span>
                          ${item.price.toFixed(2)} x {selectedQuantity} {selectedQuantity === 1 ? "item" : "items"}
                        </span>
                        <span>${(item.price * selectedQuantity).toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span>
                          {calculateTotalDays()} {calculateTotalDays() === 1 ? "day" : "days"}
                        </span>
                        <span>x{calculateTotalDays()}</span>
                      </div>
                      
                      <div className="border-t pt-4 flex justify-between font-bold">
                        <span>Total</span>
                        <span>${calculateTotalPrice().toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleRentNow}
                      className="w-full bg-brand hover:bg-brand-dark"
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Rent Now
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      You won't be charged yet
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ItemDetail;
