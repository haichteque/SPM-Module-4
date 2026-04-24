import { projects } from "../data/projects";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Clock, Users } from "lucide-react";

export default function MyProjects() {
  return (
    <div className="min-h-[100dvh] bg-background pb-20">
      <div className="bg-primary/5 border-b border-primary/10 py-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Projects</h1>
          <p className="text-muted-foreground">Manage your job postings and find talent.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map(project => (
            <Card key={project.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl"><Link href={`/project/${project.id}`} className="hover:text-primary">{project.title}</Link></CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {project.durationWeeks} weeks</span>
                  <span>Budget: ${project.maxHourlyBudget}/hr</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.requiredSkills.map(s => (
                    <span key={s} className="px-2 py-0.5 bg-muted text-muted-foreground rounded text-xs">{s}</span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0 border-t p-4 mt-auto bg-muted/20">
                <Button asChild className="w-full" variant="outline">
                  <Link href="/top-matches">
                    <Users className="w-4 h-4 mr-2" /> Find Talent for this Project
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}