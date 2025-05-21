
import React from "react";
import { PageTemplate } from "@/components/page-template";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

export function SafetyInfoPage() {
  const safetyTips = [
    {
      title: "Verify Equipment Condition",
      description: "Always inspect equipment before accepting it. Check for damage and test functionality if possible."
    },
    {
      title: "Read Reviews",
      description: "Check ratings and reviews from other users before renting from a vendor."
    },
    {
      title: "Use Secure Payments",
      description: "Always pay through our platform to ensure your transaction is protected."
    },
    {
      title: "Keep Communication on Platform",
      description: "For your protection, keep all communication and transactions within the RentAll.ng platform."
    },
    {
      title: "Report Issues Immediately",
      description: "If you encounter any problems, report them immediately through our resolution center."
    },
    {
      title: "Follow Usage Instructions",
      description: "Always follow the vendor's instructions for proper equipment use."
    }
  ];

  return (
    <PageTemplate 
      title="Safety Information" 
      description="Guidelines and tips to ensure a safe rental experience"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-2">
            <Shield className="h-8 w-8 text-green-600 dark:text-green-400 mb-2" />
            <CardTitle>Secure Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              All transactions are processed through Paystack, ensuring your payment information is secure.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-2" />
            <CardTitle>Verified Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We verify vendor information to ensure you're renting from legitimate businesses and individuals.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <CardHeader className="pb-2">
            <AlertTriangle className="h-8 w-8 text-amber-600 dark:text-amber-400 mb-2" />
            <CardTitle>Dispute Resolution</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Our customer support team is available to help resolve any issues that may arise during the rental process.
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mb-6">Safety Tips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {safetyTips.map((tip, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{tip.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {tip.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h3 className="text-lg font-medium mb-2">Emergency Contact</h3>
        <p className="text-muted-foreground">
          If you encounter an emergency situation related to rented equipment, please contact our 24/7 emergency line at <span className="font-medium">08000-RENTALL</span> or email <a href="mailto:emergency@rentall.ng" className="text-brand hover:underline">emergency@rentall.ng</a>
        </p>
      </div>
    </PageTemplate>
  );
}

export default SafetyInfoPage;
