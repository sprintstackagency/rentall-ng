
import React from "react";
import { useParams, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthTabs } from "./auth-tabs";
import { useAuth } from "@/context/AuthContext";

export function AuthLayout() {
  const { tab } = useParams<{ tab: string }>();
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  // If valid tab is not provided, navigate to login
  const validTab = tab === "login" || tab === "signup" ? tab : "login";
  
  // Get the redirect URL from the location state or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";
  
  // If user is already authenticated, redirect to the intended page
  if (isAuthenticated && !isLoading) {
    return <Navigate to={from} replace />;
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
