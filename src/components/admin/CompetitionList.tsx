import { useState, useEffect } from "react";
import { supabase } from "../../../supabase/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MoreVertical,
  Pencil,
  Archive,
  Trash2,
  ExternalLink,
  Search,
  RefreshCw,
} from "lucide-react";
import { Competition } from "../competitions/CompetitionCard";

interface CompetitionListProps {
  isArchived?: boolean;
  onEdit?: (competition: Competition) => void;
}

const CompetitionList = ({
  isArchived = false,
  onEdit,
}: CompetitionListProps) => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const fetchCompetitions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("competitions")
        .select("*")
        .eq("is_archived", isArchived)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform the data to match the Competition interface
      const transformedData = data.map((item) => ({
        id: item.id,
        title: item.title,
        imageUrl: item.image_url,
        category: item.category,
        deadline: item.deadline,
        prizeValue: item.prize_value,
        difficulty: item.difficulty as "easy" | "medium" | "hard",
        requirements: item.requirements,
        rules: item.rules,
      }));

      setCompetitions(transformedData);
    } catch (error: any) {
      toast({
        title: "Error fetching competitions",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompetitions();
  }, [isArchived]);

  const handleArchive = async (id: string, archive: boolean) => {
    try {
      const { error } = await supabase
        .from("competitions")
        .update({ is_archived: archive })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: archive ? "Competition archived" : "Competition restored",
        description: archive
          ? "The competition has been moved to archives."
          : "The competition has been restored from archives.",
      });

      fetchCompetitions();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this competition?")) return;

    try {
      const { error } = await supabase
        .from("competitions")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Competition deleted",
        description: "The competition has been permanently deleted.",
      });

      fetchCompetitions();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredCompetitions = competitions.filter((comp) =>
    comp.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const difficultyColor = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search competitions..."
              className="pl-8"
              disabled
            />
          </div>
          <Button disabled className="ml-2">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardContent>
              <CardFooter>
                <div className="h-9 bg-gray-200 rounded w-full"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search competitions..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          onClick={() => fetchCompetitions()}
          variant="outline"
          className="ml-2"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {filteredCompetitions.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <h3 className="text-xl font-medium text-gray-700">
            No competitions found
          </h3>
          <p className="text-gray-500 mt-2">
            {searchQuery
              ? "Try adjusting your search query"
              : isArchived
                ? "No archived competitions found"
                : "Start by adding a new competition"}
          </p>
          {!searchQuery && !isArchived && (
            <Button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => onEdit && onEdit({} as Competition)}
            >
              Add New Competition
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompetitions.map((competition) => (
            <Card key={competition.id} className="overflow-hidden">
              <div className="relative h-40 overflow-hidden">
                <img
                  src={competition.imageUrl}
                  alt={competition.title}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className={`absolute top-3 right-3 ${difficultyColor[competition.difficulty]}`}
                >
                  {competition.difficulty.charAt(0).toUpperCase() +
                    competition.difficulty.slice(1)}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {competition.title}
                    </CardTitle>
                    <CardDescription>{competition.category}</CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onEdit && onEdit(competition)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleArchive(competition.id, !isArchived)
                        }
                      >
                        <Archive className="h-4 w-4 mr-2" />
                        {isArchived ? "Restore" : "Archive"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(competition.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          window.open(
                            `/competitions?id=${competition.id}`,
                            "_blank",
                          )
                        }
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Live
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Deadline: {competition.deadline}</span>
                  <span>Prize: {competition.prizeValue}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {competition.requirements}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => onEdit && onEdit(competition)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit Competition
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompetitionList;
