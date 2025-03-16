import { useState } from "react";
import CompetitionList from "./CompetitionList";
import CompetitionForm from "./CompetitionForm";
import { Competition } from "../competitions/CompetitionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [editingCompetition, setEditingCompetition] =
    useState<Competition | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleEdit = (competition: Competition) => {
    setEditingCompetition(competition);
    setIsFormVisible(true);
  };

  const handleAddNew = () => {
    setEditingCompetition(null);
    setIsFormVisible(true);
  };

  const handleFormSuccess = () => {
    setIsFormVisible(false);
    setEditingCompetition(null);
  };

  return (
    <div className="space-y-6">
      {isFormVisible ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {editingCompetition?.id
                ? "Edit Competition"
                : "Add New Competition"}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFormVisible(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <CompetitionForm
            competitionId={editingCompetition?.id}
            onSuccess={handleFormSuccess}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <Tabs
              defaultValue="active"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-[400px] grid-cols-2">
                <TabsTrigger value="active">Active Competitions</TabsTrigger>
                <TabsTrigger value="archived">
                  Archived Competitions
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <Button
              onClick={handleAddNew}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>

          <div className="mt-4">
            {activeTab === "active" && (
              <CompetitionList isArchived={false} onEdit={handleEdit} />
            )}
            {activeTab === "archived" && (
              <CompetitionList isArchived={true} onEdit={handleEdit} />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
