
import React from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-muted py-16 md:py-24">
          <div className="container text-center max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight mb-4">About RentAll.ng</h1>
            <p className="text-xl text-muted-foreground">
              Connecting event organizers with quality equipment across Nigeria
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="container py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                RentAll.ng was born out of a simple frustration: the difficulty of finding reliable event equipment in Nigeria. 
                In 2023, after experiencing this challenge firsthand when organizing a corporate event, our founder decided to create a solution.
              </p>
              <p className="text-muted-foreground mb-4">
                Our mission is to connect event organizers with trusted equipment vendors through a transparent, secure platform that 
                makes the rental process seamless for everyone involved.
              </p>
              <p className="text-muted-foreground">
                Since our launch, we've helped thousands of events come to life by facilitating easy access to quality equipment 
                at competitive prices.
              </p>
            </div>
            <div className="bg-muted rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Team meeting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground">
                These core principles guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6 shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-brand/10 flex items-center justify-center mb-4">
                  <div className="h-6 w-6 text-brand">🤝</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Trust & Transparency</h3>
                <p className="text-muted-foreground">
                  We believe in honest, clear communication between all parties. Our review system and verification processes ensure quality experiences.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6 shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-brand/10 flex items-center justify-center mb-4">
                  <div className="h-6 w-6 text-brand">⚡</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously improve our platform to make equipment rental more efficient, accessible, and user-friendly for all Nigerians.
                </p>
              </div>

              <div className="bg-background rounded-lg p-6 shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-brand/10 flex items-center justify-center mb-4">
                  <div className="h-6 w-6 text-brand">🌱</div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Community Growth</h3>
                <p className="text-muted-foreground">
                  We're committed to helping local vendors grow their businesses while enabling event organizers to create memorable experiences.
                </p>
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-bold mb-4">Our Team</h2>
              <p className="text-muted-foreground">
                Meet the people behind RentAll.ng
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="rounded-full overflow-hidden h-32 w-32 mx-auto mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">Oluwaseun Adebayo</h3>
                <p className="text-sm text-muted-foreground">Founder & CEO</p>
              </div>

              <div className="text-center">
                <div className="rounded-full overflow-hidden h-32 w-32 mx-auto mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">Aisha Mohammed</h3>
                <p className="text-sm text-muted-foreground">Head of Operations</p>
              </div>

              <div className="text-center">
                <div className="rounded-full overflow-hidden h-32 w-32 mx-auto mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">Chinedu Okonkwo</h3>
                <p className="text-sm text-muted-foreground">CTO</p>
              </div>

              <div className="text-center">
                <div className="rounded-full overflow-hidden h-32 w-32 mx-auto mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">Ngozi Eze</h3>
                <p className="text-sm text-muted-foreground">Customer Success</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-16 bg-muted p-8 rounded-lg">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
              <p className="text-muted-foreground">
                We're proud of what we've achieved so far
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-brand mb-2">5000+</div>
                <p className="text-muted-foreground">Successful Rentals</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand mb-2">300+</div>
                <p className="text-muted-foreground">Trusted Vendors</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand mb-2">28</div>
                <p className="text-muted-foreground">States Covered</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-brand mb-2">4.8/5</div>
                <p className="text-muted-foreground">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Join us CTA */}
        <div className="bg-brand text-white py-16">
          <div className="container text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Join the RentAll.ng Community</h2>
            <p className="text-xl opacity-80 mb-8">
              Whether you're looking to rent equipment or list your inventory, we're here to help
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline" className="bg-white text-brand hover:bg-gray-100 border-white">
                <Link to="/listings">Find Equipment</Link>
              </Button>
              <Button asChild variant="outline" className="text-white border-white hover:bg-white/10">
                <Link to="/auth/signup">Join as Vendor</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default AboutPage;
