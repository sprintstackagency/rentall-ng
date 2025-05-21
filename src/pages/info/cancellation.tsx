
import React from "react";
import { PageTemplate } from "@/components/page-template";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle } from "lucide-react";

export function CancellationPage() {
  const cancellationPolicies = [
    {
      title: "Flexible",
      description: "Full refund if cancelled 24 hours before the rental start time.",
      refundSchedule: [
        { timeframe: "More than 24 hours before", refundPercentage: 100 },
        { timeframe: "Less than 24 hours before", refundPercentage: 0 },
        { timeframe: "After pickup/delivery", refundPercentage: 0 },
      ]
    },
    {
      title: "Moderate",
      description: "Full refund if cancelled 3 days before the rental start time.",
      refundSchedule: [
        { timeframe: "More than 3 days before", refundPercentage: 100 },
        { timeframe: "Less than 3 days before", refundPercentage: 50 },
        { timeframe: "Less than 24 hours before", refundPercentage: 0 },
        { timeframe: "After pickup/delivery", refundPercentage: 0 },
      ]
    },
    {
      title: "Strict",
      description: "50% refund if cancelled 7 days before the rental start time.",
      refundSchedule: [
        { timeframe: "More than 7 days before", refundPercentage: 50 },
        { timeframe: "Less than 7 days before", refundPercentage: 0 },
        { timeframe: "After pickup/delivery", refundPercentage: 0 },
      ]
    },
  ];

  return (
    <PageTemplate 
      title="Cancellation Options" 
      description="Learn about our cancellation policies and refund options"
    >
      <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start">
        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium mb-1">Important Note</h3>
          <p className="text-muted-foreground text-sm">
            Each vendor can set their own cancellation policy for their listings. Be sure to check the policy for each item before renting.
          </p>
        </div>
      </div>

      <div className="space-y-8">
        {cancellationPolicies.map((policy, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{policy.title} Cancellation Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">{policy.description}</p>
              
              <h3 className="font-medium mb-3">Refund Schedule</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timeframe</TableHead>
                    <TableHead className="text-right">Refund Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {policy.refundSchedule.map((item, itemIndex) => (
                    <TableRow key={itemIndex}>
                      <TableCell>{item.timeframe}</TableCell>
                      <TableCell className="text-right">{item.refundPercentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">How to Cancel a Rental</h2>
        <ol className="space-y-4 list-decimal list-inside">
          <li className="text-muted-foreground">
            <span className="text-foreground font-medium">Go to your Dashboard</span> - Log in to your account and navigate to the Dashboard.
          </li>
          <li className="text-muted-foreground">
            <span className="text-foreground font-medium">Find your reservation</span> - Locate the rental you wish to cancel under "Upcoming Rentals."
          </li>
          <li className="text-muted-foreground">
            <span className="text-foreground font-medium">Click Cancel</span> - Select the "Cancel" option for that rental.
          </li>
          <li className="text-muted-foreground">
            <span className="text-foreground font-medium">Confirm cancellation</span> - Review the refund information and confirm your cancellation.
          </li>
        </ol>
      </div>
    </PageTemplate>
  );
}

export default CancellationPage;
