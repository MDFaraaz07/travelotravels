import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/destinations-hero.jpg";
import maldivesImage from "@/assets/maldives.jpg";
import santoriniImage from "@/assets/santorini.jpg";
import baliImage from "@/assets/bali.jpg";
import swissAlpsImage from "@/assets/swiss-alps.jpg";
import parisImage from "@/assets/paris.jpg";
import dubaiImage from "@/assets/dubai.jpg";

const Destinations = () => {
  const navigate = useNavigate();

  const destinations = [
    {
      id: "maldives",
      name: "Maldives",
      location: "Indian Ocean",
      image: maldivesImage,
      price: "$2,499",
      rating: 4.9,
      reviews: 342,
      description: "Crystal clear waters, overwater villas, and pristine beaches await you in this tropical paradise."
    },
    {
      id: "santorini",
      name: "Santorini",
      location: "Greece",
      image: santoriniImage,
      price: "$1,899",
      rating: 4.8,
      reviews: 428,
      description: "Iconic white-washed buildings, stunning sunsets, and the Aegean Sea's crystal blue waters."
    },
    {
      id: "bali",
      name: "Bali",
      location: "Indonesia",
      image: baliImage,
      price: "$1,299",
      rating: 4.7,
      reviews: 516,
      description: "Ancient temples, lush rice terraces, and a rich cultural heritage in the Island of Gods."
    },
    {
      id: "swiss-alps",
      name: "Swiss Alps",
      location: "Switzerland",
      image: swissAlpsImage,
      price: "$2,799",
      rating: 5.0,
      reviews: 287,
      description: "Majestic mountain peaks, pristine alpine lakes, and charming villages nestled in valleys."
    },
    {
      id: "paris",
      name: "Paris",
      location: "France",
      image: parisImage,
      price: "$2,199",
      rating: 4.8,
      reviews: 612,
      description: "The City of Light offers romance, world-class art, iconic landmarks, and exquisite cuisine."
    },
    {
      id: "dubai",
      name: "Dubai",
      location: "UAE",
      image: dubaiImage,
      price: "$1,999",
      rating: 4.6,
      reviews: 394,
      description: "Futuristic skyline, luxury shopping, and a blend of modern innovation with Arabian heritage."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Travel destinations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Explore Our Destinations
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in">
            From tropical beaches to mountain peaks, discover your perfect getaway
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-border hover:shadow-glow transition-all duration-500 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                
                <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-semibold shadow-lg">
                  From {destination.price}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center space-x-2 text-white/80 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{destination.location}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{destination.name}</h3>
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-secondary fill-secondary" />
                      <span className="text-white font-semibold">{destination.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-white/70 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{destination.reviews} reviews</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {destination.description}
                </p>
                <Button
                  variant="outline"
                  className="w-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                  onClick={() => navigate(`/destinations/${destination.id}`)}
                >
                  View Details & Book
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Can't Find Your Dream Destination?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let us help you plan a custom itinerary tailored to your preferences
          </p>
          <Button
            size="lg"
            className="bg-gradient-ocean hover:shadow-glow transition-all duration-300"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Our Travel Experts
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Destinations;
