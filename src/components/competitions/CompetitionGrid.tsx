import { useState, useEffect } from "react";
import CompetitionCard, { Competition } from "./CompetitionCard";
import CompetitionFilters from "./CompetitionFilters";
import { useToast } from "@/components/ui/use-toast";

interface CompetitionGridProps {
  initialCompetitions?: Competition[];
  isLoading?: boolean;
}

const mockCompetitions: Competition[] = [
  {
    id: "1",
    title: "Summer Photography Contest",
    imageUrl:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
    category: "Photography",
    deadline: "Jul 15, 2024",
    prizeValue: "$2,500",
    difficulty: "easy",
    requirements:
      "Submit up to 3 original summer-themed photographs taken within the last 6 months.",
    rules:
      "All entries must be original work. No watermarks or signatures on images.",
  },
  {
    id: "2",
    title: "Mobile App Innovation Challenge",
    imageUrl:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    category: "Technology",
    deadline: "Aug 30, 2024",
    prizeValue: "$10,000",
    difficulty: "hard",
    requirements:
      "Develop a working prototype of a mobile app that addresses a social or environmental issue.",
    rules:
      "Apps must be original and not previously published on any app store.",
  },
  {
    id: "3",
    title: "Sustainable Fashion Design",
    imageUrl:
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80",
    category: "Fashion",
    deadline: "Sep 10, 2024",
    prizeValue: "$5,000",
    difficulty: "medium",
    requirements:
      "Create a fashion design using sustainable or recycled materials.",
    rules:
      "Designs must be original and include a written explanation of sustainability features.",
  },
  {
    id: "4",
    title: "Short Story Competition",
    imageUrl:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80",
    category: "Writing",
    deadline: "Jul 20, 2024",
    prizeValue: "$1,500",
    difficulty: "medium",
    requirements:
      "Write a short story (max 3,000 words) on the theme of 'New Beginnings'.",
    rules: "Stories must be original and not previously published elsewhere.",
  },
  {
    id: "5",
    title: "Culinary Innovation Award",
    imageUrl:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80",
    category: "Food",
    deadline: "Aug 5, 2024",
    prizeValue: "$3,000",
    difficulty: "easy",
    requirements:
      "Create an original recipe using a specific seasonal ingredient (to be announced).",
    rules:
      "Recipe must be original and include high-quality photos of the finished dish.",
  },
  {
    id: "6",
    title: "Game Development Hackathon",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    category: "Technology",
    deadline: "Oct 15, 2024",
    prizeValue: "$7,500",
    difficulty: "hard",
    requirements:
      "Develop a playable game prototype in 48 hours based on a provided theme.",
    rules: "All code and assets must be created during the hackathon period.",
  },
  {
    id: "7",
    title: "Urban Mural Design Contest",
    imageUrl:
      "https://images.unsplash.com/photo-1551913902-c92207136625?w=800&q=80",
    category: "Art",
    deadline: "Sep 30, 2024",
    prizeValue: "$4,000",
    difficulty: "medium",
    requirements:
      "Design a mural concept for a specific urban location (details provided upon registration).",
    rules:
      "Design must be original and consider the cultural context of the location.",
  },
  {
    id: "8",
    title: "Fitness Challenge",
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    category: "Health",
    deadline: "Ongoing",
    prizeValue: "$1,000 Monthly",
    difficulty: "easy",
    requirements:
      "Complete a series of fitness challenges and document your progress.",
    rules:
      "Participants must submit weekly updates with photo or video evidence.",
  },
];

const CompetitionGrid = ({
  initialCompetitions = mockCompetitions,
  isLoading = false,
}: CompetitionGridProps) => {
  const [competitions, setCompetitions] =
    useState<Competition[]>(initialCompetitions);
  const [filteredCompetitions, setFilteredCompetitions] =
    useState<Competition[]>(initialCompetitions);
  const [filters, setFilters] = useState({
    category: "all",
    difficulty: "all",
    prizeRange: "all",
    deadline: "all",
  });
  const { toast } = useToast();

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

  const handleEnterCompetition = (id: string) => {
    toast({
      title: "Competition Entry",
      description: `You're entering competition #${id}. Redirecting to entry form...`,
    });
  };

  const handleSaveCompetition = (id: string) => {
    toast({
      title: "Competition Saved",
      description: `Competition #${id} has been saved to your bookmarks.`,
    });
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
