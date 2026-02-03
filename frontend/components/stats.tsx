"use client";

import { useI18n } from "@/lib/i18n";

export function Stats() {
  const { t } = useI18n();

  const stats = [
    { value: "$2.5M+", labelKey: "stats.totalFunded" },
    { value: "450+", labelKey: "stats.projectsLaunched" },
    { value: "15K+", labelKey: "stats.activeBackers" },
    { value: "92%", labelKey: "stats.successRate" },
  ];

  return (
    <section className="py-16 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.labelKey} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {t(stat.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
