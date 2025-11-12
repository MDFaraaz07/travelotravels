import { Card } from "@/components/ui/card";
import { Award, Users, Globe, Heart, Target, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import aboutHero from "@/assets/about-hero.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion for Travel",
      description: "We live and breathe travel, bringing genuine enthusiasm to every journey we plan."
    },
    {
      icon: Target,
      title: "Customer First",
      description: "Your satisfaction and safety are at the heart of everything we do."
    },
    {
      icon: Shield,
      title: "Trust & Reliability",
      description: "Over 15 years of delivering exceptional travel experiences worldwide."
    },
  ];

  const milestones = [
    { year: "2008", event: "Travelo Founded", description: "Started with a vision to revolutionize travel" },
    { year: "2012", event: "50K Travelers", description: "Reached our first major milestone" },
    { year: "2018", event: "Award Winner", description: "Named Best Travel Agency of the Year" },
    { year: "2024", event: "Global Expansion", description: "Now operating in 150+ destinations" },
  ];

  const team = [
    { name: "Faraaz Khan", role: "CEO & Founder", expertise: "Luxury Travel Specialist" },
    { name: "Kanishk Pandey", role: "Head of Operations", expertise: "Adventure Tours Expert" },
    { name: "Armaan Khan", role: "Senior Travel Consultant", expertise: "Cultural Experiences" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0">
          <img
            src={aboutHero}
            alt="About Travelo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            About Travelo
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in">
            15+ years of creating unforgettable travel experiences around the globe
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-6 text-center">Our Story</h2>
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              Founded in 2008, Travelo began with a simple mission: to make extraordinary travel accessible to everyone. What started as a small team of passionate travelers has grown into a leading travel agency serving thousands of adventurers worldwide.
            </p>
            <p>
              Our journey has been fueled by our love for exploration and a deep commitment to creating meaningful experiences. We believe travel is more than just visiting new places—it's about connecting with cultures, creating memories, and transforming perspectives.
            </p>
            <p>
              Today, with over 50,000 satisfied travelers and partnerships with premium hotels, airlines, and local guides worldwide, we continue to innovate and elevate the art of travel planning.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-8 text-center hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border-border"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Our Journey</h2>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className="flex items-start space-x-6 group animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-3xl font-bold bg-gradient-sunset bg-clip-text text-transparent">
                    {milestone.year}
                  </span>
                </div>
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary mt-2 relative">
                  <div className="absolute inset-0 bg-primary/30 rounded-full animate-ping" />
                </div>
                <div className="flex-1 pb-8 border-l-2 border-border pl-6 -ml-[9px]">
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {milestone.event}
                  </h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-center">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            Passionate travel experts dedicated to creating your perfect journey
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border-border"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-ocean mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-semibold mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.expertise}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
            <div className="text-4xl font-bold text-foreground mb-2">150+</div>
            <div className="text-muted-foreground">Destinations</div>
          </div>
          <div className="text-center">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <div className="text-4xl font-bold text-foreground mb-2">50K+</div>
            <div className="text-muted-foreground">Happy Travelers</div>
          </div>
          <div className="text-center">
            <Award className="w-12 h-12 text-primary mx-auto mb-4" />
            <div className="text-4xl font-bold text-foreground mb-2">25+</div>
            <div className="text-muted-foreground">Awards</div>
          </div>
          <div className="text-center">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <div className="text-4xl font-bold text-foreground mb-2">4.9</div>
            <div className="text-muted-foreground">Rating</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
