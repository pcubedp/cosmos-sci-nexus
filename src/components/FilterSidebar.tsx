import { Filter, Calendar, Beaker, TrendingUp, Layers, Users, FileCheck } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterSidebarProps {
  depthOfSummary: string;
  userType: string;
  informationTypes: string[];
  onDepthChange: (value: string) => void;
  onUserTypeChange: (value: string) => void;
  onInformationTypeToggle: (type: string) => void;
}

const FilterSidebar = ({
  depthOfSummary,
  userType,
  informationTypes,
  onDepthChange,
  onUserTypeChange,
  onInformationTypeToggle,
}: FilterSidebarProps) => {
  return (
    <aside className="w-64 bg-card border border-border rounded-lg p-6 h-fit sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
      </div>

      <div className="space-y-6">
        {/* Depth of Summary */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Depth of Summary</h3>
          </div>
          <RadioGroup value={depthOfSummary} onValueChange={onDepthChange}>
            {["Basic", "Intermediate", "Advanced"].map((depth) => (
              <div key={depth} className="flex items-center space-x-2">
                <RadioGroupItem value={depth} id={`depth-${depth}`} />
                <Label htmlFor={`depth-${depth}`} className="text-sm text-muted-foreground cursor-pointer">
                  {depth}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator className="bg-border" />

        {/* User Type */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">User Type</h3>
          </div>
          <Select value={userType} onValueChange={onUserTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select user type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Researcher">Researcher</SelectItem>
              <SelectItem value="Professor">Professor</SelectItem>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="General Public">General Public</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="bg-border" />

        {/* Information Type */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileCheck className="w-4 h-4 text-muted-foreground" />
            <h3 className="text-sm font-medium text-foreground">Information Type</h3>
          </div>
          <div className="space-y-2">
            {["Abstract", "Methods", "Results", "Impacts"].map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`info-${type}`}
                  checked={informationTypes.includes(type)}
                  onCheckedChange={() => onInformationTypeToggle(type)}
                />
                <Label htmlFor={`info-${type}`} className="text-sm text-muted-foreground cursor-pointer">
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-border" />

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
