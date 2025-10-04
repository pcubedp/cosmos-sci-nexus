import { useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import PublicationCard from "@/components/PublicationCard";
import GraphVisualization from "@/components/GraphVisualization";
import PublicationDetailPanel from "@/components/PublicationDetailPanel";
import { mockPublications } from "@/data/mockPublications";
import { usePublications, Publication, GraphData } from "@/hooks/usePublications";
import { Sparkles, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const { publications, isLoading, searchPublications, fetchRelatedPublications } = usePublications();
  const [displayPublications, setDisplayPublications] = useState<Publication[]>(mockPublications as Publication[]);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [isLoadingGraph, setIsLoadingGraph] = useState(false);

  // Filter states
  const [depthOfSummary, setDepthOfSummary] = useState("Intermediate");
  const [userType, setUserType] = useState("Researcher");
  const [informationTypes, setInformationTypes] = useState<string[]>([]);

  const handleSearch = async (query: string) => {
    await searchPublications(query);
    // After search, update display publications
    // In a real app, this would come from the API response
    setDisplayPublications(publications.length > 0 ? publications : mockPublications);
  };

  const handlePublicationClick = async (publication: Publication) => {
    setSelectedPublication(publication);
    setIsLoadingGraph(true);
    
    const data = await fetchRelatedPublications(publication.id);
    setGraphData(data);
    setIsLoadingGraph(false);
  };

  const handleNodeClick = async (publicationId: string) => {
    // Find the publication from graph data or fetch it
    const pub = graphData?.publications[publicationId];
    if (pub) {
      setSelectedPublication(pub);
    }
  };

  const handleInformationTypeToggle = (type: string) => {
    setInformationTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

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
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
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
          <FilterSidebar
            depthOfSummary={depthOfSummary}
            userType={userType}
            informationTypes={informationTypes}
            onDepthChange={setDepthOfSummary}
            onUserTypeChange={setUserType}
            onInformationTypeToggle={handleInformationTypeToggle}
          />
          
          <div className="flex-1 space-y-8">
            {/* Publications List */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">
                  {isLoading ? "Searching..." : "Publications"}
                  <span className="text-sm text-muted-foreground ml-2">
                    ({displayPublications.length} results)
                  </span>
                </h2>
              </div>

              <div className="space-y-6">
                {isLoading ? (
                  Array.from({ length: 3 }).map((_, idx) => (
                    <div key={idx} className="bg-card border border-border rounded-lg p-6 space-y-4">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-24" />
                      </div>
                    </div>
                  ))
                ) : (
                  displayPublications.map((pub) => (
                    <div key={pub.id} onClick={() => handlePublicationClick(pub)} className="cursor-pointer">
                      <PublicationCard {...pub} />
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Graph Visualization */}
            {selectedPublication && (
              <div>
                {isLoadingGraph ? (
                  <div className="w-full h-[600px] bg-card/40 border border-border rounded-lg flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="w-8 h-8 text-primary animate-spin" />
                      <p className="text-muted-foreground">Loading relationship graph...</p>
                    </div>
                  </div>
                ) : (
                  <GraphVisualization
                    data={graphData}
                    onNodeClick={handleNodeClick}
                    selectedNodeId={selectedPublication.id}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Publication Detail Panel */}
      <PublicationDetailPanel
        publication={selectedPublication}
        onClose={() => setSelectedPublication(null)}
        informationTypes={informationTypes}
      />
    </div>
  );
};

export default Index;
