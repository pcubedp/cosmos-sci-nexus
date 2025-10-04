import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchBar = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-nebula blur-xl opacity-50 rounded-full"></div>
      <div className="relative flex gap-2 p-2 bg-card border border-border rounded-full shadow-elevated">
        <div className="flex-1 flex items-center gap-2 px-4">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search NASA bioscience publications..." 
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground"
          />
        </div>
        <Button className="rounded-full bg-gradient-primary hover:shadow-glow-primary transition-all">
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
