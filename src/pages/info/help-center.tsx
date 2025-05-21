
import React from "react";
import { PageTemplate } from "@/components/page-template";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

export function HelpCenterPage() {
  const faqCategories = {
    general: [
      {
        question: "How does RentAll.ng work?",
        answer: "RentAll.ng is a platform that connects people who need equipment with those who have equipment to rent. Browse listings, make a request, pay securely, and pick up or receive the equipment. Return it when you're done!"
      },
      {
        question: "Is my payment secure?",
        answer: "Yes, all payments on RentAll.ng are processed through Paystack, a secure payment processor. We don't store your card details."
      },
      {
        question: "What happens if the equipment is damaged?",
        answer: "Renters are responsible for returning equipment in the same condition they received it. We recommend vendors to collect a security deposit for high-value items."
      }
    ],
    renters: [
      {
        question: "How do I rent equipment?",
        answer: "Browse listings, select the item you want to rent, choose rental dates, and make a payment. The vendor will then coordinate with you for pickup or delivery."
      },
      {
        question: "Can I extend my rental period?",
        answer: "Yes, you can request an extension through the platform. The vendor will need to approve the extension and additional charges will apply."
      },
      {
        question: "What if the equipment doesn't work as described?",
        answer: "Contact the vendor immediately through our messaging system. If the issue can't be resolved, you can request a refund through our resolution center."
      }
    ],
    vendors: [
      {
        question: "How do I list my equipment?",
        answer: "Create a vendor account, click on 'Add Listing', fill in the details about your equipment, upload photos, set availability and pricing, then publish!"
      },
      {
        question: "When do I get paid?",
        answer: "Payments are released to vendors 24 hours after the rental period begins, once the renter has confirmed receipt of the equipment."
      },
      {
        question: "Can I decline a rental request?",
        answer: "Yes, vendors have the option to review and accept or decline rental requests before the payment is processed."
      }
    ]
  };

  return (
    <PageTemplate 
      title="Help Center" 
      description="Find answers to your questions about using RentAll.ng"
    >
      <div className="mb-8">
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Input 
              placeholder="Search for help..." 
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="renters">For Renters</TabsTrigger>
          <TabsTrigger value="vendors">For Vendors</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Accordion type="single" collapsible className="w-full">
            {faqCategories.general.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        <TabsContent value="renters">
          <Accordion type="single" collapsible className="w-full">
            {faqCategories.renters.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        <TabsContent value="vendors">
          <Accordion type="single" collapsible className="w-full">
            {faqCategories.vendors.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>

      <div className="mt-12 text-center">
        <h3 className="text-lg font-medium mb-2">Still need help?</h3>
        <p className="text-muted-foreground mb-4">Contact our support team for assistance</p>
        <Button asChild>
          <a href="/contact">Contact Support</a>
        </Button>
      </div>
    </PageTemplate>
  );
}

export default HelpCenterPage;
