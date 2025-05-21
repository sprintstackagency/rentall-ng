
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { MockDataProvider } from "@/context/MockDataContext";

// Pages
import Index from "./pages/Index";
import AuthLayout from "./pages/auth/auth-layout";
import RenterDashboard from "./pages/dashboard/renter-dashboard";
import VendorDashboard from "./pages/dashboard/vendor-dashboard";
import AdminDashboard from "./pages/dashboard/admin-dashboard";
import ListingsPage from "./pages/listings/listings-page";
import ItemDetail from "./pages/listings/item-detail";
import ProfilePage from "./pages/profile/profile-page";
import AddListingPage from "./pages/vendor/add-listing";
import ManageListingsPage from "./pages/vendor/manage-listings";
import { DashboardLayout } from "./pages/dashboard/dashboard-layout";
import NotFound from "./pages/NotFound";
import { HowItWorksPage } from "./pages/info/how-it-works";
import { AboutPage } from "./pages/info/about";
import PaymentCallback from "./pages/payment/callback";
import BlogPage from "./pages/info/blog";
import CareersPage from "./pages/info/careers";
import PressPage from "./pages/info/press";
import HelpCenterPage from "./pages/info/help-center";
import SafetyInfoPage from "./pages/info/safety-info";
import CancellationPage from "./pages/info/cancellation";
import ContactPage from "./pages/info/contact";
import TermsPage from "./pages/info/terms";
import PrivacyPage from "./pages/info/privacy";
import CookiesPage from "./pages/info/cookies";
import SitemapPage from "./pages/info/sitemap";

// Create the query client outside the component to avoid recreation on every render
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <MockDataProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth/:tab" element={<AuthLayout />} />
                  
                  {/* Dashboard routes */}
                  <Route path="/dashboard" element={<DashboardLayout><RenterDashboard /></DashboardLayout>} />
                  <Route path="/vendor" element={<DashboardLayout allowedRoles={["vendor", "admin"]}><VendorDashboard /></DashboardLayout>} />
                  <Route path="/admin" element={<DashboardLayout allowedRoles={["admin"]}><AdminDashboard /></DashboardLayout>} />
                  
                  {/* Listings */}
                  <Route path="/listings" element={<ListingsPage />} />
                  <Route path="/listings/:id" element={<ItemDetail />} />
                  
                  {/* Vendor routes */}
                  <Route path="/vendor/add-listing" element={<DashboardLayout allowedRoles={["vendor", "admin"]}><AddListingPage /></DashboardLayout>} />
                  <Route path="/vendor/manage-listings" element={<DashboardLayout allowedRoles={["vendor", "admin"]}><ManageListingsPage /></DashboardLayout>} />
                  
                  {/* Profile */}
                  <Route path="/profile" element={<DashboardLayout><ProfilePage /></DashboardLayout>} />
                  
                  {/* Payment */}
                  <Route path="/payment/callback" element={<PaymentCallback />} />
                  
                  {/* Info pages */}
                  <Route path="/how-it-works" element={<HowItWorksPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/press" element={<PressPage />} />
                  
                  {/* Support pages */}
                  <Route path="/help" element={<HelpCenterPage />} />
                  <Route path="/safety" element={<SafetyInfoPage />} />
                  <Route path="/cancellation" element={<CancellationPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  
                  {/* Legal pages */}
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/cookies" element={<CookiesPage />} />
                  <Route path="/sitemap" element={<SitemapPage />} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </TooltipProvider>
            </MockDataProvider>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
