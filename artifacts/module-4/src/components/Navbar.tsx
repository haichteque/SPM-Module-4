import { Link, useLocation } from "wouter";
import { useRole } from "./RoleContext";
import { freelancers } from "../data/freelancers";
import { Briefcase, TrendingUp, Users, FolderKanban, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [location] = useLocation();
  const { role, setRole, activeFreelancerId, setActiveFreelancerId } = useRole();

  const activeFreelancer = freelancers.find(f => f.id === activeFreelancerId);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary tracking-tight">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
              <Briefcase className="w-5 h-5" />
            </div>
            SkillMatch
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            {role === "Freelancer" ? (
              <>
                <Link href="/recommended-jobs" className={`hover:text-foreground transition-colors ${location === "/recommended-jobs" || location === "/" ? "text-foreground" : ""}`}>
                  Recommended Jobs
                </Link>
                <Link href="/trending-skills" className={`hover:text-foreground transition-colors ${location === "/trending-skills" ? "text-foreground" : ""}`}>
                  Trending Skills
                </Link>
              </>
            ) : (
              <>
                <Link href="/top-matches" className={`hover:text-foreground transition-colors ${location === "/top-matches" || location === "/" ? "text-foreground" : ""}`}>
                  Top Matches
                </Link>
                <Link href="/my-projects" className={`hover:text-foreground transition-colors ${location === "/my-projects" ? "text-foreground" : ""}`}>
                  My Projects
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-secondary p-1 rounded-lg flex items-center shadow-sm">
            <button
              onClick={() => setRole("Freelancer")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${role === "Freelancer" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              Freelancer View
            </button>
            <button
              onClick={() => setRole("Client")}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${role === "Client" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              Client View
            </button>
          </div>

          {role === "Freelancer" && activeFreelancer && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border border-border">
                    <AvatarFallback style={{ backgroundColor: activeFreelancer.avatarColor, color: "white" }}>
                      {activeFreelancer.initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{activeFreelancer.name}</p>
                    <p className="text-xs text-muted-foreground leading-none">{activeFreelancer.title}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs text-muted-foreground">Switch Demo User</DropdownMenuLabel>
                {freelancers.map(f => (
                  <DropdownMenuItem
                    key={f.id}
                    onClick={() => setActiveFreelancerId(f.id)}
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: f.avatarColor }} />
                    {f.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {role === "Client" && (
            <Avatar className="h-10 w-10 border border-border bg-primary text-primary-foreground">
              <AvatarFallback>CL</AvatarFallback>
            </Avatar>
          )}
        </div>
      </div>
    </nav>
  );
}