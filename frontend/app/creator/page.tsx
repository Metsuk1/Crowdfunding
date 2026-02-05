"use client";

import React from "react"

import Link from "next/link";
import { useState, useEffect } from "react";
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
import { useWallet } from "@/lib/wallet-context";
import {
  fetchCampaigns,
  createCampaignTx,
  CROWDFUNDING_ADDRESS,
  type Campaign,
} from "@/lib/contracts";
import {
  Hexagon,
  Wallet,
  Plus,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  BarChart3,
  FileText,
  Settings,
  Loader2,
} from "lucide-react";

function CreateCampaignForm({ t, onCancel, onCreated }: { t: (key: string) => string; onCancel: () => void; onCreated: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    goal: "",
    duration: "30",
  });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    setTxHash(null);

    try {
      const hash = await createCampaignTx(
        formData.title,
        formData.goal,
        parseInt(formData.duration)
      );
      setTxHash(hash);
      onCreated();
    } catch (err: any) {
      console.error("Create campaign error:", err);
      setError(err?.reason || err?.message || "Transaction failed");
    } finally {
      setCreating(false);
    }
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
              <Label htmlFor="goal">{t("register.fundingGoal")} (ETH)</Label>
              <Input
                id="goal"
                type="number"
                step="0.01"
                min="0.01"
                value={formData.goal}
                onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                className="bg-input border-border"
                placeholder="10"
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

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          {txHash && (
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 text-sm">
              Campaign created! TX: {txHash.substring(0, 10)}...{txHash.substring(txHash.length - 8)}
            </div>
          )}

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
                  <Loader2 className="w-4 h-4 animate-spin" />
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

function CampaignMonitoring({ campaigns, t }: { campaigns: Campaign[]; t: (key: string) => string }) {
  return (
    <div className="space-y-6">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">{campaign.title}</h2>
                  <Badge className={campaign.finalized
                    ? "bg-muted text-muted-foreground"
                    : "bg-green-500/20 text-green-500 border-green-500/30"
                  }>
                    {campaign.finalized ? t("creator.completed") || "Completed" : t("creator.active")}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Campaign #{campaign.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">{t("creator.raised")}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{parseFloat(campaign.totalRaised).toFixed(4)} ETH</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <BarChart3 className="w-4 h-4" />
                  <span className="text-sm">{t("creator.fundingGoal")}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{parseFloat(campaign.goal).toFixed(4)} ETH</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{t("creator.daysRemaining")}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{campaign.daysLeft}</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Status</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {campaign.finalized ? "Finalized" : campaign.daysLeft > 0 ? "Active" : "Ended"}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-foreground font-medium">{t("creator.fundingProgress")}</span>
                <span className="text-accent">{campaign.progress.toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(campaign.progress, 100)} className="h-3" />
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Smart Contract Info */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-lg">{t("creator.smartContractAddress")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 p-3 bg-secondary rounded-lg">
            <code className="text-sm text-foreground font-mono flex-1 truncate">
              {CROWDFUNDING_ADDRESS}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator.clipboard.writeText(CROWDFUNDING_ADDRESS)}
            >
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CreatorContent() {
  const { t } = useI18n();
  const { walletAddress } = useWallet();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const data = await fetchCampaigns();
      setCampaigns(data);
    } catch (err) {
      console.error("Failed to load campaigns:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const hasExistingCampaign = campaigns.length > 0;

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
              <span className="font-mono text-foreground">
                {walletAddress
                  ? `${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`
                  : "Not Connected"}
              </span>
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

            <div className="mt-8">
              <Button
                size="sm"
                className="w-full"
                onClick={() => setShowCreateForm(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                {t("creator.createNewProject")}
              </Button>
            </div>
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

            {showCreateForm ? (
              <CreateCampaignForm
                t={t}
                onCancel={() => setShowCreateForm(false)}
                onCreated={() => {
                  setShowCreateForm(false);
                  loadCampaigns();
                }}
              />
            ) : loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : hasExistingCampaign ? (
              <CampaignMonitoring campaigns={campaigns} t={t} />
            ) : (
              <Card className="border-border bg-card">
                <CardContent className="p-12 text-center">
                  <Hexagon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t("creator.noProjects")}</h3>
                  <p className="text-muted-foreground mb-6">{t("creator.startFirstProject")}</p>
                  <Button onClick={() => setShowCreateForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    {t("creator.createNewProject")}
                  </Button>
                </CardContent>
              </Card>
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
