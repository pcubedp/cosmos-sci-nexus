import { Filter, Calendar, Beaker, TrendingUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const FilterSidebar = () => {
  return (
    <aside className="w-64 bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Date Range</h3>
          </div>
          <div className="space-y-2">
            {["Last 7 days", "Last 30 days", "Last 6 months", "Last year"].map((range) => (
              <div key={range} className="flex items-center space-x-2">
                <Checkbox id={range} />
                <Label htmlFor={range} className="text-sm text-muted-foreground cursor-pointer">
                  {range}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border" />

        <div>
          <div className="flex items-center gap-2 mb-3">
            <Beaker className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Experiment Type</h3>
          </div>
          <div className="space-y-2">
            {["Microgravity", "Radiation Studies", "Plant Biology", "Cell Culture"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={type} />
                <Label htmlFor={type} className="text-sm text-muted-foreground cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border" />

        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Research Outcomes</h3>
          </div>
          <div className="space-y-2">
            {["Breakthrough", "Significant", "Preliminary", "Ongoing"].map((outcome) => (
              <div key={outcome} className="flex items-center space-x-2">
                <Checkbox id={outcome} />
                <Label htmlFor={outcome} className="text-sm text-muted-foreground cursor-pointer">
                  {outcome}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
