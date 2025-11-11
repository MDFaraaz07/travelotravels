import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Star, Users, Globe, Award, MapPin, Calendar, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-home.jpg";
import maldivesImage from "@/assets/maldives.jpg";
import santoriniImage from "@/assets/santorini.jpg";
import baliImage from "@/assets/bali.jpg";
import swissAlpsImage from "@/assets/swiss-alps.jpg";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Home = () => {
  const featuredDestinations = [
    {
      name: "Maldives",
      image: maldivesImage,
      price: "$2,499",
      rating: 4.9,
      tours: 12
    },
    {
      name: "Santorini",
      image: santoriniImage,
      price: "$1,899",
      rating: 4.8,
      tours: 15
    },
    {
      name: "Bali",
      image: baliImage,
      price: "$1,299",
      rating: 4.7,
      tours: 18
    },
    {
      name: "Swiss Alps",
      image: swissAlpsImage,
      price: "$2,799",
      rating: 5.0,
      tours: 10
    },
  ];

  const stats = [
    { icon: Globe, value: "150+", label: "Destinations" },
    { icon: Users, value: "50K+", label: "Happy Travelers" },
    { icon: Award, value: "25+", label: "Awards Won" },
    { icon: Star, value: "4.9", label: "Average Rating" },
  ];

  const features = [
    {
      icon: MapPin,
      title: "Best Destinations",
      description: "Curated selection of the world's most breathtaking locations"
    },
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Seamless booking process with instant confirmation"
    },
    {
      icon: Shield,
      title: "Safe Travel",
      description: "24/7 support and comprehensive travel insurance"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Tropical paradise"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            Explore the World
            <span className="block bg-gradient-sunset bg-clip-text text-transparent">
              Your Way
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in">
            Discover extraordinary destinations and create unforgettable memories with Travelo
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Button
              size="lg"
              className="bg-gradient-sunset hover:shadow-glow text-foreground font-semibold transition-all duration-300 hover:scale-105"
            >
              Explore Destinations
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-background transition-all duration-300"
            >
              View Packages
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card -mt-20 relative z-20 mx-4 md:mx-8 rounded-2xl shadow-elegant">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Destinations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked locations that promise extraordinary experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDestinations.map((destination, index) => (
            <Card
              key={index}
              className="group overflow-hidden cursor-pointer border-border hover:shadow-glow transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {destination.price}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-2">{destination.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-secondary fill-secondary" />
                      <span className="text-white font-semibold">{destination.rating}</span>
                    </div>
                    <span className="text-white/80 text-sm">{destination.tours} tours</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/destinations">
            <Button
              size="lg"
              variant="outline"
              className="hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
            >
              View All Destinations
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose Travelo
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with our premium travel services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-8 text-center hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border-border"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-ocean opacity-90" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Book your dream vacation today and create memories that last a lifetime
          </p>
          <Link to="/contact">
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold transition-all duration-300 hover:scale-105 shadow-elegant"
            >
              Contact Us Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
