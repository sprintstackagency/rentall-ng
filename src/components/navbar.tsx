
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, User, LogOut, Package, Home, ShoppingCart, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!user) return "/dashboard";
    
    switch (user.role) {
      case "admin":
        return "/admin";
      case "vendor":
        return "/vendor";
      default:
        return "/dashboard";
    }
  };

  return (
    <header className="border-b bg-background sticky top-0 z-40">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-brand transition-colors">
            Home
          </Link>
          <Link to="/listings" className="text-sm font-medium hover:text-brand transition-colors">
            Explore
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium hover:text-brand transition-colors">
            How It Works
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="button-hover-effect">
                    <User className="h-4 w-4 mr-2" />
                    {user?.name || "Account"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate(getDashboardLink())}>
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  {user?.role === "renter" && (
                    <DropdownMenuItem onClick={() => navigate("/rentals")}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      My Rentals
                    </DropdownMenuItem>
                  )}
                  {user?.role === "vendor" && (
                    <DropdownMenuItem onClick={() => navigate("/listings/manage")}>
                      <Package className="h-4 w-4 mr-2" />
                      My Listings
                    </DropdownMenuItem>
                  )}
                  {user?.role === "admin" && (
                    <DropdownMenuItem onClick={() => navigate("/admin/settings")}>
                      <Settings className="h-4 w-4 mr-2" />
                      Admin Settings
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button onClick={() => navigate("/auth/login")} variant="outline" size="sm" className="button-hover-effect">
                Login
              </Button>
              <Button onClick={() => navigate("/auth/signup")} variant="default" size="sm" className="button-hover-effect bg-brand hover:bg-brand-dark">
                Sign Up
              </Button>
            </div>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu} 
          className="md:hidden text-foreground p-2"
          aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t animate-fade-in">
          <div className="container py-4 space-y-4">
            <Link 
              to="/" 
              className="block py-2 hover:text-brand transition-colors"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/listings" 
              className="block py-2 hover:text-brand transition-colors"
              onClick={toggleMobileMenu}
            >
              Explore
            </Link>
            <Link 
              to="/how-it-works" 
              className="block py-2 hover:text-brand transition-colors"
              onClick={toggleMobileMenu}
            >
              How It Works
            </Link>
            
            {isAuthenticated ? (
              <>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground mb-2">
                    Signed in as: <span className="font-medium">{user?.name}</span>
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    <Button 
                      onClick={() => {
                        navigate(getDashboardLink());
                        toggleMobileMenu();
                      }} 
                      variant="outline" 
                      className="justify-start"
                    >
                      <Home className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                    <Button 
                      onClick={() => {
                        navigate("/profile");
                        toggleMobileMenu();
                      }} 
                      variant="outline" 
                      className="justify-start"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                    <Button 
                      onClick={handleLogout} 
                      variant="outline" 
                      className="justify-start"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2 border-t">
                <Button 
                  onClick={() => {
                    navigate("/auth/login");
                    toggleMobileMenu();
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => {
                    navigate("/auth/signup");
                    toggleMobileMenu();
                  }}
                  className="w-full bg-brand hover:bg-brand-dark"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
