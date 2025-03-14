import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Award,
  BookmarkPlus,
} from "lucide-react";
import { motion } from "framer-motion";

export interface Competition {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  deadline: string;
  prizeValue: string;
  difficulty: "easy" | "medium" | "hard";
  requirements: string;
  rules: string;
}

interface CompetitionCardProps {
  competition: Competition;
  onEnter?: (id: string) => void;
  onSave?: (id: string) => void;
}

const CompetitionCard = ({
  competition,
  onEnter = () => {},
  onSave = () => {},
}: CompetitionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const difficultyColor = {
    easy: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl border border-gray-100">
        <div className="relative overflow-hidden aspect-video">
          <img
            src={competition.imageUrl}
            alt={competition.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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
            <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
              {competition.title}
            </h3>
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              {competition.category}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="pb-2 flex-grow">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">{competition.deadline}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Award className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">
                {competition.prizeValue}
              </span>
            </div>
          </div>

          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="border-t border-gray-100 pt-2"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
              <span>TLDR: Requirements & Rules</span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
              <div>
                <h4 className="text-sm font-medium text-gray-900">
                  Requirements:
                </h4>
                <p className="text-sm text-gray-600">
                  {competition.requirements}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">Rules:</h4>
                <p className="text-sm text-gray-600">{competition.rules}</p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>

        <CardFooter className="flex justify-between gap-2 pt-2 border-t border-gray-100">
          <Button
            onClick={() => onEnter(competition.id)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
          >
            Enter Now
          </Button>
          <Button
            onClick={() => onSave(competition.id)}
            variant="outline"
            className="rounded-full border-gray-300 hover:bg-gray-50"
          >
            <BookmarkPlus className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CompetitionCard;
