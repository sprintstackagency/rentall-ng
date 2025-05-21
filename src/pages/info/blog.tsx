
import React from "react";
import { PageTemplate } from "@/components/page-template";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Rise of Equipment Rental in Nigeria",
      excerpt: "How the sharing economy is revolutionizing access to equipment for events and businesses in Nigeria.",
      image: "https://source.unsplash.com/random/800x600?event",
      date: "May 15, 2023",
    },
    {
      id: 2,
      title: "5 Tips for Renting Out Your Equipment",
      excerpt: "Learn how to maximize your earnings by renting out equipment you already own but rarely use.",
      image: "https://source.unsplash.com/random/800x600?equipment",
      date: "April 22, 2023",
    },
    {
      id: 3,
      title: "How to Choose the Right Sound System for Your Event",
      excerpt: "A comprehensive guide to selecting the perfect sound equipment for different types of events.",
      image: "https://source.unsplash.com/random/800x600?sound",
      date: "March 10, 2023",
    },
  ];

  return (
    <PageTemplate 
      title="Blog" 
      description="Latest news, tips and updates from RentAll.ng"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <div className="aspect-video relative">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-muted-foreground">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Read More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </PageTemplate>
  );
}

export default BlogPage;
