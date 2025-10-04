import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import PublicationCard from "@/components/PublicationCard";
import { mockPublications } from "@/data/mockPublications";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [publications] = useState(mockPublications);

  return (
    <div className="min-h-screen bg-gradient-cosmic">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI-Powered Research Discovery</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-primary">
            Explore NASA's Space Biology Research
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Search, discover, and understand groundbreaking bioscience experiments from the International Space Station
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <SearchBar />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {[
            { label: "Publications", value: "1,247" },
            { label: "Active Experiments", value: "156" },
            { label: "Research Teams", value: "89" }
          ].map((stat) => (
            <div key={stat.label} className="bg-card/60 backdrop-blur-sm border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-12">
        <div className="flex gap-8">
          <FilterSidebar />
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Recent Publications
                <span className="text-sm text-muted-foreground ml-2">({publications.length} results)</span>
              </h2>
            </div>

            <div className="space-y-6">
              {publications.map((pub) => (
                <PublicationCard key={pub.id} {...pub} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
