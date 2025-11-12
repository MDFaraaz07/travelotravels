import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Star } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BookingDialog } from "@/components/BookingDialog";
import maldivesImage from "@/assets/maldives.jpg";
import santoriniImage from "@/assets/santorini.jpg";
import baliImage from "@/assets/bali.jpg";
import swissAlpsImage from "@/assets/swiss-alps.jpg";
import parisImage from "@/assets/paris.jpg";
import dubaiImage from "@/assets/dubai.jpg";

const Tours = () => {
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({ name: "", price: "" });

  const handleBooking = (name: string, price: string) => {
    setSelectedPackage({ name, price });
    setBookingDialogOpen(true);
  };

  const tourPackages = [
    {
      name: "Maldives Luxury Escape",
      image: maldivesImage,
      duration: "7 Days / 6 Nights",
      groupSize: "2-8 People",
      price: "$2,499",
      rating: 4.9,
      category: "Beach",
      includes: ["Overwater Villa", "All Meals", "Water Sports", "Spa Treatment"]
    },
    {
      name: "Santorini Romance",
      image: santoriniImage,
      duration: "5 Days / 4 Nights",
      groupSize: "2-6 People",
      price: "$1,899",
      rating: 4.8,
      category: "Cultural",
      includes: ["Luxury Hotel", "Wine Tour", "Sunset Cruise", "Greek Cuisine"]
    },
    {
      name: "Bali Adventure Package",
      image: baliImage,
      duration: "8 Days / 7 Nights",
      groupSize: "4-12 People",
      price: "$1,299",
      rating: 4.7,
      category: "Adventure",
      includes: ["Temple Tours", "Rice Terrace Trek", "Surfing Lessons", "Cultural Shows"]
    },
    {
      name: "Swiss Alps Winter Wonderland",
      image: swissAlpsImage,
      duration: "6 Days / 5 Nights",
      groupSize: "2-10 People",
      price: "$2,799",
      rating: 5.0,
      category: "Mountain",
      includes: ["Ski Pass", "Mountain Lodge", "Swiss Train", "Cheese Factory"]
    },
    {
      name: "Parisian Elegance",
      image: parisImage,
      duration: "5 Days / 4 Nights",
      groupSize: "2-8 People",
      price: "$2,199",
      rating: 4.8,
      category: "City",
      includes: ["4-Star Hotel", "Eiffel Tower", "Louvre Museum", "Seine Cruise"]
    },
    {
      name: "Dubai Extravaganza",
      image: dubaiImage,
      duration: "6 Days / 5 Nights",
      groupSize: "2-10 People",
      price: "$1,999",
      rating: 4.6,
      category: "Luxury",
      includes: ["5-Star Hotel", "Desert Safari", "Burj Khalifa", "Shopping Tour"]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-ocean py-32 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Tours & Packages
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in">
            Carefully crafted experiences for every type of traveler
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourPackages.map((tour, index) => (
            <Card
              key={index}
              className="overflow-hidden border-border hover:shadow-glow transition-all duration-500 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden group">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  {tour.category}
                </Badge>
                <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-bold shadow-lg">
                  {tour.price}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Star className="w-5 h-5 text-secondary fill-secondary" />
                  <span className="font-semibold">{tour.rating}</span>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-4">{tour.name}</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-sm">{tour.duration}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm">{tour.groupSize}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-2">Package Includes:</h4>
                  <ul className="space-y-1">
                    {tour.includes.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  className="w-full bg-gradient-ocean hover:shadow-glow transition-all duration-300"
                  onClick={() => handleBooking(tour.name, tour.price)}
                >
                  Book This Tour
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Custom Package CTA */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Need a Custom Package?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our travel experts can create a personalized itinerary that perfectly matches your interests, budget, and schedule.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              onClick={() => handleBooking("Custom Package", "Contact for pricing")}
            >
              Request Custom Package
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      
      <BookingDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        packageName={selectedPackage.name}
        price={selectedPackage.price}
      />
    </div>
  );
};

export default Tours;
