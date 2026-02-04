"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Clock,
  Users,
  ArrowUpRight,
  Wallet,
  TrendingUp,
  Shield,
  Sparkles,
  ChevronLeft,
  Layers,
  Leaf,
  Heart,
  Palette,
  GraduationCap,
  Coins,
  Gamepad2,
  Globe,
  Server,
} from "lucide-react";

const allProjects = [
  {
    id: 1,
    titleKey: "projects.eco.title",
    descriptionKey: "projects.eco.description",
    category: "environment",
    categoryKey: "projects.environment",
    raised: 125000,
    goal: 200000,
    backers: 342,
    daysLeft: 18,
    minInvestment: 0.1,
    creator: "GreenTech DAO",
    verified: true,
    trending: true,
    isNew: false,
    blockchain: "Ethereum",
  },
  {
    id: 2,
    titleKey: "projects.med.title",
    descriptionKey: "projects.med.description",
    category: "healthcare",
    categoryKey: "projects.healthcare",
    raised: 89000,
    goal: 150000,
    backers: 215,
    daysLeft: 24,
    minInvestment: 0.05,
    creator: "MedTech Labs",
    verified: true,
    trending: false,
    isNew: false,
    blockchain: "Polygon",
  },
  {
    id: 3,
    titleKey: "projects.art.title",
    descriptionKey: "projects.art.description",
    category: "nft",
    categoryKey: "projects.artCulture",
    raised: 45000,
    goal: 75000,
    backers: 128,
    daysLeft: 12,
    minInvestment: 0.02,
    creator: "ArtBlock Collective",
    verified: false,
    trending: true,
    isNew: true,
    blockchain: "Ethereum",
  },
  {
    id: 4,
    titleKey: "projects.supply.title",
    descriptionKey: "projects.supply.description",
    category: "infrastructure",
    categoryKey: "projects.supplyChain",
    raised: 67000,
    goal: 100000,
    backers: 189,
    daysLeft: 30,
    minInvestment: 0.15,
    creator: "SupplyChain Labs",
    verified: true,
    trending: false,
    isNew: false,
    blockchain: "Solana",
  },
  {
    id: 5,
    title: {
      en: "DeFi Yield Optimizer",
      ru: "DeFi Оптимизатор доходности",
      kk: "DeFi Табыстылық оптимизаторы",
    },
    description: {
      en: "Automated yield farming protocol that maximizes returns across multiple DeFi platforms.",
      ru: "Автоматизированный протокол доходного фермерства, который максимизирует доходность на нескольких DeFi платформах.",
      kk: "Бірнеше DeFi платформаларында табысты барынша арттыратын автоматтандырылған табыстық фермерлік протоколы.",
    },
    category: "defi",
    categoryKey: "projectsPage.defi",
    raised: 234000,
    goal: 300000,
    backers: 567,
    daysLeft: 8,
    minInvestment: 0.5,
    creator: "YieldMax Protocol",
    verified: true,
    trending: true,
    isNew: false,
    blockchain: "Ethereum",
  },
  {
    id: 6,
    title: {
      en: "MetaGame Universe",
      ru: "MetaGame Вселенная",
      kk: "MetaGame Әлемі",
    },
    description: {
      en: "Play-to-earn gaming ecosystem with NFT characters and decentralized governance.",
      ru: "Игровая экосистема play-to-earn с NFT персонажами и децентрализованным управлением.",
      kk: "NFT кейіпкерлері және орталықсыздандырылған басқаруы бар play-to-earn ойын экожүйесі.",
    },
    category: "gaming",
    categoryKey: "projectsPage.gaming",
    raised: 178000,
    goal: 250000,
    backers: 892,
    daysLeft: 15,
    minInvestment: 0.08,
    creator: "MetaGames Studio",
    verified: true,
    trending: true,
    isNew: true,
    blockchain: "Polygon",
  },
  {
    id: 7,
    title: {
      en: "DecentralSocial",
      ru: "DecentralSocial",
      kk: "DecentralSocial",
    },
    description: {
      en: "Decentralized social media platform where users own their data and earn from content.",
      ru: "Децентрализованная социальная сеть, где пользователи владеют своими данными и зарабатывают на контенте.",
      kk: "Пайдаланушылар өз деректерін иеленіп, мазмұннан табыс табатын орталықсыздандырылған әлеуметтік желі.",
    },
    category: "social",
    categoryKey: "projectsPage.social",
    raised: 156000,
    goal: 200000,
    backers: 423,
    daysLeft: 21,
    minInvestment: 0.1,
    creator: "Web3 Social DAO",
    verified: true,
    trending: false,
    isNew: false,
    blockchain: "Solana",
  },
  {
    id: 8,
    title: {
      en: "EduChain Academy",
      ru: "EduChain Академия",
      kk: "EduChain Академиясы",
    },
    description: {
      en: "Blockchain-verified educational credentials and learn-to-earn platform.",
      ru: "Образовательные сертификаты, верифицированные блокчейном, и платформа learn-to-earn.",
      kk: "Блокчейнмен тексерілген білім сертификаттары және learn-to-earn платформасы.",
    },
    category: "education",
    categoryKey: "register.categoryEducation",
    raised: 45000,
    goal: 80000,
    backers: 156,
    daysLeft: 35,
    minInvestment: 0.03,
    creator: "EduDAO",
    verified: false,
    trending: false,
    isNew: true,
    blockchain: "Ethereum",
  },
];

const categories = [
  { value: "all", labelKey: "projectsPage.allCategories", icon: Layers },
  { value: "environment", labelKey: "projects.environment", icon: Leaf },
  { value: "healthcare", labelKey: "projects.healthcare", icon: Heart },
  { value: "nft", labelKey: "projectsPage.nft", icon: Palette },
  { value: "defi", labelKey: "projectsPage.defi", icon: Coins },
  { value: "gaming", labelKey: "projectsPage.gaming", icon: Gamepad2 },
  { value: "social", labelKey: "projectsPage.social", icon: Globe },
  { value: "education", labelKey: "register.categoryEducation", icon: GraduationCap },
  { value: "infrastructure", labelKey: "projectsPage.infrastructure", icon: Server },
];

function ProjectsContent() {
  const { t, language } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("mostFunded");

  const getProjectTitle = (project: typeof allProjects[0]) => {
    if (project.titleKey) {
      return t(project.titleKey);
    }
    if (project.title && typeof project.title === "object") {
      return project.title[language];
    }
    return "";
  };

  const getProjectDescription = (project: typeof allProjects[0]) => {
    if (project.descriptionKey) {
      return t(project.descriptionKey);
    }
    if (project.description && typeof project.description === "object") {
      return project.description[language];
    }
    return "";
  };

  const filteredProjects = useMemo(() => {
    let result = [...allProjects];

    // Filter by search
    if (searchQuery) {
      result = result.filter((project) => {
        const title = getProjectTitle(project).toLowerCase();
        const description = getProjectDescription(project).toLowerCase();
        return title.includes(searchQuery.toLowerCase()) || description.includes(searchQuery.toLowerCase());
      });
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((project) => project.category === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case "mostFunded":
        result.sort((a, b) => b.raised - a.raised);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "endingSoon":
        result.sort((a, b) => a.daysLeft - b.daysLeft);
        break;
      case "mostBackers":
        result.sort((a, b) => b.backers - a.backers);
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy, language]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm">{t("nav.projects")}</span>
              </Link>
              <div className="h-4 w-px bg-border" />
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-accent-foreground" />
                </div>
                <span className="font-bold text-foreground">ChainFund</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  {t("nav.login")}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">
                  {t("nav.startProject")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-card/30 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              {t("projectsPage.title")}
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("projectsPage.subtitle")}
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("projectsPage.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
            <div className="flex gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px] bg-background border-border">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <div className="flex items-center gap-2">
                        <cat.icon className="w-4 h-4" />
                        {t(cat.labelKey)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mostFunded">{t("projectsPage.mostFunded")}</SelectItem>
                  <SelectItem value="newest">{t("projectsPage.newest")}</SelectItem>
                  <SelectItem value="endingSoon">{t("projectsPage.endingSoon")}</SelectItem>
                  <SelectItem value="mostBackers">{t("projectsPage.mostBackers")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.value)}
                className={selectedCategory === cat.value ? "" : "bg-transparent"}
              >
                <cat.icon className="w-4 h-4 mr-2" />
                {t(cat.labelKey)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                const progress = (project.raised / project.goal) * 100;
                return (
                  <Card
                    key={project.id}
                    className="bg-card border-border hover:border-accent/50 transition-all duration-300 group overflow-hidden"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                            {t(project.categoryKey)}
                          </Badge>
                          {project.verified && (
                            <Badge variant="outline" className="border-accent text-accent gap-1">
                              <Shield className="w-3 h-3" />
                              {t("projectsPage.verified")}
                            </Badge>
                          )}
                          {project.trending && (
                            <Badge className="bg-accent/20 text-accent border-0 gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {t("projectsPage.trending")}
                            </Badge>
                          )}
                          {project.isNew && (
                            <Badge className="bg-accent text-accent-foreground gap-1">
                              <Sparkles className="w-3 h-3" />
                              {t("projectsPage.new")}
                            </Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mt-3 line-clamp-1">
                        {getProjectTitle(project)}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                        {getProjectDescription(project)}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <span>{t("projectsPage.creator")}: {project.creator}</span>
                        <span className="text-border">|</span>
                        <span>{project.blockchain}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-0">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-accent font-medium">
                            {Math.round(progress)}% {t("projectsPage.funded")}
                          </span>
                          <span className="text-foreground font-medium">
                            ${project.raised.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={progress} className="h-2 bg-secondary" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{t("projectsPage.goal")}: ${project.goal.toLocaleString()}</span>
                          <span>{t("projectsPage.minInvestment")}: {project.minInvestment} ETH</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex flex-col gap-3">
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
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" className="flex-1 bg-transparent">
                          {t("projectsPage.viewDetails")}
                        </Button>
                        <Button className="flex-1">
                          {t("projectsPage.fundProject")}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t("projectsPage.noProjects")}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t("projectsPage.tryAdjusting")}
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="bg-transparent"
              >
                {t("projectsPage.clearFilters")}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <I18nProvider>
      <ProjectsContent />
    </I18nProvider>
  );
}
