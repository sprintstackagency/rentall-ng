
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useMockData } from "@/context/MockDataContext";
import { Link } from "react-router-dom";
import { Users, ShoppingCart, Package, AlertTriangle, Settings } from "lucide-react";

export function AdminDashboard() {
  const { user } = useAuth();
  const { items, rentals } = useMockData();

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, listings, and system settings</p>
        </div>
        
        <Button asChild variant="outline" className="button-hover-effect">
          <Link to="/admin/settings">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">248</p>
              </div>
              <div className="p-2 bg-brand-light rounded-full text-brand">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-4">
              <span className="text-green-500">↑12%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Rentals</p>
                <p className="text-2xl font-bold">32</p>
              </div>
              <div className="p-2 bg-brand-light rounded-full text-brand">
                <ShoppingCart className="h-5 w-5" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-4">
              <span className="text-green-500">↑8%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Listings</p>
                <p className="text-2xl font-bold">{items.length + 42}</p>
              </div>
              <div className="p-2 bg-brand-light rounded-full text-brand">
                <Package className="h-5 w-5" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-4">
              <span className="text-green-500">↑15%</span> from last month
            </div>
          </CardContent>
        </Card>
        
        <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-y-0">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Issues Reported</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div className="p-2 bg-destructive/10 rounded-full text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-4">
              <span className="text-red-500">↑2</span> unresolved
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Users */}
        <Card className="animate-fade-in lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>New users joined in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array(5).fill(null).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-xs">
                        {String.fromCharCode(65 + i)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">User_{10 + i}</p>
                      <p className="text-xs text-muted-foreground">
                        {i % 2 === 0 ? "Renter" : "Vendor"}
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {i} day{i !== 1 ? "s" : ""} ago
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="link" className="text-brand">
              <Link to="/admin/users">View all users</Link>
            </Button>
          </CardFooter>
        </Card>
        
        {/* Recent Transactions */}
        <Card className="animate-fade-in lg:col-span-2" style={{ animationDelay: "0.1s" }}>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest rental transactions in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-5 text-xs font-medium text-muted-foreground">
                <div className="col-span-2">Item</div>
                <div>Renter</div>
                <div>Amount</div>
                <div>Status</div>
              </div>
              
              {Array(5).fill(null).map((_, i) => {
                const randomStatus = ["completed", "active", "pending"][Math.floor(Math.random() * 3)];
                const statusColors = {
                  completed: "bg-green-100 text-green-800",
                  active: "bg-blue-100 text-blue-800",
                  pending: "bg-yellow-100 text-yellow-800"
                };
                
                return (
                  <div key={i} className="grid grid-cols-5 items-center">
                    <div className="col-span-2 font-medium">
                      {["Premium Sound System", "LED Party Lights", "Catering Kit", "Event Chairs", "Balloon Decoration Kit"][i]}
                    </div>
                    <div>User_{5 + i}</div>
                    <div>${(Math.floor(Math.random() * 20) + 1) * 50}</div>
                    <div>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${statusColors[randomStatus as keyof typeof statusColors]}`}>
                        {randomStatus}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="link" className="text-brand">
              <Link to="/admin/transactions">View all transactions</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
