
import React from "react";
import { PageTemplate } from "@/components/page-template";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function CareersPage() {
  const openPositions = [
    {
      id: 1,
      title: "Frontend Developer",
      location: "Lagos, Nigeria",
      type: "Full-time",
      department: "Engineering",
    },
    {
      id: 2,
      title: "Customer Success Manager",
      location: "Abuja, Nigeria",
      type: "Full-time",
      department: "Customer Support",
    },
    {
      id: 3,
      title: "Marketing Specialist",
      location: "Remote, Nigeria",
      type: "Full-time",
      department: "Marketing",
    },
  ];

  const benefits = [
    "Competitive salary and equity",
    "Health insurance",
    "Flexible work hours",
    "Remote work options",
    "Learning and development budget",
    "Team retreats",
  ];

  return (
    <PageTemplate 
      title="Careers" 
      description="Join our team and help shape the future of equipment rental in Nigeria"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Open Positions</h2>
          <div className="space-y-4">
            {openPositions.map((position) => (
              <Card key={position.id}>
                <CardHeader>
                  <CardTitle>{position.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-muted">{position.location}</span>
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-muted">{position.type}</span>
                    <span className="inline-block px-3 py-1 text-xs rounded-full bg-muted">{position.department}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Why Join Us</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-6">
                At RentAll.ng, we're building the future of equipment rental in Nigeria. 
                We're a team of passionate individuals who believe in the power of technology 
                to solve real-world problems.
              </p>
              <h3 className="font-medium mb-2">Benefits</h3>
              <ul className="space-y-2">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-brand mr-2">•</span> {benefit}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
}

export default CareersPage;
