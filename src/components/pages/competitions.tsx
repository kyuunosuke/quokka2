import { useState } from "react";
import CompetitionGrid from "../competitions/CompetitionGrid";
import { Button } from "@/components/ui/button";
import { RefreshCw, ShieldCheck } from "lucide-react";
import { useAuth } from "../../../supabase/auth";
import { useNavigate } from "react-router-dom";

export default function CompetitionsPage() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRefresh = () => {
    setLoading(true);
    // Simulate loading for 1.5 seconds
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleAdminClick = () => {
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <header className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-[#f5f5f7]/30">
        <div className="max-w-[1400px] mx-auto flex h-12 items-center justify-between px-4">
          <div className="flex items-center">
            <a href="/" className="font-medium text-xl">
              Tempo Competitions
            </a>
          </div>
          <nav className="hidden md:flex items-center space-x-7 text-sm font-light">
            <a href="/" className="hover:text-gray-500">
              Home
            </a>
            <a href="/competitions" className="text-blue-600 font-medium">
              Competitions
            </a>
            <a href="/dashboard" className="hover:text-gray-500">
              Dashboard
            </a>
            {user && (
              <Button
                onClick={handleAdminClick}
                variant="ghost"
                className="hover:text-gray-500 flex items-center gap-1 p-0 h-auto font-light"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Admin
              </Button>
            )}
            <a href="/" className="hover:text-gray-500">
              About
            </a>
            <a href="/" className="hover:text-gray-500">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className="pt-16 pb-12">
        <div className="container mx-auto px-4 pt-4 pb-2 flex justify-end">
          <Button
            onClick={handleRefresh}
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 h-9 shadow-sm transition-colors flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Loading..." : "Refresh Competitions"}
          </Button>
        </div>

        <CompetitionGrid isLoading={loading} />
      </main>

      <footer className="bg-white py-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2024 Tempo Competitions. All rights reserved.</p>
            <p className="mt-2">
              <a href="/" className="text-blue-600 hover:underline mx-2">
                Terms
              </a>
              <a href="/" className="text-blue-600 hover:underline mx-2">
                Privacy
              </a>
              <a href="/" className="text-blue-600 hover:underline mx-2">
                Support
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
