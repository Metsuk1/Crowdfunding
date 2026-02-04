"use client";

import React from "react"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  Hexagon,
  Wallet,
  Plus,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Circle,
  ArrowRight,
  Edit,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";

// Mock data for existing campaign
const mockExistingCampaign = {
  id: "1",
  title: "EcoChain: Carbon Credit Marketplace",
  description: "A decentralized platform for trading verified carbon credits using blockchain technology.",
  category: "Environment",
  raised: 45.8,
  goal: 100,
  backers: 234,
  daysLeft: 18,
  status: "active",
  smartContractAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD05",
  milestones: [
    { id: 1, title: "Platform Development", target: 25, status: "completed" },
    { id: 2, title: "Beta Testing", target: 50, status: "in-progress" },
    { id: 3, title: "Public Launch", target: 75, status: "pending" },
    { id: 4, title: "Marketing Campaign", target: 100, status: "pending" },
  ],
  recentBackers: [
    { address: "0x1a2b...3c4d", amount: 2.5, time: "2 hours ago" },
    { address: "0x5e6f...7g8h", amount: 1.0, time: "5 hours ago" },
    { address: "0x9i0j...1k2l", amount: 0.5, time: "1 day ago" },
  ],
};

function CreateCampaignForm({ t, onCancel }: { t: (key: string) => string; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    goal: "",
    duration: "30",
  });
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCreating(false);
    // Refresh to show campaign monitoring
    router.refresh();
  };

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5 text-accent" />
          {t("creator.createNewProject")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">{t("register.projectName")}</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-input border-border"
              placeholder="Enter project name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t("register.projectDescription")}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-input border-border min-h-[100px]"
              placeholder="Describe your project"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">{t("register.projectCategory")}</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-input border-border">
                  <SelectValue placeholder={t("register.selectCategory")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">{t("register.categoryTech")}</SelectItem>
                  <SelectItem value="environment">{t("register.categoryEnvironment")}</SelectItem>
                  <SelectItem value="healthcare">{t("register.categoryHealthcare")}</SelectItem>
                  <SelectItem value="art">{t("register.categoryArt")}</SelectItem>
                  <SelectItem value="education">{t("register.categoryEducation")}</SelectItem>
                  <SelectItem value="finance">{t("register.categoryFinance")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">{t("register.fundingGoal")}</Label>
              <Input
                id="goal"
                type="number"
                step="0.1"
                min="0.1"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="bg-input border-border"
                placeholder="100"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">{t("register.duration")}</Label>
            <Select
              value={formData.duration}
              onValueChange={(value) => setFormData({ ...formData, duration: value })}
            >
              <SelectTrigger className="bg-input border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">{t("register.days30")}</SelectItem>
                <SelectItem value="60">{t("register.days60")}</SelectItem>
                <SelectItem value="90">{t("register.days90")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={onCancel}
            >
              {t("register.back")}
            </Button>
            <Button type="submit" className="flex-1" disabled={creating}>
              {creating ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  {t("wallet.connecting")}
                </div>
              ) : (
                <>
                  {t("register.createProject")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function CampaignMonitoring({ campaign, t }: { campaign: typeof mockExistingCampaign; t: (key: string) => string }) {
  const progress = (campaign.raised / campaign.goal) * 100;

  return (
    <div className="space-y-6">
      {/* Campaign Header */}
      <Card className="border-border bg-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-foreground">{campaign.title}</h2>
                <Badge className="bg-green-500/20 text-green-500 border-green-500/30">
                  {t("creator.active")}
                </Badge>
              </div>
              <p className="text-muted-foreground">{campaign.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Edit className="w-4 h-4 mr-2" />
                {t("creator.editProject")}
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                {t("creator.postUpdate")}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">{t("creator.raised")}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{campaign.raised} ETH</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm">{t("creator.fundingGoal")}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{campaign.goal} ETH</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">{t("creator.totalBackers")}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{campaign.backers}</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{t("creator.daysRemaining")}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{campaign.daysLeft}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground font-medium">{t("creator.fundingProgress")}</span>
              <span className="text-accent">{progress.toFixed(1)}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Smart Contract Info */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">{t("creator.smartContractAddress")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
            <code className="text-sm text-foreground font-mono flex-1 truncate">
              {campaign.smartContractAddress}
            </code>
            <Button variant="ghost" size="sm">
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{t("creator.milestoneProgress")}</CardTitle>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Plus className="w-4 h-4 mr-2" />
            {t("creator.addMilestone")}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaign.milestones.map((milestone, index) => (
              <div key={milestone.id} className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {milestone.status === "completed" ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : milestone.status === "in-progress" ? (
                    <div className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-foreground">{milestone.title}</p>
                    <Badge
                      variant="secondary"
                      className={
                        milestone.status === "completed"
                          ? "bg-green-500/20 text-green-500"
                          : milestone.status === "in-progress"
                          ? "bg-accent/20 text-accent"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {t(`creator.${milestone.status === "in-progress" ? "inProgress" : milestone.status}`)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t("projectsPage.goal")}: {milestone.target} ETH
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Backers */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{t("creator.recentBackers")}</CardTitle>
          <Button variant="ghost" size="sm">
            {t("creator.viewAll")}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {campaign.recentBackers.map((backer, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-foreground">{backer.address}</p>
                    <p className="text-xs text-muted-foreground">{backer.time}</p>
                  </div>
                </div>
                <p className="font-semibold text-accent">+{backer.amount} ETH</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Withdraw Funds */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">{t("creator.withdrawFunds")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t("creator.availableToWithdraw")}</p>
              <p className="text-2xl font-bold text-green-500">25.0 ETH</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">{t("creator.lockedInMilestones")}</p>
              <p className="text-2xl font-bold text-foreground">20.8 ETH</p>
            </div>
          </div>
          <Button className="w-full">
            {t("creator.withdrawFunds")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function CreatorContent() {
  const { t } = useI18n();
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Simulate checking if user has existing campaign
  const hasExistingCampaign = true; // Set to false to test create form

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <Hexagon className="h-8 w-8 text-accent fill-accent/20" />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-accent">
                CF
              </span>
            </div>
            <span className="text-xl font-bold text-foreground">ChainFund</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full text-sm">
              <Wallet className="w-4 h-4 text-accent" />
              <span className="font-mono text-foreground">0x1a2b...3c4d</span>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar + Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start bg-accent/10 text-accent">
                <BarChart3 className="w-4 h-4 mr-2" />
                {t("creator.overview")}
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <FileText className="w-4 h-4 mr-2" />
                {t("creator.myProjects")}
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <Users className="w-4 h-4 mr-2" />
                {t("creator.backers")}
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                <Settings className="w-4 h-4 mr-2" />
                {t("creator.settings")}
              </Button>
            </nav>

            {!hasExistingCampaign && !showCreateForm && (
              <div className="mt-8 p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground mb-3">{t("creator.noProjects")}</p>
                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => setShowCreateForm(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {t("creator.createNewProject")}
                </Button>
              </div>
            )}
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground">{t("creator.dashboard")}</h1>
              <p className="text-muted-foreground mt-1">
                {hasExistingCampaign
                  ? t("creator.overview")
                  : t("creator.startFirstProject")}
              </p>
            </div>

            {hasExistingCampaign && !showCreateForm ? (
              <CampaignMonitoring campaign={mockExistingCampaign} t={t} />
            ) : (
              <CreateCampaignForm t={t} onCancel={() => setShowCreateForm(false)} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function CreatorPage() {
  return (
    <I18nProvider>
      <CreatorContent />
    </I18nProvider>
  );
}
