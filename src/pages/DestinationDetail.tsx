import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, Users, Check, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { BookingDialog } from "@/components/BookingDialog";
import maldivesImage from "@/assets/maldives.jpg";
import santoriniImage from "@/assets/santorini.jpg";
import baliImage from "@/assets/bali.jpg";
import swissAlpsImage from "@/assets/swiss-alps.jpg";
import parisImage from "@/assets/paris.jpg";
import dubaiImage from "@/assets/dubai.jpg";

const destinationsData = {
  maldives: {
    name: "Maldives",
    location: "Indian Ocean",
    image: maldivesImage,
    price: "$2,499",
    rating: 4.9,
    reviews: 342,
    description: "Crystal clear waters, overwater villas, and pristine beaches await you in this tropical paradise.",
    longDescription: "The Maldives is a tropical paradise consisting of 26 ring-shaped atolls, made up of more than 1,000 coral islands. Known for its incredible marine life, crystal-clear turquoise waters, and luxurious overwater bungalows, the Maldives offers an unparalleled island escape. Perfect for honeymooners, divers, and anyone seeking pure relaxation in an idyllic setting.",
    highlights: [
      "Overwater villa accommodation with direct ocean access",
      "World-class snorkeling and diving spots",
      "Sunset dolphin watching cruises",
      "Private beach dinners under the stars",
      "Spa treatments with ocean views",
      "Water sports including jet skiing and parasailing"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival & Villa Check-in", description: "Seaplane transfer to resort, settle into your overwater villa" },
      { day: "Day 2-3", title: "Water Activities", description: "Snorkeling, diving, and water sports adventures" },
      { day: "Day 4", title: "Island Hopping", description: "Visit local islands and experience Maldivian culture" },
      { day: "Day 5-6", title: "Relaxation Days", description: "Spa treatments, beach time, and leisure activities" },
      { day: "Day 7", title: "Departure", description: "Morning at leisure, afternoon departure" }
    ],
    included: [
      "7 days / 6 nights accommodation",
      "All meals and premium beverages",
      "Return seaplane transfers",
      "Complimentary spa treatment",
      "Water sports equipment",
      "Guided snorkeling tours"
    ]
  },
  santorini: {
    name: "Santorini",
    location: "Greece",
    image: santoriniImage,
    price: "$1,899",
    rating: 4.8,
    reviews: 428,
    description: "Iconic white-washed buildings, stunning sunsets, and the Aegean Sea's crystal blue waters.",
    longDescription: "Santorini is the jewel of the Aegean Sea, famous for its dramatic cliff-top villages, stunning sunsets, and unique volcanic beaches. The island's white-washed buildings with blue domes create one of the most photographed landscapes in the world. Explore ancient ruins, taste world-class wines, and immerse yourself in authentic Greek culture.",
    highlights: [
      "Stay in a traditional cave house in Oia",
      "Watch the world-famous Santorini sunset",
      "Visit ancient Akrotiri archaeological site",
      "Wine tasting at volcanic vineyards",
      "Sailing cruise around the caldera",
      "Explore charming villages of Fira and Imerovigli"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Santorini", description: "Transfer to hotel, evening stroll in Oia" },
      { day: "Day 2", title: "Island Discovery", description: "Visit Akrotiri ruins and Red Beach" },
      { day: "Day 3", title: "Wine & Sunset", description: "Vineyard tours and sunset dinner cruise" },
      { day: "Day 4", title: "Beach Day", description: "Relax at Kamari or Perissa black sand beaches" },
      { day: "Day 5", title: "Departure", description: "Morning at leisure, afternoon transfer" }
    ],
    included: [
      "5 days / 4 nights luxury accommodation",
      "Daily breakfast with caldera views",
      "Airport transfers",
      "Wine tasting tour",
      "Sunset sailing cruise",
      "Archaeological site entrance fees"
    ]
  },
  bali: {
    name: "Bali",
    location: "Indonesia",
    image: baliImage,
    price: "$1,299",
    rating: 4.7,
    reviews: 516,
    description: "Ancient temples, lush rice terraces, and a rich cultural heritage in the Island of Gods.",
    longDescription: "Bali, known as the Island of Gods, is a magical blend of stunning natural beauty, rich culture, and warm hospitality. From the emerald rice terraces of Ubud to the pristine beaches of Seminyak, from ancient temples to vibrant markets, Bali offers diverse experiences. Immerse yourself in Balinese traditions, enjoy world-class surfing, or find your zen in a yoga retreat.",
    highlights: [
      "Visit iconic Tanah Lot temple at sunset",
      "Trek through Tegallalang rice terraces",
      "Explore Ubud's monkey forest and art galleries",
      "Surf lessons at Kuta or Seminyak beaches",
      "Traditional Balinese dance performances",
      "Sunrise trek to Mount Batur volcano"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival & Seminyak", description: "Check-in to beach resort, evening at leisure" },
      { day: "Day 2-3", title: "Beach & Temples", description: "Beach activities, visit Tanah Lot and Uluwatu temples" },
      { day: "Day 4-5", title: "Ubud Culture", description: "Rice terraces, monkey forest, art markets" },
      { day: "Day 6", title: "Mount Batur Adventure", description: "Sunrise volcano trek and hot springs" },
      { day: "Day 7-8", title: "Relaxation", description: "Spa treatments, beach time, shopping" },
      { day: "Day 9", title: "Departure", description: "Morning at leisure, transfer to airport" }
    ],
    included: [
      "8 days / 7 nights accommodation",
      "Daily breakfast",
      "Private airport transfers",
      "Temple entrance fees",
      "Surf lesson and equipment",
      "Cultural dance show tickets",
      "Guided tours with English-speaking guide"
    ]
  },
  "swiss-alps": {
    name: "Swiss Alps",
    location: "Switzerland",
    image: swissAlpsImage,
    price: "$2,799",
    rating: 5.0,
    reviews: 287,
    description: "Majestic mountain peaks, pristine alpine lakes, and charming villages nestled in valleys.",
    longDescription: "The Swiss Alps offer breathtaking mountain scenery, world-class skiing, and charming alpine villages. Whether you're seeking adventure on the slopes, scenic train rides through mountain passes, or simply want to breathe in the crisp mountain air, the Swiss Alps deliver unforgettable experiences. Discover chocolate factories, cheese dairies, and traditional Swiss hospitality.",
    highlights: [
      "Jungfraujoch - Top of Europe experience",
      "Scenic Glacier Express train journey",
      "Skiing or snowboarding in world-famous resorts",
      "Visit traditional Swiss cheese factory",
      "Cable car rides to stunning viewpoints",
      "Explore charming villages of Zermatt and Interlaken"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Zurich", description: "Transfer to mountain resort, welcome dinner" },
      { day: "Day 2-3", title: "Skiing & Snowboarding", description: "Full days on the slopes with equipment included" },
      { day: "Day 4", title: "Jungfraujoch Excursion", description: "Visit the Top of Europe, ice palace, and viewing platforms" },
      { day: "Day 5", title: "Glacier Express", description: "Scenic train journey through the Alps" },
      { day: "Day 6", title: "Swiss Traditions", description: "Cheese factory and chocolate workshop visits" },
      { day: "Day 7", title: "Departure", description: "Morning at leisure, afternoon transfer" }
    ],
    included: [
      "6 days / 5 nights mountain lodge accommodation",
      "All meals included",
      "3-day ski pass",
      "Ski equipment rental",
      "Jungfraujoch train tickets",
      "Glacier Express reserved seats",
      "Swiss Travel Pass for local transport"
    ]
  },
  paris: {
    name: "Paris",
    location: "France",
    image: parisImage,
    price: "$2,199",
    rating: 4.8,
    reviews: 612,
    description: "The City of Light offers romance, world-class art, iconic landmarks, and exquisite cuisine.",
    longDescription: "Paris, the City of Light, is a timeless destination of romance, art, and culture. From the iconic Eiffel Tower to the masterpieces of the Louvre, from charming sidewalk cafés to haute couture boutiques, Paris captivates all who visit. Stroll along the Seine, explore historic neighborhoods, and indulge in world-renowned French cuisine and wine.",
    highlights: [
      "Skip-the-line access to Eiffel Tower",
      "Guided tour of the Louvre Museum",
      "Seine River dinner cruise",
      "Visit Versailles Palace and gardens",
      "Montmartre and Sacré-Cœur exploration",
      "French cooking class experience"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival & Orientation", description: "Hotel check-in, evening Eiffel Tower visit" },
      { day: "Day 2", title: "Art & Culture", description: "Louvre Museum tour, Latin Quarter exploration" },
      { day: "Day 3", title: "Royal Versailles", description: "Full day at Palace of Versailles" },
      { day: "Day 4", title: "Montmartre & Seine", description: "Artist district tour, dinner cruise" },
      { day: "Day 5", title: "Departure", description: "Morning shopping, afternoon transfer" }
    ],
    included: [
      "5 days / 4 nights 4-star hotel",
      "Daily breakfast",
      "Skip-the-line museum tickets",
      "Seine River dinner cruise",
      "Versailles entrance and audio guide",
      "Paris Metro travel pass",
      "French cooking class"
    ]
  },
  dubai: {
    name: "Dubai",
    location: "UAE",
    image: dubaiImage,
    price: "$1,999",
    rating: 4.6,
    reviews: 394,
    description: "Futuristic skyline, luxury shopping, and a blend of modern innovation with Arabian heritage.",
    longDescription: "Dubai is a dazzling fusion of futuristic architecture, luxury shopping, and Arabian traditions. From the world's tallest building to pristine beaches, from traditional souks to ultra-modern malls, Dubai offers contrasts that excite and inspire. Experience desert safaris, world-class dining, and hospitality that sets the global standard.",
    highlights: [
      "Burj Khalifa At the Top observation deck",
      "Desert safari with dune bashing and BBQ dinner",
      "Dubai Mall and Gold Souk shopping",
      "Palm Jumeirah and Atlantis visit",
      "Traditional dhow cruise on Dubai Creek",
      "Indoor ski resort experience"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival & City Introduction", description: "Hotel check-in, evening at Dubai Mall" },
      { day: "Day 2", title: "Modern Dubai", description: "Burj Khalifa, Dubai Marina, Palm Jumeirah" },
      { day: "Day 3", title: "Desert Adventure", description: "Full day desert safari with entertainment" },
      { day: "Day 4", title: "Traditional Dubai", description: "Old Dubai, souks, Dubai Creek cruise" },
      { day: "Day 5", title: "Leisure & Shopping", description: "Beach time or shopping, farewell dinner" },
      { day: "Day 6", title: "Departure", description: "Morning at leisure, airport transfer" }
    ],
    included: [
      "6 days / 5 nights 5-star hotel",
      "Daily breakfast and 2 dinners",
      "Burj Khalifa tickets (124th & 125th floor)",
      "Desert safari with BBQ dinner",
      "Dubai Creek dhow cruise",
      "City tour with guide",
      "Airport transfers in luxury vehicle"
    ]
  }
};

const DestinationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  const destination = destinationsData[id as keyof typeof destinationsData];

  if (!destination) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Destination Not Found</h1>
          <Button onClick={() => navigate("/destinations")}>Back to Destinations</Button>
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
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <Button
            variant="outline"
            className="mb-6 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={() => navigate("/destinations")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Destinations
          </Button>
          
          <div className="max-w-3xl">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-xl text-white/90">{destination.location}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
              {destination.name}
            </h1>
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 text-secondary fill-secondary" />
                <span className="text-2xl font-bold text-white">{destination.rating}</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Users className="w-5 h-5" />
                <span className="text-lg">{destination.reviews} reviews</span>
              </div>
              <Badge className="text-xl px-4 py-2 bg-secondary text-secondary-foreground">
                From {destination.price}
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
              <h2 className="text-3xl font-bold text-foreground mb-4">Overview</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {destination.longDescription}
              </p>
            </Card>

            {/* Highlights */}
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">Experience Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Itinerary */}
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">Sample Itinerary</h2>
              <div className="space-y-6">
                {destination.itinerary.map((item, index) => (
                  <div key={index} className="flex space-x-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        {index + 1}
                      </div>
                      {index < destination.itinerary.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="pb-8 flex-1">
                      <div className="text-sm text-primary font-semibold mb-1">{item.day}</div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* What's Included */}
            <Card className="p-8">
              <h2 className="text-3xl font-bold text-foreground mb-6">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.included.map((item, index) => (
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
                <div className="text-4xl font-bold text-foreground mb-2">{destination.price}</div>
                <p className="text-muted-foreground">per person</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Flexible dates</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Users className="w-5 h-5 text-primary" />
                    <span>Group discounts available</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Star className="w-5 h-5 text-primary" />
                    <span>{destination.rating} ({destination.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-gradient-ocean hover:shadow-glow transition-all duration-300 text-lg py-6"
                onClick={() => setBookingDialogOpen(true)}
              >
                Book This Experience
              </Button>

              <p className="text-sm text-muted-foreground text-center mt-4">
                Free cancellation up to 24 hours before departure
              </p>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      
      <BookingDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        packageName={`${destination.name} Experience`}
        price={destination.price}
        destination={destination.name}
      />
    </div>
  );
};

export default DestinationDetail;
