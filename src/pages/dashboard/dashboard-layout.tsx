
import React, { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useAuth } from "@/context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { Loader } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: string[];
}

export function DashboardLayout({
  children,
  requireAuth = true,
  allowedRoles = ["renter", "vendor", "admin"],
}: DashboardLayoutProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Log auth state for debugging
    console.log("Dashboard Layout - Auth State:", { 
      isAuthenticated, 
      isLoading, 
      user: user?.name,
      role: user?.role 
    });
  }, [isAuthenticated, isLoading, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader className="h-8 w-8 animate-spin text-brand" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated, redirect to login
  if (requireAuth && !isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // If user's role is not allowed for this page
  if (requireAuth && isAuthenticated && user && !allowedRoles.includes(user.role)) {
    console.log("Role not allowed, redirecting to appropriate dashboard");
    // Redirect to appropriate dashboard based on role
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (user.role === "vendor") {
      return <Navigate to="/vendor" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
