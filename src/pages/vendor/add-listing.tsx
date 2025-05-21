
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMockData } from "@/context/MockDataContext";
import { useAuth } from "@/context/AuthContext";
import { Plus, Minus } from "lucide-react";
import { ImageUpload } from "@/components/image-upload";
import { supabase } from "@/integrations/supabase/client";
import { formatNairaPrice, formatNairaFull } from "@/utils/price-formatter";

export function AddListingPage() {
  const { categories } = useMockData();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "1",
    category: "",
    images: [] as string[],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleImagesChange = (images: string[]) => {
    setFormData((prev) => ({
      ...prev,
      images: images,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.title || !formData.description || !formData.price || !formData.category) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (!user?.id) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a listing.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Create the listing in the database
      const { data, error } = await supabase
        .from("items")
        .insert({
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          quantity: Number(formData.quantity),
          category: formData.category,
          images: formData.images,
          vendor_id: user.id,
        })
        .select();
      
      if (error) {
        console.error("Error creating listing:", error);
        throw new Error(error.message);
      }
      
      toast({
        title: "Listing created",
        description: "Your equipment has been listed successfully.",
      });
      
      navigate("/vendor/manage-listings");
    } catch (error: any) {
      console.error("Error creating listing:", error);
      toast({
        title: "Listing failed",
        description: error.message || "There was an error creating your listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Add New Listing</h1>
            <p className="text-muted-foreground mt-1">List your equipment for rent on RentAll.ng</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Equipment Details</CardTitle>
              <CardDescription>
                Provide detailed information about the equipment you want to rent out
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Professional DJ Sound System"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">
                    Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your equipment in detail, including specs, condition, and any included accessories..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Daily Price (₦) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      placeholder="e.g., 5000"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                    {formData.price && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatNairaFull(formData.price)} per day
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="quantity">
                      Quantity Available <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => {
                          const currentValue = parseInt(formData.quantity);
                          if (currentValue > 1) {
                            setFormData((prev) => ({
                              ...prev,
                              quantity: (currentValue - 1).toString(),
                            }));
                          }
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min="1"
                        className="text-center mx-2"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => {
                          const currentValue = parseInt(formData.quantity);
                          setFormData((prev) => ({
                            ...prev,
                            quantity: (currentValue + 1).toString(),
                          }));
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Category <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => handleSelectChange("category", value)}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <ImageUpload
                  images={formData.images}
                  onChange={handleImagesChange}
                  maxImages={5}
                />
                
                <div className="pt-4 border-t flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/vendor/manage-listings")}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-brand hover:bg-brand-dark"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Listing"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AddListingPage;
