"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-sm text-muted-foreground mb-8">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            {t("hero.badge")}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground tracking-tight text-balance">
            {t("hero.title")}{" "}
            <span className="text-accent">{t("hero.blockchain")}</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            {t("hero.description")}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base">
              {t("hero.exploreProjects")}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-base border-border text-foreground hover:bg-secondary bg-transparent">
              {t("hero.launchCampaign")}
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-accent" />
              </div>
              <span className="text-2xl font-bold text-foreground">100%</span>
              <span className="text-sm text-muted-foreground">{t("hero.transparent")}</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <span className="text-2xl font-bold text-foreground">$2.5M+</span>
              <span className="text-sm text-muted-foreground">{t("hero.totalFunded")}</span>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 bg-card rounded-xl border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <span className="text-2xl font-bold text-foreground">15K+</span>
              <span className="text-sm text-muted-foreground">{t("hero.backers")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
