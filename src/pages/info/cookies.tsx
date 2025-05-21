
import React from "react";
import { PageTemplate } from "@/components/page-template";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function CookiesPage() {
  const cookieCategories = [
    {
      name: "Essential",
      description: "These cookies are necessary for the website to function and cannot be switched off in our systems.",
      examples: ["Authentication cookies", "Security cookies", "Load balancing cookies"]
    },
    {
      name: "Performance",
      description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.",
      examples: ["Google Analytics", "Performance timing", "Error logging"]
    },
    {
      name: "Functional",
      description: "These cookies enable the website to provide enhanced functionality and personalization.",
      examples: ["Language preferences", "User preferences", "Recently viewed items"]
    },
    {
      name: "Targeting/Advertising",
      description: "These cookies may be set through our site by our advertising partners to build a profile of your interests.",
      examples: ["Advertising cookies", "Social sharing cookies", "Retargeting cookies"]
    }
  ];

  return (
    <PageTemplate 
      title="Cookie Policy" 
      description="How we use cookies and other tracking technologies"
    >
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        <p className="text-muted-foreground">Last updated: May 21, 2025</p>
        
        <h2>What Are Cookies</h2>
        <p>
          Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
          They are widely used to make websites work more efficiently and provide information to the website owners.
        </p>
        
        <h2>How We Use Cookies</h2>
        <p>
          We use cookies for various purposes including:
        </p>
        <ul>
          <li>Authenticating and identifying you on our platform</li>
          <li>Remembering your preferences and settings</li>
          <li>Analyzing how you use our platform to improve functionality</li>
          <li>Providing personalized content and recommendations</li>
          <li>Measuring the effectiveness of our marketing campaigns</li>
        </ul>
        
        <h2>Types of Cookies We Use</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Examples</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cookieCategories.map((category, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>
                  <ul className="list-disc pl-5 my-0">
                    {category.examples.map((example, i) => (
                      <li key={i} className="text-sm">{example}</li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <h2>Managing Cookies</h2>
        <p>
          Most web browsers allow you to control cookies through their settings. You can usually find these settings in the 
          "Options" or "Preferences" menu of your browser. You can also set your browser to alert you when websites try to place cookies on your device.
        </p>
        
        <p>
          Please note that if you disable cookies, some features of our platform may not function properly.
        </p>
        
        <h2>Third-Party Cookies</h2>
        <p>
          We also use third-party cookies, such as Google Analytics, to collect information about how visitors use our platform. 
          These cookies may track things such as how long you spend on the platform and the pages you visit.
        </p>
        
        <h2>Changes to This Cookie Policy</h2>
        <p>
          We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new 
          Cookie Policy on this page and updating the "Last updated" date.
        </p>
        
        <h2>Contact Us</h2>
        <p>
          If you have any questions about our Cookie Policy, please contact us at <a href="mailto:privacy@rentall.ng" className="text-brand hover:underline">privacy@rentall.ng</a>.
        </p>
      </div>
    </PageTemplate>
  );
}

export default CookiesPage;
