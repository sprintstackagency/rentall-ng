
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const testimonials = [
  {
    quote: "RentGear has transformed how I plan events. No more buying expensive equipment I'll only use once.",
    name: "Sarah T.",
    title: "Event Planner",
    image: "/placeholder.svg"
  },
  {
    quote: "As a vendor, I've increased my equipment utilization by 70% since joining RentGear. The platform is fantastic!",
    name: "Mark D.",
    title: "Audio Visual Specialist",
    image: "/placeholder.svg"
  },
  {
    quote: "The quality of equipment I've rented has always been top-notch. Makes my job as a caterer so much easier.",
    name: "Jamie L.",
    title: "Professional Caterer",
    image: "/placeholder.svg"
  }
];

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground">
            Don't just take our word for it - hear from our community of renters and vendors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover-effect animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {Array(5).fill(null).map((_, i) => (
                    <svg 
                      key={i}
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="#944BBB" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-1"
                    >
                      <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z"/>
                    </svg>
                  ))}
                </div>
                <p className="italic text-foreground">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.title}</div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
