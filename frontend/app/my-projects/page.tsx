"use client";

import React from "react";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useWallet } from "@/lib/wallet-context";
import {
  fetchCampaigns,
  withdrawFundsTx,
  type Campaign,
} from "@/lib/contracts";
import {
  Hexagon,
  Wallet,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle,
  BarChart3,
  Loader2,
  DollarSign,
  ArrowLeft,
} from "lucide-react";

function MyProjectsContent() {
  const { t } = useI18n();
  const { walletAddress } = useWallet();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [withdrawingId, setWithdrawingId] = useState<number | null>(null);
  const [withdrawError, setWithdrawError] = useState<string | null>(null);
  const [withdrawSuccess, setWithdrawSuccess] = useState<number | null>(null);

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

  const myCampaigns = campaigns.filter(
    (c) => walletAddress && c.creator.toLowerCase() === walletAddress.toLowerCase()
  );

  const handleWithdraw = async (campaignId: number) => {
    setWithdrawingId(campaignId);
    setWithdrawError(null);
    setWithdrawSuccess(null);
    try {
      await withdrawFundsTx(campaignId);
      setWithdrawSuccess(campaignId);
      loadCampaigns();
    } catch (err: any) {
      setWithdrawError(err?.reason || err?.message || "Withdrawal failed");
    } finally {
      setWithdrawingId(null);
    }
  };

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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/creator">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("creator.dashboard")}
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">{t("myProjects.title")}</h1>
          <p className="text-muted-foreground mt-1">{t("myProjects.subtitle")}</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : !walletAddress ? (
          <Card className="border-border bg-card">
            <CardContent className="p-12 text-center">
              <Wallet className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{t("wallet.connect")}</h3>
              <p className="text-muted-foreground">Connect your wallet to see your projects</p>
            </CardContent>
          </Card>
        ) : myCampaigns.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="p-12 text-center">
              <Hexagon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{t("myProjects.noProjects")}</h3>
              <p className="text-muted-foreground mb-6">{t("myProjects.createFirst")}</p>
              <Link href="/creator">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  {t("creator.createNewProject")}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {myCampaigns.map((campaign) => {
              const canWithdraw = campaign.progress >= 100 && !campaign.withdrawn;

              return (
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
                          {campaign.withdrawn && (
                            <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">
                              {t("creator.withdrawn")}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">Campaign #{campaign.id}</p>
                      </div>
                      {canWithdraw && (
                        <Button
                          onClick={() => handleWithdraw(campaign.id)}
                          disabled={withdrawingId === campaign.id}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {withdrawingId === campaign.id ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              {t("creator.withdrawing")}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4" />
                              {t("creator.withdrawFunds")}
                            </div>
                          )}
                        </Button>
                      )}
                    </div>

                    {withdrawError && withdrawingId === null && (
                      <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
                        {withdrawError}
                      </div>
                    )}

                    {withdrawSuccess === campaign.id && (
                      <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 text-sm">
                        {t("creator.withdrawSuccess")}
                      </div>
                    )}

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
                          {campaign.withdrawn ? t("creator.withdrawn") : campaign.finalized ? "Finalized" : campaign.daysLeft > 0 ? "Active" : "Ended"}
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
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default function MyProjectsPage() {
  return (
    <I18nProvider>
      <MyProjectsContent />
    </I18nProvider>
  );
}
