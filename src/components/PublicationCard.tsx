import { Calendar, User, FileText, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PublicationCardProps {
  title: string;
  summary: string;
  date: string;
  authors: string;
  experimentType: string;
  outcome: string;
}

const PublicationCard = ({ title, summary, date, authors, experimentType, outcome }: PublicationCardProps) => {
  return (
    <div className="group bg-gradient-card backdrop-blur-sm border border-border rounded-lg p-6 hover:shadow-elevated hover:border-primary/50 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex gap-2 mb-3">
            <Badge variant="secondary" className="text-xs">
              {experimentType}
            </Badge>
            <Badge variant="outline" className="text-xs border-accent text-accent">
              {outcome}
            </Badge>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="hover:text-primary">
          <Bookmark className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        {summary}
      </p>

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{authors}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 gap-1">
          <FileText className="w-3 h-3" />
          Read More
        </Button>
      </div>
    </div>
  );
};

export default PublicationCard;
