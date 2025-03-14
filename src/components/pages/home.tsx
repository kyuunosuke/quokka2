import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, Settings, User, Trophy } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../supabase/auth";

export default function LandingPage() {
  const { user, signOut } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Apple-style navigation */}
      <header className="fixed top-0 z-50 w-full bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-[#f5f5f7]/30">
        <div className="max-w-[1400px] mx-auto flex h-12 items-center justify-between px-4">
          <div className="flex items-center">
            <Link to="/" className="font-medium text-xl">
              Tempo Competitions
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-7 text-sm font-light">
            <Link to="/" className="text-blue-600 font-medium">
              Home
            </Link>
            <Link to="/competitions" className="hover:text-gray-500">
              Competitions
            </Link>
            <Link to="/dashboard" className="hover:text-gray-500">
              Dashboard
            </Link>
            <Link to="/" className="hover:text-gray-500">
              About
            </Link>
            <Link to="/" className="hover:text-gray-500">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-sm font-light hover:text-gray-500"
                  >
                    Dashboard
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="h-8 w-8 hover:cursor-pointer">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                        alt={user.email || ""}
                      />
                      <AvatarFallback>
                        {user.email?.[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="rounded-xl border-none shadow-lg"
                  >
                    <DropdownMenuLabel className="text-xs text-gray-500">
                      {user.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={() => signOut()}
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-sm font-light hover:text-gray-500"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="rounded-full bg-black text-white hover:bg-gray-800 text-sm px-4">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="pt-12">
        {/* Hero section */}
        <section className="py-20 text-center">
          <h2 className="text-5xl font-semibold tracking-tight mb-1">
            Discover Amazing Competitions
          </h2>
          <h3 className="text-2xl font-medium text-gray-500 mb-4">
            Enter contests, win prizes, and showcase your talents
          </h3>
          <div className="flex justify-center space-x-6 text-xl text-blue-600">
            <Link
              to="/competitions"
              className="flex items-center hover:underline"
            >
              Browse Competitions <ChevronRight className="h-4 w-4" />
            </Link>
            <Link to="/signup" className="flex items-center hover:underline">
              Get started <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 max-w-6xl mx-auto">
            <img
              src="https://images.unsplash.com/photo-1546519638-68e109acd27d?w=1200&q=80"
              alt="Competition showcase"
              className="rounded-2xl shadow-lg w-full object-cover max-h-[500px]"
            />
          </div>
        </section>

        {/* Features section */}
        <section className="py-20 bg-[#f5f5f7] text-center">
          <h2 className="text-5xl font-semibold tracking-tight mb-1">
            Featured Competitions
          </h2>
          <h3 className="text-2xl font-medium text-gray-500 mb-4">
            Explore our most popular contests with amazing prizes
          </h3>
          <div className="flex justify-center space-x-6 text-xl text-blue-600">
            <Link
              to="/competitions"
              className="flex items-center hover:underline"
            >
              View all competitions <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm text-left overflow-hidden group">
              <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80"
                  alt="Photography contest"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  Photography
                </div>
              </div>
              <h4 className="text-xl font-medium mb-2">
                Summer Photography Contest
              </h4>
              <p className="text-gray-500 mb-4">
                Submit your best summer-themed photographs and win amazing
                prizes.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 flex items-center">
                  <Trophy className="h-4 w-4 mr-1 text-yellow-500" /> $2,500
                </span>
                <Link to="/competitions">
                  <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                    Enter Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm text-left overflow-hidden group">
              <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80"
                  alt="Mobile app challenge"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                  Technology
                </div>
              </div>
              <h4 className="text-xl font-medium mb-2">
                Mobile App Innovation Challenge
              </h4>
              <p className="text-gray-500 mb-4">
                Develop a mobile app that addresses social or environmental
                issues.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 flex items-center">
                  <Trophy className="h-4 w-4 mr-1 text-yellow-500" /> $10,000
                </span>
                <Link to="/competitions">
                  <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                    Enter Now
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm text-left overflow-hidden group">
              <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80"
                  alt="Fashion design"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Fashion
                </div>
              </div>
              <h4 className="text-xl font-medium mb-2">
                Sustainable Fashion Design
              </h4>
              <p className="text-gray-500 mb-4">
                Create fashion designs using sustainable or recycled materials.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 flex items-center">
                  <Trophy className="h-4 w-4 mr-1 text-yellow-500" /> $5,000
                </span>
                <Link to="/competitions">
                  <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                    Enter Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Grid section for other features */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3">
          <div className="bg-[#f5f5f7] rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-semibold tracking-tight mb-1">
              How It Works
            </h2>
            <h3 className="text-xl font-medium text-gray-500 mb-4">
              Simple steps to participate and win
            </h3>
            <div className="flex justify-center space-x-6 text-lg text-blue-600">
              <Link to="/" className="flex items-center hover:underline">
                Learn more <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 space-y-6 max-w-sm mx-auto text-left">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Browse Competitions
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Explore our wide range of competitions across different
                    categories.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Submit Your Entry
                  </h4>
                  <p className="text-gray-500 text-sm">
                    Follow the guidelines and submit your work before the
                    deadline.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Win Prizes</h4>
                  <p className="text-gray-500 text-sm">
                    Winners are selected and awarded with exciting prizes and
                    recognition.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#f5f5f7] rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-semibold tracking-tight mb-1">
              Why Participate?
            </h2>
            <h3 className="text-xl font-medium text-gray-500 mb-4">
              Benefits of joining our competitions
            </h3>
            <div className="flex justify-center space-x-6 text-lg text-blue-600">
              <Link to="/" className="flex items-center hover:underline">
                View testimonials <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm mx-auto">
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                </div>
                <h5 className="font-medium text-gray-900 mb-1">Win Prizes</h5>
                <p className="text-gray-500 text-xs">
                  Cash prizes and valuable rewards
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h5 className="font-medium text-gray-900 mb-1">
                  Build Portfolio
                </h5>
                <p className="text-gray-500 text-xs">
                  Showcase your work and skills
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h5 className="font-medium text-gray-900 mb-1">Network</h5>
                <p className="text-gray-500 text-xs">
                  Connect with industry professionals
                </p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h5 className="font-medium text-gray-900 mb-1">
                  Gain Experience
                </h5>
                <p className="text-gray-500 text-xs">
                  Improve your skills through challenges
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Showcase Your Talent?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of participants and enter our competitions today.
            </p>
            <Link to="/competitions">
              <Button className="rounded-full bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto font-medium">
                Browse Competitions
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#f5f5f7] py-12 text-xs text-gray-500">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="border-b border-gray-300 pb-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-4">
                Tempo Competitions
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/competitions" className="hover:underline">
                    Competitions
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:underline">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-4">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Rules & Guidelines
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-4">
                Connect
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Support
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Social Media
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Newsletter
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-900 mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link to="/" className="hover:underline">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="py-4">
            <p>Copyright © 2024 Tempo Competitions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
