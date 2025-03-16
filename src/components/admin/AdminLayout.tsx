import { useState } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Trophy, Archive, PlusCircle, Settings, LogOut } from "lucide-react";
import { useAuth } from "../../../supabase/auth";

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  isActive?: boolean;
}

const AdminLayout = () => {
  const { signOut } = useAuth();
  const [activeItem, setActiveItem] = useState("Active Competitions");

  const navItems: NavItem[] = [
    {
      icon: <Trophy size={20} />,
      label: "Active Competitions",
      isActive: true,
    },
    { icon: <Archive size={20} />, label: "Archived Competitions" },
    { icon: <PlusCircle size={20} />, label: "Add Competition" },
  ];

  const bottomItems: NavItem[] = [
    { icon: <Settings size={20} />, label: "Settings" },
    { icon: <LogOut size={20} />, label: "Logout" },
  ];

  const handleNavItemClick = (label: string) => {
    setActiveItem(label);
    if (label === "Logout") {
      signOut();
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex">
      {/* Sidebar */}
      <div className="w-[280px] h-screen bg-white/80 backdrop-blur-md border-r border-gray-200 flex flex-col fixed">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-900">
            Admin Portal
          </h2>
          <p className="text-sm text-gray-500">
            Manage competitions and settings
          </p>
        </div>

        <ScrollArea className="flex-1 px-4">
          <div className="space-y-1.5">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant={"ghost"}
                className={`w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium ${item.label === activeItem ? "bg-blue-50 text-blue-600 hover:bg-blue-100" : "text-gray-700 hover:bg-gray-100"}`}
                onClick={() => handleNavItemClick(item.label)}
              >
                <span
                  className={`${item.label === activeItem ? "text-blue-600" : "text-gray-500"}`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Button>
            ))}
          </div>

          <Separator className="my-4 bg-gray-100" />

          <div className="space-y-3">
            <h3 className="text-xs font-medium px-4 py-1 text-gray-500 uppercase tracking-wider">
              Filters
            </h3>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-9 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Published
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-9 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              Draft
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-9 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              External Links
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-9 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <span className="h-2 w-2 rounded-full bg-purple-500"></span>
              Custom Games
            </Button>
          </div>
        </ScrollArea>

        <div className="p-4 mt-auto border-t border-gray-200">
          {bottomItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="w-full justify-start gap-3 h-10 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-100 mb-1.5"
              onClick={() => handleNavItemClick(item.label)}
            >
              <span className="text-gray-500">{item.icon}</span>
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-[280px]">
        <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">{activeItem}</h1>
            <div className="flex items-center gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Competition
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
