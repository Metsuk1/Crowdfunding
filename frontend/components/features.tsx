"use client";

import { Shield, Eye, Lock, Zap, Globe, BarChart3 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function Features() {
  const { t } = useI18n();

  const features = [
    {
      icon: Shield,
      titleKey: "features.smartContractSecurity",
      descriptionKey: "features.smartContractSecurityDesc",
    },
    {
      icon: Eye,
      titleKey: "features.fullTransparency",
      descriptionKey: "features.fullTransparencyDesc",
    },
    {
      icon: Lock,
      titleKey: "features.milestoneRelease",
      descriptionKey: "features.milestoneReleaseDesc",
    },
    {
      icon: Zap,
      titleKey: "features.instantTransactions",
      descriptionKey: "features.instantTransactionsDesc",
    },
    {
      icon: Globe,
      titleKey: "features.globalAccess",
      descriptionKey: "features.globalAccessDesc",
    },
    {
      icon: BarChart3,
      titleKey: "features.realTimeAnalytics",
      descriptionKey: "features.realTimeAnalyticsDesc",
    },
  ];

  return (
    <section id="features" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              {t("features.title")}{" "}
              <span className="text-accent">{t("features.titleAccent")}</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {t("features.description")}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="p-4 bg-card rounded-xl border border-border">
                <span className="text-3xl font-bold text-accent">0.5%</span>
                <p className="text-sm text-muted-foreground mt-1">{t("features.platformFee")}</p>
              </div>
              <div className="p-4 bg-card rounded-xl border border-border">
                <span className="text-3xl font-bold text-accent">{"<"}30s</span>
                <p className="text-sm text-muted-foreground mt-1">{t("features.transactionTime")}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.titleKey}
                className="p-6 bg-card rounded-xl border border-border hover:border-accent/50 transition-colors"
              >
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(feature.descriptionKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
