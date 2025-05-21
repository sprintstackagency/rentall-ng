
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: Category;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryCard({ category, active = false, onClick }: CategoryCardProps) {
  // Mock icon mapping - in a real app, we'd have proper icons
  const getIconComponent = () => {
    return (
      <div className={`w-12 h-12 flex items-center justify-center rounded-full ${
        active ? "bg-brand text-white" : "bg-brand-light text-brand"
      }`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-box"
        >
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      </div>
    );
  };

  if (onClick) {
    return (
      <Card 
        className={`card-hover-effect h-full animate-fade-in cursor-pointer ${
          active ? "border-brand bg-brand-light/10" : ""
        }`}
        onClick={onClick}
      >
        <CardContent className="p-6 flex flex-col items-center text-center">
          {getIconComponent()}
          <h3 className={`font-medium mt-4 ${active ? "text-brand" : ""}`}>
            {category.name}
          </h3>
        </CardContent>
      </Card>
    );
  }

  return (
    <Link to={`/listings?category=${category.id}`}>
      <Card className="card-hover-effect h-full animate-fade-in">
        <CardContent className="p-6 flex flex-col items-center text-center">
          {getIconComponent()}
          <h3 className="font-medium mt-4">{category.name}</h3>
        </CardContent>
      </Card>
    </Link>
  );
}
