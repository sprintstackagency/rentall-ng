
import React from "react";
import { PageTemplate } from "@/components/page-template";

export function TermsPage() {
  return (
    <PageTemplate 
      title="Terms of Service" 
      description="Please read these terms carefully before using RentAll.ng"
    >
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        <p className="text-muted-foreground">Last updated: May 21, 2025</p>
        
        <h2>1. Acceptance of Terms</h2>
        <p>
          Welcome to RentAll.ng. By accessing or using our platform, you agree to be bound by these Terms of Service. 
          If you disagree with any part of the terms, you may not access the service.
        </p>
        
        <h2>2. User Accounts</h2>
        <p>
          When you create an account with us, you must provide accurate, complete, and current information. 
          You are responsible for safeguarding the password and for all activities that occur under your account.
        </p>
        
        <h2>3. Platform Usage</h2>
        <p>
          RentAll.ng provides a platform for users to list, discover, and rent equipment and other items. We are not 
          responsible for the condition of items rented through our platform or for any disputes that may arise between users.
        </p>
        
        <h2>4. User Responsibilities</h2>
        <h3>For Renters:</h3>
        <ul>
          <li>Provide accurate information when renting items</li>
          <li>Treat rented equipment with care and return it in the same condition</li>
          <li>Pay all agreed-upon rental fees and security deposits</li>
          <li>Return equipment on time</li>
        </ul>
        
        <h3>For Vendors:</h3>
        <ul>
          <li>Provide accurate descriptions and images of listed items</li>
          <li>Ensure items are in good working condition</li>
          <li>Make items available during the agreed-upon rental period</li>
          <li>Respect user privacy and data</li>
        </ul>
        
        <h2>5. Fees and Payments</h2>
        <p>
          RentAll.ng charges service fees for transactions completed on our platform. Vendors receive payment for 
          their rentals minus applicable service fees. All payments are processed through our payment partners.
        </p>
        
        <h2>6. Cancellations and Refunds</h2>
        <p>
          Cancellation policies may vary by vendor. Please refer to our Cancellation Options page for more information.
        </p>
        
        <h2>7. Prohibited Activities</h2>
        <p>
          Users may not engage in any illegal activities on the platform, including but not limited to fraud, 
          misrepresentation, or harassment. RentAll.ng reserves the right to terminate accounts of users who violate these terms.
        </p>
        
        <h2>8. Intellectual Property</h2>
        <p>
          The RentAll.ng service and its original content, features, and functionality are owned by RentAll.ng and are 
          protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
        </p>
        
        <h2>9. Limitation of Liability</h2>
        <p>
          In no event shall RentAll.ng, its directors, employees, partners, agents, suppliers, or affiliates be liable for any 
          indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
        </p>
        
        <h2>10. Governing Law</h2>
        <p>
          These Terms shall be governed by the laws of the Federal Republic of Nigeria.
        </p>
        
        <h2>11. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will provide notice of any significant changes.
        </p>
        
        <h2>12. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at <a href="mailto:legal@rentall.ng" className="text-brand hover:underline">legal@rentall.ng</a>.
        </p>
      </div>
    </PageTemplate>
  );
}

export default TermsPage;
