"use client";

import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { FeaturedProjects } from "@/components/featured-projects";
import { HowItWorks } from "@/components/how-it-works";
import { Features } from "@/components/features";
import { Stats } from "@/components/stats";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { I18nProvider } from "@/lib/i18n";

export default function Home() {
  return (
    <I18nProvider>
      <main className="min-h-screen bg-background">
        <Header />
        <Hero />
        <Stats />
        <FeaturedProjects />
        <HowItWorks />
        <Features />
        <CTA />
        <Footer />
      </main>
    </I18nProvider>
  );
}
