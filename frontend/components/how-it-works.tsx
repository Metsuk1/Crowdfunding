"use client";

import { Wallet, FileCheck, Coins, Rocket } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function HowItWorks() {
  const { t } = useI18n();

  const steps = [
    {
      icon: Wallet,
      titleKey: "howItWorks.step1.title",
      descriptionKey: "howItWorks.step1.description",
      step: "01",
    },
    {
      icon: FileCheck,
      titleKey: "howItWorks.step2.title",
      descriptionKey: "howItWorks.step2.description",
      step: "02",
    },
    {
      icon: Coins,
      titleKey: "howItWorks.step3.title",
      descriptionKey: "howItWorks.step3.description",
      step: "03",
    },
    {
      icon: Rocket,
      titleKey: "howItWorks.step4.title",
      descriptionKey: "howItWorks.step4.description",
      step: "04",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            {t("howItWorks.title")}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("howItWorks.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-border -translate-x-1/2" />
              )}
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-24 h-24 bg-secondary rounded-2xl flex items-center justify-center mb-6">
                    <step.icon className="w-10 h-10 text-accent" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t(step.titleKey)}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(step.descriptionKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
