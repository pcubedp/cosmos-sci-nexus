import { Rocket, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Rocket className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Space Biology Knowledge Engine</h1>
            <p className="text-xs text-muted-foreground">NASA Bioscience Research Hub</p>
          </div>
        </div>
        
        <Button variant="outline" size="sm" className="gap-2">
          <User className="w-4 h-4" />
          Sign In
        </Button>
      </div>
    </header>
  );
};

export default Header;
