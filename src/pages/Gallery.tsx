import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import galleryHero from "@/assets/gallery-hero.jpg";
import maldivesImage from "@/assets/maldives.jpg";
import santoriniImage from "@/assets/santorini.jpg";
import baliImage from "@/assets/bali.jpg";
import swissAlpsImage from "@/assets/swiss-alps.jpg";
import parisImage from "@/assets/paris.jpg";
import dubaiImage from "@/assets/dubai.jpg";

const Gallery = () => {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Beaches", "Mountains", "Cities", "Cultural", "Adventure"];

  const galleryItems = [
    { image: maldivesImage, title: "Maldives Paradise", category: "Beaches", location: "Maldives" },
    { image: santoriniImage, title: "Santorini Sunset", category: "Cultural", location: "Greece" },
    { image: baliImage, title: "Bali Temple", category: "Cultural", location: "Indonesia" },
    { image: swissAlpsImage, title: "Alpine Beauty", category: "Mountains", location: "Switzerland" },
    { image: parisImage, title: "Eiffel Tower", category: "Cities", location: "France" },
    { image: dubaiImage, title: "Dubai Skyline", category: "Cities", location: "UAE" },
    { image: maldivesImage, title: "Tropical Waters", category: "Beaches", location: "Maldives" },
    { image: swissAlpsImage, title: "Mountain Adventure", category: "Adventure", location: "Switzerland" },
    { image: baliImage, title: "Jungle Retreat", category: "Adventure", location: "Indonesia" },
  ];

  const filteredItems = filter === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src={galleryHero}
            alt="Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Travel Gallery
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in">
            Glimpses of adventures from around the world
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-8 bg-card sticky top-20 z-40 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={filter === category ? "default" : "outline"}
                className={`cursor-pointer px-6 py-2 text-sm font-semibold transition-all duration-300 ${
                  filter === category 
                    ? "bg-primary text-primary-foreground shadow-glow" 
                    : "hover:bg-primary/10"
                }`}
                onClick={() => setFilter(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <Card
              key={index}
              className="group overflow-hidden cursor-pointer border-border hover:shadow-glow transition-all duration-500 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <Badge className="mb-2 bg-primary text-primary-foreground">
                    {item.category}
                  </Badge>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-muted-foreground">No images found in this category</p>
          </div>
        )}
      </section>

      {/* Instagram CTA */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Share Your Journey
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Tag us @travelo in your travel photos for a chance to be featured in our gallery
          </p>
          <Badge className="text-lg px-8 py-3 bg-gradient-sunset cursor-pointer hover:shadow-glow transition-all duration-300">
            #TraveloAdventures
          </Badge>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
