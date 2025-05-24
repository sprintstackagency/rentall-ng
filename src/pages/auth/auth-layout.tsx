
import React, { useEffect } from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthTabs } from "./auth-tabs";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "lucide-react";

export function AuthLayout() {
  const { tab } = useParams<{ tab: string }>();
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();
  
  // Validate tab parameter
  const validTab = tab === "login" || tab === "signup" ? tab : "login";
  
  // Get redirect URL from location state or default based on role
  const from = location.state?.from?.pathname;

  useEffect(() => {
    console.log("🔍 Auth Layout - State:", { 
      isAuthenticated, 
      isLoading, 
      user: user?.name,
      role: user?.role,
      from 
    });
  }, [isAuthenticated, isLoading, user, from]);
  
  // Show loading spinner while checking authentication
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
  
  // If user is already authenticated, redirect appropriately
  if (isAuthenticated && user) {
    let redirectPath = from;
    
    // If no specific redirect path, use role-based default
    if (!redirectPath || redirectPath === "/auth/login" || redirectPath === "/auth/signup") {
      if (user.role === "admin") {
        redirectPath = "/admin";
      } else if (user.role === "vendor") {
        redirectPath = "/vendor";
      } else {
        redirectPath = "/dashboard";
      }
    }
    
    console.log(`✅ User authenticated, redirecting to: ${redirectPath}`);
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <AuthTabs defaultTab={validTab as "login" | "signup"} />
      </main>
      <Footer />
    </div>
  );
}

export default AuthLayout;
