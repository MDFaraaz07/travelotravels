import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Plane, 
  Hotel, 
  Package, 
  Shield, 
  Compass, 
  Camera, 
  Car,
  CreditCard,
  Headphones,
  Map,
  Ticket,
  Users
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Services = () => {
  const handleLearnMore = (serviceName: string) => {
    toast.success(`${serviceName} - More details coming soon!`, {
      description: "Contact us for immediate assistance with this service."
    });
  };

  const mainServices = [
    {
      icon: Plane,
      title: "Flight Booking",
      description: "Access to global flight networks with competitive pricing. We find the best routes and deals for your journey.",
      features: ["Best Price Guarantee", "Flexible Booking", "24/7 Support", "Multiple Airlines"]
    },
    {
      icon: Hotel,
      title: "Hotel Reservations",
      description: "From boutique stays to luxury resorts, we partner with the finest accommodations worldwide.",
      features: ["Verified Properties", "Exclusive Deals", "Room Upgrades", "Instant Confirmation"]
    },
    {
      icon: Package,
      title: "Tour Packages",
      description: "Curated experiences combining flights, hotels, activities, and local guides for hassle-free travel.",
      features: ["All-Inclusive Options", "Custom Itineraries", "Expert Guides", "Group Discounts"]
    },
    {
      icon: Shield,
      title: "Travel Insurance",
      description: "Comprehensive coverage protecting you against unexpected events during your travels.",
      features: ["Medical Coverage", "Trip Cancellation", "Lost Luggage", "Emergency Assistance"]
    },
    {
      icon: Compass,
      title: "Custom Tours",
      description: "Personalized itineraries designed around your interests, budget, and travel style.",
      features: ["Tailored Experiences", "Flexible Planning", "Local Insights", "Private Guides"]
    },
    {
      icon: Car,
      title: "Transportation",
      description: "Reliable airport transfers, car rentals, and private transportation services worldwide.",
      features: ["Airport Pickups", "Luxury Vehicles", "Professional Drivers", "Flexible Rentals"]
    },
  ];

  const additionalServices = [
    { icon: Ticket, title: "Visa Assistance", description: "Help with visa applications and documentation" },
    { icon: Camera, title: "Photography Tours", description: "Specialized tours for photography enthusiasts" },
    { icon: Map, title: "Route Planning", description: "Detailed itineraries and travel maps" },
    { icon: Users, title: "Group Travel", description: "Coordinated arrangements for large groups" },
    { icon: CreditCard, title: "Flexible Payment", description: "Multiple payment options and installment plans" },
    { icon: Headphones, title: "24/7 Support", description: "Round-the-clock assistance during your travels" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-ocean py-32 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Our Services
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in">
            Comprehensive travel solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Core Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for a perfect journey, all in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mainServices.map((service, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-glow transition-all duration-500 hover:-translate-y-2 border-border animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                className="w-full mt-6 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                onClick={() => handleLearnMore(service.title)}
              >
                Learn More
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Additional Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Extra support to make your travel experience seamless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-glow transition-all duration-300 hover:-translate-y-1 border-border"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple steps to plan your perfect journey
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Choose", desc: "Select your destination and travel dates" },
              { step: "2", title: "Plan", desc: "Customize your itinerary with our experts" },
              { step: "3", title: "Book", desc: "Secure your trip with easy payment options" },
              { step: "4", title: "Travel", desc: "Enjoy your journey with 24/7 support" },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 rounded-full bg-gradient-ocean mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-ocean">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Planning?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let our experts help you create the perfect travel experience
          </p>
          <Button
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold transition-all duration-300 hover:scale-105"
            onClick={() => window.location.href = '/contact'}
          >
            Get Started Today
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
