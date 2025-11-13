import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Clock, Users, Check, ArrowLeft, MapPin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BookingDialog } from "@/components/BookingDialog";
import maldivesImage from "@/assets/maldives.jpg";
import santoriniImage from "@/assets/santorini.jpg";
import baliImage from "@/assets/bali.jpg";
import swissAlpsImage from "@/assets/swiss-alps.jpg";
import parisImage from "@/assets/paris.jpg";
import dubaiImage from "@/assets/dubai.jpg";

const toursData = {
  "maldives-luxury-escape": {
    name: "Maldives Luxury Escape",
    destination: "Maldives",
    image: maldivesImage,
    duration: "7 Days / 6 Nights",
    groupSize: "2-8 People",
    price: "$2,499",
    rating: 4.9,
    category: "Beach",
    description: "Indulge in the ultimate tropical luxury experience with overwater villas, pristine beaches, and world-class amenities.",
    longDescription: "Escape to paradise with our exclusive Maldives Luxury package. This carefully curated experience combines the finest accommodations, exceptional dining, and unforgettable water activities. Stay in an overwater villa with direct ocean access, enjoy unlimited water sports, and experience the magic of bioluminescent beaches at night.",
    includes: ["Overwater Villa", "All Meals", "Water Sports", "Spa Treatment"],
    highlights: [
      "Private overwater villa with glass floor panels",
      "Daily breakfast, lunch, and dinner included",
      "Unlimited snorkeling and diving excursions",
      "Complimentary 90-minute couples spa treatment",
      "Sunset dolphin watching cruise",
      "Private beach dinner under the stars"
    ],
    itinerary: [
      { day: "Day 1", activities: ["Seaplane arrival", "Villa check-in", "Welcome cocktail", "Sunset beach walk"] },
      { day: "Day 2", activities: ["Breakfast in villa", "Snorkeling expedition", "Beach lunch", "Water sports activities"] },
      { day: "Day 3", activities: ["Dolphin watching cruise", "Island hopping", "Local island visit", "Maldivian BBQ dinner"] },
      { day: "Day 4", activities: ["Scuba diving lesson", "Spa treatment", "Leisure time", "Romantic dinner"] },
      { day: "Day 5", activities: ["Glass kayak tour", "Underwater restaurant lunch", "Jet skiing", "Night fishing"] },
      { day: "Day 6", activities: ["Sunrise yoga", "Final beach day", "Farewell dinner", "Bioluminescent beach walk"] },
      { day: "Day 7", activities: ["Breakfast", "Check-out", "Seaplane departure"] }
    ]
  },
  "santorini-romance": {
    name: "Santorini Romance",
    destination: "Santorini, Greece",
    image: santoriniImage,
    duration: "5 Days / 4 Nights",
    groupSize: "2-6 People",
    price: "$1,899",
    rating: 4.8,
    category: "Cultural",
    description: "Experience the romance of Greece's most beautiful island with stunning sunsets, wine tours, and traditional cuisine.",
    longDescription: "Fall in love with Santorini on this romantic getaway. Stay in a traditional cave house with caldera views, explore charming villages, taste exceptional wines, and witness the world's most famous sunsets. This package is designed for couples and small groups seeking authentic Greek experiences.",
    includes: ["Luxury Hotel", "Wine Tour", "Sunset Cruise", "Greek Cuisine"],
    highlights: [
      "Cave house accommodation in Oia",
      "Private wine tasting at 3 wineries",
      "Sunset catamaran cruise with dinner",
      "Visit to ancient Akrotiri ruins",
      "Traditional Greek cooking class",
      "Photography tour of the island's best spots"
    ],
    itinerary: [
      { day: "Day 1", activities: ["Airport arrival", "Hotel check-in", "Oia village exploration", "First Santorini sunset"] },
      { day: "Day 2", activities: ["Akrotiri excavation tour", "Red Beach visit", "Winery lunch", "Wine tasting tour"] },
      { day: "Day 3", activities: ["Fira town exploration", "Cable car ride", "Museum visits", "Sunset catamaran cruise"] },
      { day: "Day 4", activities: ["Cooking class", "Beach time at Kamari", "Village hopping", "Farewell dinner with caldera view"] },
      { day: "Day 5", activities: ["Final sunrise", "Breakfast", "Shopping", "Airport transfer"] }
    ]
  },
  "bali-adventure-package": {
    name: "Bali Adventure Package",
    destination: "Bali, Indonesia",
    image: baliImage,
    duration: "8 Days / 7 Nights",
    groupSize: "4-12 People",
    price: "$1,299",
    rating: 4.7,
    category: "Adventure",
    description: "Discover the Island of Gods through temples, rice terraces, surfing, and authentic cultural experiences.",
    longDescription: "Immerse yourself in Bali's rich culture and natural beauty with this comprehensive adventure package. From ancient temples to pristine beaches, from rice terraces to volcanic peaks, experience the full spectrum of what makes Bali magical. Perfect for adventurers and culture enthusiasts alike.",
    includes: ["Temple Tours", "Rice Terrace Trek", "Surfing Lessons", "Cultural Shows"],
    highlights: [
      "Sunrise trek to Mount Batur volcano",
      "Tegallalang rice terrace exploration",
      "Surf lessons at Kuta Beach",
      "Traditional Kecak fire dance performance",
      "Ubud monkey forest visit",
      "Tanah Lot temple at sunset"
    ],
    itinerary: [
      { day: "Day 1", activities: ["Airport arrival", "Seminyak hotel check-in", "Beach introduction", "Welcome dinner"] },
      { day: "Day 2", activities: ["Surf lesson", "Beach activities", "Tanah Lot sunset", "Seafood dinner"] },
      { day: "Day 3", activities: ["Uluwatu temple", "Cliff viewpoints", "Kecak dance show", "Jimbaran beach BBQ"] },
      { day: "Day 4", activities: ["Transfer to Ubud", "Rice terrace trek", "Coffee plantation", "Art markets"] },
      { day: "Day 5", activities: ["Mount Batur sunrise trek", "Hot springs", "Traditional lunch", "Tirta Empul temple"] },
      { day: "Day 6", activities: ["Monkey forest", "Palace visit", "Art galleries", "Balinese massage"] },
      { day: "Day 7", activities: ["Waterfall tour", "Swing experience", "Final shopping", "Cultural dinner show"] },
      { day: "Day 8", activities: ["Leisure morning", "Check-out", "Airport transfer"] }
    ]
  },
  "swiss-alps-winter-wonderland": {
    name: "Swiss Alps Winter Wonderland",
    destination: "Swiss Alps, Switzerland",
    image: swissAlpsImage,
    duration: "6 Days / 5 Nights",
    groupSize: "2-10 People",
    price: "$2,799",
    rating: 5.0,
    category: "Mountain",
    description: "Experience alpine perfection with world-class skiing, scenic trains, and Swiss traditions.",
    longDescription: "Discover the magic of the Swiss Alps in winter. This premium package combines thrilling skiing, breathtaking mountain scenery, and authentic Swiss experiences. Ride iconic trains, visit traditional villages, and indulge in Swiss chocolate and cheese while surrounded by snow-capped peaks.",
    includes: ["Ski Pass", "Mountain Lodge", "Swiss Train", "Cheese Factory"],
    highlights: [
      "3-day ski pass for premier slopes",
      "Jungfraujoch Top of Europe excursion",
      "Glacier Express scenic train journey",
      "Traditional Swiss cheese making demo",
      "Chocolate factory tour and tasting",
      "Mountain lodge with spa facilities"
    ],
    itinerary: [
      { day: "Day 1", activities: ["Zurich arrival", "Transfer to resort", "Equipment fitting", "Welcome fondue dinner"] },
      { day: "Day 2", activities: ["Full day skiing", "Ski instruction available", "Mountain lunch", "Après-ski relaxation"] },
      { day: "Day 3", activities: ["Morning skiing", "Jungfraujoch excursion", "Ice palace visit", "Mountain-top dining"] },
      { day: "Day 4", activities: ["Glacier Express journey", "Scenic photography stops", "Luxury train lunch", "Village exploration"] },
      { day: "Day 5", activities: ["Cheese factory visit", "Chocolate workshop", "Shopping in Interlaken", "Farewell raclette dinner"] },
      { day: "Day 6", activities: ["Final mountain views", "Breakfast", "Transfer to Zurich", "Departure"] }
    ]
  },
  "parisian-elegance": {
    name: "Parisian Elegance",
    destination: "Paris, France",
    image: parisImage,
    duration: "5 Days / 4 Nights",
    groupSize: "2-8 People",
    price: "$2,199",
    rating: 4.8,
    category: "City",
    description: "Immerse yourself in the romance and elegance of Paris with art, cuisine, and iconic landmarks.",
    longDescription: "Experience the City of Light in style with this curated Parisian adventure. From the Eiffel Tower to the Louvre, from charming cafés to haute cuisine, discover why Paris captivates millions. Enjoy skip-the-line access, expert guides, and exclusive experiences that bring the magic of Paris to life.",
    includes: ["4-Star Hotel", "Eiffel Tower", "Louvre Museum", "Seine Cruise"],
    highlights: [
      "Skip-the-line Eiffel Tower summit access",
      "Private Louvre Museum tour with art expert",
      "Seine River dinner cruise",
      "Day trip to Versailles Palace",
      "Montmartre walking tour with artist",
      "French cooking class with chef"
    ],
    itinerary: [
      { day: "Day 1", activities: ["Airport arrival", "Hotel check-in", "Champs-Élysées stroll", "Eiffel Tower evening"] },
      { day: "Day 2", activities: ["Louvre Museum tour", "Tuileries Gardens", "Latin Quarter lunch", "Notre-Dame area"] },
      { day: "Day 3", activities: ["Versailles palace tour", "Garden exploration", "Marie Antoinette estate", "Evening return to Paris"] },
      { day: "Day 4", activities: ["Montmartre walking tour", "Sacré-Cœur visit", "Artist demonstrations", "Seine dinner cruise"] },
      { day: "Day 5", activities: ["Cooking class", "Final shopping", "Café au lait", "Airport transfer"] }
    ]
  },
  "dubai-extravaganza": {
    name: "Dubai Extravaganza",
    destination: "Dubai, UAE",
    image: dubaiImage,
    duration: "6 Days / 5 Nights",
    groupSize: "2-10 People",
    price: "$1,999",
    rating: 4.6,
    category: "Luxury",
    description: "Experience the perfect blend of futuristic luxury and Arabian traditions in this stunning desert city.",
    longDescription: "Discover Dubai's incredible contrasts - from ultra-modern skyscrapers to traditional souks, from pristine beaches to vast deserts. This comprehensive package showcases the best of Dubai, including iconic landmarks, thrilling adventures, and luxurious experiences that define this extraordinary city.",
    includes: ["5-Star Hotel", "Desert Safari", "Burj Khalifa", "Shopping Tour"],
    highlights: [
      "Burj Khalifa At the Top observation deck",
      "Desert safari with dune bashing and BBQ",
      "Dubai Mall and Gold Souk shopping spree",
      "Palm Jumeirah monorail and Atlantis tour",
      "Traditional dhow cruise dinner",
      "Abu Dhabi day trip with Grand Mosque"
    ],
    itinerary: [
      { day: "Day 1", activities: ["Airport arrival", "5-star hotel check-in", "Dubai Mall visit", "Fountains show"] },
      { day: "Day 2", activities: ["Burj Khalifa morning", "Dubai Marina walk", "Palm Jumeirah tour", "Beach club lunch"] },
      { day: "Day 3", activities: ["Desert safari day", "Dune bashing", "Camel riding", "BBQ dinner with entertainment"] },
      { day: "Day 4", activities: ["Old Dubai exploration", "Gold & spice souks", "Dubai Creek", "Dhow cruise dinner"] },
      { day: "Day 5", activities: ["Abu Dhabi day trip", "Grand Mosque", "Emirates Palace", "Ferrari World option"] },
      { day: "Day 6", activities: ["Final shopping", "Breakfast", "Leisure time", "Airport transfer"] }
    ]
  }
};

const TourDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  const tour = toursData[id as keyof typeof toursData];

  if (!tour) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Tour Not Found</h1>
          <Button onClick={() => navigate("/tours")}>Back to Tours</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src={tour.image}
            alt={tour.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <Button
            variant="outline"
            className="mb-6 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={() => navigate("/tours")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tours
          </Button>
          
          <div className="max-w-3xl">
            <Badge className="mb-4 text-lg px-4 py-2">{tour.category}</Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
              {tour.name}
            </h1>
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-xl text-white/90">{tour.destination}</span>
            </div>
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-secondary fill-secondary" />
                <span className="text-2xl font-bold text-white">{tour.rating}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Calendar className="w-5 h-5" />
                <span className="text-lg">{tour.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Users className="w-5 h-5" />
                <span className="text-lg">{tour.groupSize}</span>
              </div>
              <Badge className="text-xl px-4 py-2 bg-secondary text-secondary-foreground">
                {tour.price}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Tour Overview</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {tour.longDescription}
              </p>
            </Card>

            {/* Tour Highlights */}
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">Tour Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Day-by-Day Itinerary */}
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">Day-by-Day Itinerary</h2>
              <div className="space-y-6">
                {tour.itinerary.map((day, index) => (
                  <div key={index} className="border-l-4 border-primary pl-6 py-2">
                    <h3 className="text-xl font-bold text-foreground mb-3">{day.day}</h3>
                    <ul className="space-y-2">
                      {day.activities.map((activity, actIndex) => (
                        <li key={actIndex} className="flex items-start space-x-2">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Card>

            {/* Package Includes */}
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">Package Includes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tour.includes.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 border-2 border-primary/20">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-foreground mb-2">{tour.price}</div>
                <p className="text-muted-foreground">per person</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>{tour.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Users className="w-5 h-5 text-primary" />
                    <span>{tour.groupSize}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Star className="w-5 h-5 text-primary" />
                    <span>{tour.rating} rating</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-ocean hover:shadow-glow transition-all duration-300 text-lg py-6"
                onClick={() => setBookingDialogOpen(true)}
              >
                Book This Tour
              </Button>

              <p className="text-sm text-muted-foreground text-center mt-4">
                Free cancellation up to 48 hours before departure
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      
      <BookingDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        packageName={tour.name}
        price={tour.price}
        destination={tour.destination}
      />
    </div>
  );
};

export default TourDetail;
