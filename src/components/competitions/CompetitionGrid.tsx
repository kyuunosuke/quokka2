import { useState, useEffect } from "react";
import CompetitionCard, { Competition } from "./CompetitionCard";
import CompetitionFilters from "./CompetitionFilters";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "../../../supabase/supabase";
import { useAuth } from "../../../supabase/auth";
import { Button } from "@/components/ui/button";

interface CompetitionGridProps {
  initialCompetitions?: Competition[];
  isLoading?: boolean;
}

const CompetitionGrid = ({
  initialCompetitions = [],
  isLoading: initialLoading = false,
}: CompetitionGridProps) => {
  const [competitions, setCompetitions] =
    useState<Competition[]>(initialCompetitions);
  const [filteredCompetitions, setFilteredCompetitions] =
    useState<Competition[]>(initialCompetitions);
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [filters, setFilters] = useState({
    category: "all",
    difficulty: "all",
    prizeRange: "all",
    deadline: "all",
  });
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch competitions from Supabase
  useEffect(() => {
    const fetchCompetitions = async () => {
      setIsLoading(true);
      try {
        // Call the edge function to get competitions with filters
        const { data, error } = await supabase.functions.invoke(
          "supabase-functions-get-competitions",
          {
            body: { filters },
          },
        );

        if (error) throw error;

        // Transform the data to match our Competition interface
        const transformedData: Competition[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          imageUrl: item.image_url,
          category: item.category,
          deadline: item.deadline,
          prizeValue: item.prize_value,
          difficulty: item.difficulty,
          requirements: item.requirements,
          rules: item.rules,
        }));

        setCompetitions(transformedData);
        setFilteredCompetitions(transformedData);
      } catch (error) {
        console.error("Error fetching competitions:", error);
        toast({
          title: "Error",
          description: "Failed to load competitions. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompetitions();
  }, [toast]);

  // Apply filters
  useEffect(() => {
    // Apply filters
    let result = [...competitions];

    if (filters.category && filters.category !== "all") {
      result = result.filter((comp) => comp.category === filters.category);
    }

    if (filters.difficulty && filters.difficulty !== "all") {
      result = result.filter((comp) => comp.difficulty === filters.difficulty);
    }

    if (filters.prizeRange && filters.prizeRange !== "all") {
      // Simple prize range filtering logic
      const ranges = {
        low: (prize: string) => parseInt(prize.replace(/[^0-9]/g, "")) < 2000,
        medium: (prize: string) => {
          const value = parseInt(prize.replace(/[^0-9]/g, ""));
          return value >= 2000 && value < 5000;
        },
        high: (prize: string) => parseInt(prize.replace(/[^0-9]/g, "")) >= 5000,
      };

      result = result.filter((comp) =>
        ranges[filters.prizeRange as keyof typeof ranges](comp.prizeValue),
      );
    }

    if (filters.deadline && filters.deadline !== "all") {
      // Simple deadline filtering logic
      const now = new Date();
      const oneWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      const oneMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

      const deadlineFilters = {
        week: (deadline: string) => {
          if (deadline === "Ongoing") return false;
          const date = new Date(deadline);
          return date <= oneWeek;
        },
        month: (deadline: string) => {
          if (deadline === "Ongoing") return false;
          const date = new Date(deadline);
          return date <= oneMonth && date > oneWeek;
        },
        later: (deadline: string) => {
          if (deadline === "Ongoing") return true;
          const date = new Date(deadline);
          return date > oneMonth;
        },
      };

      result = result.filter((comp) =>
        deadlineFilters[filters.deadline as keyof typeof deadlineFilters](
          comp.deadline,
        ),
      );
    }

    setFilteredCompetitions(result);
  }, [competitions, filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleEnterCompetition = async (id: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to enter this competition.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-enter-competition",
        {
          body: { competitionId: id },
        },
      );

      if (error) throw error;

      toast({
        title: "Competition Entry",
        description: `You've successfully entered competition #${id}. Good luck!`,
      });
    } catch (error) {
      console.error("Error entering competition:", error);
      toast({
        title: "Error",
        description: "Failed to enter competition. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleSaveCompetition = async (id: string) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to save this competition.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-save-competition",
        {
          body: { competitionId: id },
        },
      );

      if (error) throw error;

      toast({
        title: "Competition Saved",
        description: `Competition #${id} has been saved to your bookmarks.`,
      });
    } catch (error) {
      console.error("Error saving competition:", error);
      toast({
        title: "Error",
        description: "Failed to save competition. Please try again later.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded-md w-1/3 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-xl overflow-hidden"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-10 bg-gray-200 rounded-full w-full mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Competition Directory
        </h1>
        <p className="text-gray-600">
          Browse and enter exciting competitions with amazing prizes
        </p>
      </div>

      <CompetitionFilters onFilterChange={handleFilterChange} />

      {filteredCompetitions.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-700">
            No competitions match your filters
          </h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your filter criteria
          </p>
          <Button
            onClick={() =>
              setFilters({
                category: "all",
                difficulty: "all",
                prizeRange: "all",
                deadline: "all",
              })
            }
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
          >
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCompetitions.map((competition) => (
            <CompetitionCard
              key={competition.id}
              competition={competition}
              onEnter={handleEnterCompetition}
              onSave={handleSaveCompetition}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CompetitionGrid;
