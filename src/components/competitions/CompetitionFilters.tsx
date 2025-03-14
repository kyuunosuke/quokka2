import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CompetitionFiltersProps {
  onFilterChange: (filters: {
    category: string;
    difficulty: string;
    prizeRange: string;
    deadline: string;
  }) => void;
}

const categories = [
  "Photography",
  "Technology",
  "Fashion",
  "Writing",
  "Food",
  "Art",
  "Health",
];

const difficulties = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const prizeRanges = [
  { value: "low", label: "Under $2,000" },
  { value: "medium", label: "$2,000 - $5,000" },
  { value: "high", label: "$5,000+" },
];

const deadlines = [
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "later", label: "Later" },
];

const CompetitionFilters = ({ onFilterChange }: CompetitionFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: "all",
    difficulty: "all",
    prizeRange: "all",
    deadline: "all",
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);

    // Count active filters
    const count = Object.values(newFilters).filter((v) => v !== "all").length;
    setActiveFiltersCount(count);
  };

  const clearFilters = () => {
    const emptyFilters = {
      category: "all",
      difficulty: "all",
      prizeRange: "all",
      deadline: "all",
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
    setActiveFiltersCount(0);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
      <div className="p-4 flex items-center justify-between bg-gray-50 border-b border-gray-100">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          {activeFiltersCount > 0 && (
            <Badge className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-200">
              {activeFiltersCount} active
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Clear all
            </Button>
          )}
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="md:hidden"
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isOpen ? "Hide Filters" : "Show Filters"}
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
      </div>

      <div className="md:block hidden">
        <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <Select
              value={filters.category}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty
            </label>
            <Select
              value={filters.difficulty}
              onValueChange={(value) => handleFilterChange("difficulty", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Difficulty</SelectItem>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty.value} value={difficulty.value}>
                    {difficulty.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prize Value
            </label>
            <Select
              value={filters.prizeRange}
              onValueChange={(value) => handleFilterChange("prizeRange", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any Prize Value" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Prize Value</SelectItem>
                {prizeRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <Select
              value={filters.deadline}
              onValueChange={(value) => handleFilterChange("deadline", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Any Deadline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Deadline</SelectItem>
                {deadlines.map((deadline) => (
                  <SelectItem key={deadline.value} value={deadline.value}>
                    {deadline.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Collapsible open={isOpen} className="md:hidden">
        <CollapsibleContent>
          <div className="p-4 grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <Select
                value={filters.category}
                onValueChange={(value) => handleFilterChange("category", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <Select
                value={filters.difficulty}
                onValueChange={(value) =>
                  handleFilterChange("difficulty", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Any Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Difficulty</SelectItem>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prize Value
              </label>
              <Select
                value={filters.prizeRange}
                onValueChange={(value) =>
                  handleFilterChange("prizeRange", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Any Prize Value" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Prize Value</SelectItem>
                  {prizeRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
              </label>
              <Select
                value={filters.deadline}
                onValueChange={(value) => handleFilterChange("deadline", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Any Deadline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Deadline</SelectItem>
                  {deadlines.map((deadline) => (
                    <SelectItem key={deadline.value} value={deadline.value}>
                      {deadline.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default CompetitionFilters;
