import { useRole } from "../components/RoleContext";
import { projects } from "../data/projects";
import { freelancers } from "../data/freelancers";
import { recommendProjectsForFreelancer } from "../lib/matching";
import { ProjectCard } from "../components/ProjectCard";
import { EmptyState } from "../components/EmptyState";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function RecommendedJobs() {
  const { activeFreelancerId } = useRole();
  const activeFreelancer = freelancers.find(f => f.id === activeFreelancerId);
  const [hideOverBudget, setHideOverBudget] = useState(false);

  if (!activeFreelancer) return null;

  const rankedProjects = recommendProjectsForFreelancer(activeFreelancer, projects);
  const filteredProjects = hideOverBudget 
    ? rankedProjects.filter(p => p.budgetAlignment !== "over")
    : rankedProjects;

  const strongMatches = rankedProjects.filter(p => p.matchScore >= 70).length;

  return (
    <div className="min-h-[100dvh] bg-background pb-20">
      {/* Hero Section */}
      <div className="bg-primary/5 border-b border-primary/10 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
                Your Job Feed <Sparkles className="w-6 h-6 text-primary" />
              </h1>
              <p className="text-muted-foreground max-w-2xl text-lg">
                We've analyzed {projects.length} available projects against your {activeFreelancer.skills.length} verified skills. 
              </p>
            </div>
            
            <div className="bg-background border rounded-lg p-4 shadow-sm min-w-[200px]">
              <div className="text-sm text-muted-foreground mb-1">Strong Matches</div>
              <div className="text-3xl font-bold text-primary">{strongMatches}</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-6xl mt-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Recommended for {activeFreelancer.name}</h2>
          <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1.5 rounded-md">
            <Checkbox 
              id="budget-filter" 
              checked={hideOverBudget} 
              onCheckedChange={(c) => setHideOverBudget(c as boolean)} 
            />
            <Label htmlFor="budget-filter" className="text-sm font-medium cursor-pointer">
              Hide jobs below my rate
            </Label>
          </div>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                freelancerRate={activeFreelancer.hourlyRate} 
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No projects found"
            description="There are no projects that match your current filters. Try adjusting your filters or learning new skills."
            action={
              <Button asChild>
                <Link href="/trending-skills">Explore Trending Skills</Link>
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}