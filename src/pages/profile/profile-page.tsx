
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, User, Phone, Mail, MapPin, Shield } from "lucide-react";
import { ImageUpload } from "@/components/image-upload";
import { supabase } from "@/integrations/supabase/client";

export function ProfilePage() {
  const { user, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    avatar: [] as string[],
  });

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        avatar: user.avatar ? [user.avatar] : [],
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (images: string[]) => {
    setFormData((prev) => ({
      ...prev,
      avatar: images,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to update your profile.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        avatar: formData.avatar.length > 0 ? formData.avatar[0] : null,
      };
      
      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Refresh the profile data in context
      await refreshProfile();
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-10">
        <div className="container max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Manage your personal information</CardDescription>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsEditing(!isEditing)}
                      disabled={isLoading}
                    >
                      {isEditing ? "Cancel" : <><Pencil className="h-4 w-4 mr-2" /> Edit</>}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                        <div className="flex-shrink-0">
                          {isEditing ? (
                            <Label 
                              htmlFor="image-upload" 
                              className="cursor-pointer block"
                            >
                              <ImageUpload
                                images={formData.avatar}
                                onChange={handleAvatarChange}
                                maxImages={1}
                                singleImage={true}
                                bucketName="avatars"
                                folderPath="profiles"
                                variant="avatar"
                                imageClassName="w-24 h-24 rounded-full"
                              />
                            </Label>
                          ) : (
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                              {formData.avatar.length > 0 ? (
                                <img 
                                  src={formData.avatar[0]} 
                                  alt={formData.name} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <User className="h-12 w-12 text-muted-foreground" />
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-1">
                          <h3 className="text-xl font-medium">{user?.name}</h3>
                          <p className="text-sm text-muted-foreground">{user?.email}</p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Shield className="h-3 w-3 mr-1" />
                            <span className="capitalize">{user?.role} Account</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          {isEditing ? (
                            <Input 
                              id="name" 
                              name="name" 
                              value={formData.name} 
                              onChange={handleChange} 
                              disabled={isLoading}
                            />
                          ) : (
                            <div className="flex items-center h-10 px-3 rounded-md border bg-background">
                              <User className="h-4 w-4 mr-2 text-muted-foreground" />
                              {formData.name || "Not provided"}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <div className="flex items-center h-10 px-3 rounded-md border bg-background">
                            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                            {formData.email || "Not provided"}
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          {isEditing ? (
                            <Input 
                              id="phone" 
                              name="phone" 
                              value={formData.phone} 
                              onChange={handleChange} 
                              disabled={isLoading}
                            />
                          ) : (
                            <div className="flex items-center h-10 px-3 rounded-md border bg-background">
                              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                              {formData.phone || "Not provided"}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          {isEditing ? (
                            <Input 
                              id="address" 
                              name="address" 
                              value={formData.address} 
                              onChange={handleChange} 
                              disabled={isLoading}
                            />
                          ) : (
                            <div className="flex items-center h-10 px-3 rounded-md border bg-background">
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              {formData.address || "Not provided"}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="mt-6">
                        <Button 
                          type="submit" 
                          className="bg-brand hover:bg-brand-dark"
                          disabled={isLoading}
                        >
                          {isLoading ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and account security</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                      <Button className="bg-brand hover:bg-brand-dark mt-2">Update Password</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Manage your notification and display preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">
                    Preferences will be available soon. Check back later for updates.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default ProfilePage;
