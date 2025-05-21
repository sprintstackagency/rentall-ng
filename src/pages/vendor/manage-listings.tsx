
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { itemsService } from "@/services/api";
import { Item } from "@/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash, Plus, Image } from "lucide-react";

export function ManageListingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [listings, setListings] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        if (user?.id) {
          setIsLoading(true);
          const items = await itemsService.getByVendorId(user.id);
          setListings(items);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
        toast({
          title: "Failed to load listings",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [user]);

  const handleDelete = async () => {
    if (!itemToDelete) return;
    
    try {
      await itemsService.delete(itemToDelete);
      setListings(listings.filter(item => item.id !== itemToDelete));
      toast({
        title: "Listing deleted",
        description: "Your listing has been removed successfully",
      });
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast({
        title: "Delete failed",
        description: "There was an error deleting your listing",
        variant: "destructive",
      });
    } finally {
      setItemToDelete(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Manage Listings</h1>
              <p className="text-muted-foreground mt-1">
                View, edit, and manage your equipment listings
              </p>
            </div>
            <Button
              onClick={() => navigate("/vendor/add-listing")}
              className="bg-brand hover:bg-brand-dark"
            >
              <Plus className="mr-2 h-4 w-4" /> Add New Listing
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="p-4 h-64 animate-pulse">
                  <div className="bg-muted h-32 w-full rounded-md mb-4"></div>
                  <div className="bg-muted h-4 w-3/4 rounded mb-2"></div>
                  <div className="bg-muted h-4 w-1/2 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="bg-muted h-8 w-20 rounded"></div>
                    <div className="bg-muted h-8 w-20 rounded"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-16 bg-muted rounded-lg">
              <div className="mx-auto w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No listings yet</h2>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You haven't added any equipment for rent yet. Start by adding your first listing.
              </p>
              <Button
                onClick={() => navigate("/vendor/add-listing")}
                className="bg-brand hover:bg-brand-dark"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Your First Listing
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    {item.images && item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold truncate">{item.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <p className="font-bold text-lg">₦{item.price.toFixed(2)}/day</p>
                      <p className="text-sm text-muted-foreground">{item.quantity} available</p>
                    </div>
                    <div className="flex justify-between mt-4 gap-2">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => navigate(`/vendor/edit-listing/${item.id}`)}
                      >
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="flex-1 text-destructive hover:text-destructive"
                            onClick={() => setItemToDelete(item.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" /> Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your listing.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setItemToDelete(null)}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDelete}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ManageListingsPage;
