
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

const queryClient = new QueryClient();

const App = () => (
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
              
              {/* Info pages */}
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/about" element={<AboutPage />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </MockDataProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
