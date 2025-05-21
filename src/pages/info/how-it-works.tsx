
import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-muted py-16 md:py-24">
          <div className="container text-center max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4">How RentAll.ng Works</h1>
            <p className="text-xl text-muted-foreground">
              Your one-stop platform for renting event equipment in Nigeria
            </p>
          </div>
        </div>

        {/* Process steps */}
        <div className="container py-16">
          <div className="grid gap-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-brand/10 p-1 w-fit rounded-full mb-4">
                  <div className="bg-brand rounded-full w-10 h-10 flex items-center justify-center text-white font-medium">
                    1
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4">Browse Available Equipment</h2>
                <p className="text-muted-foreground mb-4">
                  Explore our wide range of event equipment from trusted vendors across Nigeria. 
                  Filter by category, price, and location to find exactly what you need for your event.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand mr-2 mt-0.5" />
                    <span>Search across multiple categories</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand mr-2 mt-0.5" />
                    <span>Compare prices from different vendors</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand mr-2 mt-0.5" />
                    <span>View detailed equipment specifications</span>
                  </li>
                </ul>
                <Button asChild className="bg-brand hover:bg-brand-dark">
                  <Link to="/listings">Browse Equipment</Link>
                </Button>
              </div>
              <div className="bg-muted rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
                <img
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Browse equipment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-muted rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Request rental"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="bg-brand/10 p-1 w-fit rounded-full mb-4">
                  <div className="bg-brand rounded-full w-10 h-10 flex items-center justify-center text-white font-medium">
                    2
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4">Book Your Equipment</h2>
                <p className="text-muted-foreground mb-4">
                  Select your rental dates, quantity needed, and submit your booking request. 
                  Our platform makes it easy to manage all your equipment needs in one place.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand mr-2 mt-0.5" />
                    <span>Easy date selection calendar</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand mr-2 mt-0.5" />
                    <span>Instant availability confirmation</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand mr-2 mt-0.5" />
                    <span>Transparent pricing with no hidden fees</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-brand/10 p-1 w-fit rounded-full mb-4">
                  <div className="bg-brand rounded-full w-10 h-10 flex items-center justify-center text-white font-medium">
                    3
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4">Secure Payment</h2>
                <p className="text-muted-foreground mb-4">
                  Pay securely through our platform using multiple payment options. 
                  Your payment is held safely until you confirm receipt of the equipment.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand mr-2 mt-0.5" />
                    <span>Secure payment processing</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand mr-2 mt-0.5" />
                    <span>Multiple payment options</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand mr-2 mt-0.5" />
                    <span>Payment protection guarantee</span>
                  </li>
                </ul>
              </div>
              <div className="bg-muted rounded-lg overflow-hidden shadow-lg order-1 md:order-2">
                <img
                  src="https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Secure payment"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-muted rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1577401239170-897942555fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Enjoy your event"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="bg-brand/10 p-1 w-fit rounded-full mb-4">
                  <div className="bg-brand rounded-full w-10 h-10 flex items-center justify-center text-white font-medium">
                    4
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4">Receive & Return</h2>
                <p className="text-muted-foreground mb-4">
                  Coordinate with the vendor for equipment delivery or pickup. After your event, 
                  return the equipment according to the agreed terms and leave a review of your experience.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand mr-2 mt-0.5" />
                    <span>Flexible pickup/delivery options</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand mr-2 mt-0.5" />
                    <span>Clear return instructions</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-brand mr-2 mt-0.5" />
                    <span>Post-rental review system</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* For vendors section */}
        <div className="bg-muted py-16">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">For Equipment Vendors</h2>
              <p className="text-muted-foreground">
                Maximize your equipment's earning potential by joining our platform as a vendor
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-brand/10 flex items-center justify-center mb-4">
                  <div className="h-6 w-6 text-brand">📋</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Registration</h3>
                <p className="text-muted-foreground">
                  Sign up as a vendor in minutes and start listing your equipment right away.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-brand/10 flex items-center justify-center mb-4">
                  <div className="h-6 w-6 text-brand">💼</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Manage Bookings</h3>
                <p className="text-muted-foreground">
                  Accept or decline booking requests, manage your calendar, and track your rentals.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-brand/10 flex items-center justify-center mb-4">
                  <div className="h-6 w-6 text-brand">💰</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Paid</h3>
                <p className="text-muted-foreground">
                  Receive payments directly to your account after rentals are completed.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button asChild variant="default" className="bg-brand hover:bg-brand-dark">
                <Link to="/auth/signup">Become a Vendor</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Common questions about our rental platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-background border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">How do I pay for my rental?</h3>
              <p className="text-muted-foreground">
                We accept various payment methods including bank transfers, credit/debit cards, and mobile payments.
              </p>
            </div>
            
            <div className="bg-background border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">What if the equipment is damaged?</h3>
              <p className="text-muted-foreground">
                Each rental includes clear terms for damage. Minor wear is usually covered, but significant damage may incur additional charges.
              </p>
            </div>
            
            <div className="bg-background border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Can I cancel my booking?</h3>
              <p className="text-muted-foreground">
                Yes, you can cancel bookings according to the vendor's cancellation policy, which is displayed before you confirm your rental.
              </p>
            </div>
            
            <div className="bg-background border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Is delivery available?</h3>
              <p className="text-muted-foreground">
                Delivery options vary by vendor. You can see delivery availability and any associated fees on the equipment listing page.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand text-white py-16">
          <div className="container text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to start renting?</h2>
            <p className="text-xl opacity-80 mb-8">
              Join thousands of users who trust RentAll.ng for their event equipment needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="bg-white text-brand hover:bg-gray-100 border-white">
                <Link to="/listings">Browse Equipment</Link>
              </Button>
              <Button asChild variant="outline" className="text-white border-white hover:bg-white/10">
                <Link to="/auth/signup">Create Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HowItWorksPage;
