
import React from "react";
import { PageTemplate } from "@/components/page-template";

export function PrivacyPage() {
  return (
    <PageTemplate 
      title="Privacy Policy" 
      description="How we collect, use, and protect your personal information"
    >
      <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
        <p className="text-muted-foreground">Last updated: May 21, 2025</p>
        
        <h2>1. Information We Collect</h2>
        <p>
          We collect several types of information from and about users of our platform, including:
        </p>
        <ul>
          <li>Personal identification information (Name, email address, phone number, etc.)</li>
          <li>Payment information</li>
          <li>Usage data and analytics</li>
          <li>Device and browser information</li>
          <li>Location data (with your consent)</li>
        </ul>
        
        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to:
        </p>
        <ul>
          <li>Provide, operate, and maintain our platform</li>
          <li>Process transactions and send related information</li>
          <li>Improve and personalize the user experience</li>
          <li>Communicate with users, including sending service updates and marketing messages</li>
          <li>Protect against fraud and unauthorized access</li>
          <li>Comply with legal obligations</li>
        </ul>
        
        <h2>3. Information Sharing</h2>
        <p>
          We may share your information with:
        </p>
        <ul>
          <li>Other users as necessary to facilitate rentals (e.g., sharing contact information between a renter and vendor)</li>
          <li>Service providers who perform services on our behalf</li>
          <li>Legal authorities when required by law</li>
          <li>Business partners with your consent</li>
        </ul>
        <p>
          We do not sell your personal information to third parties.
        </p>
        
        <h2>4. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information. However, no method of transmission 
          over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
        
        <h2>5. Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our platform and store certain information. 
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>
        
        <h2>6. Third-Party Links</h2>
        <p>
          Our platform may contain links to third-party websites. We have no control over and assume no responsibility for 
          the content, privacy policies, or practices of any third-party sites or services.
        </p>
        
        <h2>7. Children's Privacy</h2>
        <p>
          Our platform is not intended for use by children under the age of 18. We do not knowingly collect personally 
          identifiable information from children under 18.
        </p>
        
        <h2>8. Your Rights</h2>
        <p>
          Depending on your location, you may have the right to:
        </p>
        <ul>
          <li>Access personal information we hold about you</li>
          <li>Correct inaccurate personal information</li>
          <li>Delete your personal information</li>
          <li>Object to our processing of your personal information</li>
          <li>Withdraw consent where applicable</li>
        </ul>
        
        <h2>9. Changes to this Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
          Privacy Policy on this page and updating the "Last updated" date.
        </p>
        
        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@rentall.ng" className="text-brand hover:underline">privacy@rentall.ng</a>.
        </p>
      </div>
    </PageTemplate>
  );
}

export default PrivacyPage;
