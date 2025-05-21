
import React from "react";
import { PageTemplate } from "@/components/page-template";
import { Link } from "react-router-dom";

export function SitemapPage() {
  const sitemapCategories = [
    {
      name: "Main Pages",
      links: [
        { to: "/", label: "Home" },
        { to: "/listings", label: "Browse Listings" },
        { to: "/how-it-works", label: "How It Works" },
        { to: "/about", label: "About Us" },
      ]
    },
    {
      name: "User Account",
      links: [
        { to: "/auth/login", label: "Login" },
        { to: "/auth/signup", label: "Sign Up" },
        { to: "/dashboard", label: "User Dashboard" },
        { to: "/profile", label: "My Profile" },
      ]
    },
    {
      name: "Vendor Pages",
      links: [
        { to: "/vendor", label: "Vendor Dashboard" },
        { to: "/vendor/add-listing", label: "Add New Listing" },
        { to: "/vendor/manage-listings", label: "Manage Listings" },
      ]
    },
    {
      name: "Information",
      links: [
        { to: "/blog", label: "Blog" },
        { to: "/careers", label: "Careers" },
        { to: "/press", label: "Press" },
        { to: "/help", label: "Help Center" },
        { to: "/safety", label: "Safety Information" },
        { to: "/cancellation", label: "Cancellation Options" },
        { to: "/contact", label: "Contact Us" },
      ]
    },
    {
      name: "Legal",
      links: [
        { to: "/terms", label: "Terms of Service" },
        { to: "/privacy", label: "Privacy Policy" },
        { to: "/cookies", label: "Cookie Policy" },
      ]
    }
  ];

  return (
    <PageTemplate 
      title="Sitemap" 
      description="Find all pages on RentAll.ng"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sitemapCategories.map((category, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-lg font-semibold">{category.name}</h2>
            <ul className="space-y-2">
              {category.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link 
                    to={link.to} 
                    className="text-muted-foreground hover:text-brand transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
}

export default SitemapPage;
