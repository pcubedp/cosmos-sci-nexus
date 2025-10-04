import { X, User, Calendar, Beaker, TrendingUp, FileText, FlaskConical, Target, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Publication } from "@/hooks/usePublications";

interface PublicationDetailPanelProps {
  publication: Publication | null;
  onClose: () => void;
  informationTypes: string[];
}

const PublicationDetailPanel = ({ publication, onClose, informationTypes }: PublicationDetailPanelProps) => {
  if (!publication) return null;

  const showSection = (type: string) => {
    return informationTypes.length === 0 || informationTypes.includes(type);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-full md:w-2/3 lg:w-1/2 bg-card border-l border-border shadow-elevated overflow-y-auto">
        <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 flex items-start justify-between z-10">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground mb-2">{publication.title}</h2>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">{publication.experimentType}</Badge>
              <Badge variant="outline" className="border-accent text-accent">
                {publication.outcome}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:text-primary">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Authors:</span>
              <span className="text-foreground font-medium">{publication.authors}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Date:</span>
              <span className="text-foreground font-medium">{publication.date}</span>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* AI Summary */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">AI-Generated Summary</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">{publication.summary}</p>
          </div>

          {/* Key Concepts */}
          {publication.keyConcepts && publication.keyConcepts.length > 0 && (
            <>
              <Separator className="bg-border" />
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Key Concepts</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {publication.keyConcepts.map((concept, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {concept}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Detailed Information Tabs */}
          {(showSection("Abstract") || showSection("Methods") || showSection("Results") || showSection("Impacts")) && (
            <>
              <Separator className="bg-border" />
              <Tabs defaultValue="abstract" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  {showSection("Abstract") && (
                    <TabsTrigger value="abstract" className="text-xs">
                      <FileText className="w-3 h-3 mr-1" />
                      Abstract
                    </TabsTrigger>
                  )}
                  {showSection("Methods") && (
                    <TabsTrigger value="methods" className="text-xs">
                      <FlaskConical className="w-3 h-3 mr-1" />
                      Methods
                    </TabsTrigger>
                  )}
                  {showSection("Results") && (
                    <TabsTrigger value="results" className="text-xs">
                      <Beaker className="w-3 h-3 mr-1" />
                      Results
                    </TabsTrigger>
                  )}
                  {showSection("Impacts") && (
                    <TabsTrigger value="impacts" className="text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Impacts
                    </TabsTrigger>
                  )}
                </TabsList>

                {showSection("Abstract") && (
                  <TabsContent value="abstract" className="mt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {publication.abstract || "Abstract information not available for this publication."}
                    </p>
                  </TabsContent>
                )}

                {showSection("Methods") && (
                  <TabsContent value="methods" className="mt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {publication.methods || "Methodology information not available for this publication."}
                    </p>
                  </TabsContent>
                )}

                {showSection("Results") && (
                  <TabsContent value="results" className="mt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {publication.results || "Results information not available for this publication."}
                    </p>
                  </TabsContent>
                )}

                {showSection("Impacts") && (
                  <TabsContent value="impacts" className="mt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {publication.impacts || "Impact information not available for this publication."}
                    </p>
                  </TabsContent>
                )}
              </Tabs>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicationDetailPanel;
