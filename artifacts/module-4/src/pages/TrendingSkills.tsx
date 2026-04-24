import { useRole } from "../components/RoleContext";
import { projects } from "../data/projects";
import { freelancers } from "../data/freelancers";
import { getTrendingSkills } from "../lib/matching";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { LearnSkillDialog } from "../components/LearnSkillDialog";

export default function TrendingSkills() {
  const { activeFreelancerId } = useRole();
  const activeFreelancer = freelancers.find(f => f.id === activeFreelancerId);
  const [learningSkill, setLearningSkill] = useState<string | null>(null);

  if (!activeFreelancer) return null;

  const trendingSkills = getTrendingSkills(projects, activeFreelancer.skills);

  return (
    <div className="min-h-[100dvh] bg-background pb-20">
      <div className="bg-primary/5 border-b border-primary/10 py-12">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Market Demand & Trends
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Based on active project requirements, these are the most sought-after skills right now. 
              Learn skills you're missing to unlock more job opportunities.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-12">
        <div className="grid gap-4">
          {trendingSkills.map((ts, index) => (
            <motion.div
              key={ts.skill}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row items-center p-6 gap-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg bg-muted text-muted-foreground shrink-0">
                    #{index + 1}
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl font-bold text-foreground flex items-center justify-center sm:justify-start gap-2 mb-1">
                      {ts.skill}
                      {ts.missingForFreelancer ? (
                        <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-500/20 dark:text-amber-400">Opportunity</Badge>
                      ) : (
                        <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400">You have this</Badge>
                      )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Required by {ts.count} active {ts.count === 1 ? 'project' : 'projects'}
                    </p>
                  </div>

                  <div className="shrink-0 w-full sm:w-auto">
                    {ts.missingForFreelancer ? (
                      <Button onClick={() => setLearningSkill(ts.skill)} className="w-full sm:w-auto">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Learn Skill
                      </Button>
                    ) : (
                      <Button variant="secondary" disabled className="w-full sm:w-auto">
                        Already Mastered
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <LearnSkillDialog 
        skill={learningSkill} 
        isOpen={learningSkill !== null} 
        onClose={() => setLearningSkill(null)} 
      />
    </div>
  );
}