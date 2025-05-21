
import React from "react";
import { PageTemplate } from "@/components/page-template";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function PressPage() {
  const pressReleases = [
    {
      id: 1,
      title: "RentAll.ng Raises $2M in Seed Funding to Expand Equipment Rental Platform",
      date: "April 18, 2023",
      excerpt: "Funding will be used to expand to new cities across Nigeria and improve the platform's technology.",
    },
    {
      id: 2,
      title: "RentAll.ng Partners with Major Event Production Companies in Nigeria",
      date: "February 8, 2023",
      excerpt: "Strategic partnerships with leading event producers will increase equipment availability on the platform.",
    },
    {
      id: 3,
      title: "RentAll.ng Launches Mobile App for Android and iOS",
      date: "December 12, 2022",
      excerpt: "New mobile apps make it easier than ever to rent equipment on the go.",
    },
  ];

  return (
    <PageTemplate 
      title="Press" 
      description="Latest news and press releases from RentAll.ng"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.map((release) => (
              <Card key={release.id}>
                <CardHeader>
                  <p className="text-sm text-muted-foreground">{release.date}</p>
                  <CardTitle className="text-xl mt-1">{release.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{release.excerpt}</p>
                  <Button variant="outline" size="sm">Read Full Release</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Media Kit</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-6">
                Download our media kit for logos, brand guidelines, and high-resolution images.
              </p>
              <Button className="w-full mb-4">
                <Download className="mr-2 h-4 w-4" /> Download Media Kit
              </Button>
              
              <h3 className="font-medium mt-6 mb-2">Media Contact</h3>
              <p className="text-muted-foreground">
                For press inquiries, please contact:<br />
                <a href="mailto:press@rentall.ng" className="text-brand hover:underline">press@rentall.ng</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
}

export default PressPage;
