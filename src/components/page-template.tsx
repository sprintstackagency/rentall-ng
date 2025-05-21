
import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

interface PageTemplateProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function PageTemplate({ title, description, children }: PageTemplateProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-10">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
