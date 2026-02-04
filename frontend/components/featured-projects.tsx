"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function FeaturedProjects() {
  const { t } = useI18n();

  const projects = [
    {
      id: 1,
      titleKey: "projects.eco.title",
      descriptionKey: "projects.eco.description",
      categoryKey: "projects.environment",
      raised: 125000,
      goal: 200000,
      backers: 342,
      daysLeft: 18,
    },
    {
      id: 2,
      titleKey: "projects.med.title",
      descriptionKey: "projects.med.description",
      categoryKey: "projects.healthcare",
      raised: 89000,
      goal: 150000,
      backers: 215,
      daysLeft: 24,
    },
    {
      id: 3,
      titleKey: "projects.art.title",
      descriptionKey: "projects.art.description",
      categoryKey: "projects.artCulture",
      raised: 45000,
      goal: 75000,
      backers: 128,
      daysLeft: 12,
    },
    {
      id: 4,
      titleKey: "projects.supply.title",
      descriptionKey: "projects.supply.description",
      categoryKey: "projects.supplyChain",
      raised: 67000,
      goal: 100000,
      backers: 189,
      daysLeft: 30,
    },
  ];

  return (
    <section id="projects" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            {t("projects.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("projects.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-card border-border hover:border-accent/50 transition-colors group">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                    {t(project.categoryKey)}
                  </Badge>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </div>
                <h3 className="text-xl font-semibold text-foreground mt-3">
                  {t(project.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(project.descriptionKey)}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("projects.raised")}</span>
                    <span className="text-foreground font-medium">
                      ${project.raised.toLocaleString()} / ${project.goal.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={(project.raised / project.goal) * 100} 
                    className="h-2 bg-secondary"
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <div className="flex items-center justify-between w-full text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{project.backers} {t("projects.backers")}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{project.daysLeft} {t("projects.daysLeft")}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/projects">
            <Button variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary bg-transparent">
              {t("projects.viewAll")}
              <ArrowUpRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
