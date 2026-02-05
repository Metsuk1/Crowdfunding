"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  Hexagon,
  Wallet,
  TrendingUp,
  Clock,
  Heart,
  Search,
  ExternalLink,
  X,
  Loader2,
  Coins,
} from "lucide-react";
import { useWallet } from "@/lib/wallet-context";
import {
  fetchCampaigns,
  contributeTx,
  getTokenBalance,
  type Campaign,
} from "@/lib/contracts";

function DonateModal({
  campaign,
  onClose,
  onDonated,
  t,
}: {
  campaign: Campaign;
  onClose: () => void;
  onDonated: () => void;
  t: (key: string) => string;
}) {
  const [amount, setAmount] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleDonate = async () => {
    setConfirming(true);
    setError(null);
    setTxHash(null);

    try {
      const hash = await contributeTx(campaign.id, amount);
      setTxHash(hash);
      setTimeout(() => {
        onDonated();
        onClose();
      }, 2000);
    } catch (err: any) {
      console.error("Donation error:", err);
      setError(err?.reason || err?.message || "Transaction failed");
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border bg-card">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          <CardTitle>{t("investor.donate")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-secondary rounded-lg">
            <h4 className="font-semibold text-foreground mb-1">{campaign.title}</h4>
            <p className="text-sm text-muted-foreground">
              {t("creator.raised")}: {parseFloat(campaign.totalRaised).toFixed(4)} / {parseFloat(campaign.goal).toFixed(2)} ETH
            </p>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              {t("investor.donateAmount")} (ETH)
            </label>
            <Input
              type="number"
              step="0.01"
              min="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-input border-border text-lg"
            />
          </div>

          <div className="flex gap-2">
            {[0.1, 0.5, 1, 5].map((preset) => (
              <Button
                key={preset}
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => setAmount(preset.toString())}
              >
                {preset} ETH
              </Button>
            ))}
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
              {error}
            </div>
          )}

          {txHash && (
            <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-500 text-sm">
              Donation successful! TX: {txHash.substring(0, 10)}...
            </div>
          )}

          <Button
            className="w-full"
            size="lg"
            onClick={handleDonate}
            disabled={!amount || parseFloat(amount) <= 0 || confirming}
          >
            {confirming ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                {t("wallet.connecting")}
              </div>
            ) : (
              t("investor.confirmDonation")
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function InvestorContent() {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const { walletAddress, balance } = useWallet();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [tokenBalance, setTokenBalance] = useState("0");

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchCampaigns();
      setCampaigns(data);
      if (walletAddress) {
        const tb = await getTokenBalance(walletAddress);
        setTokenBalance(tb);
      }
    } catch (err) {
      console.error("Failed to load campaigns:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [walletAddress]);

  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Only show active (non-finalized, deadline not passed) campaigns
  const activeCampaigns = filteredCampaigns.filter((c) => !c.finalized && c.daysLeft > 0);

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
              <span className="font-mono">
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/20 rounded-xl">
                  <Wallet className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("creator.walletBalance")}</p>
                  <p className="text-2xl font-bold text-foreground">{balance || "..."} ETH</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/20 rounded-xl">
                  <Coins className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CFRE Tokens</p>
                  <p className="text-2xl font-bold text-foreground">
                    {parseFloat(tokenBalance).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/20 rounded-xl">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("investor.activeCampaigns")}</p>
                  <p className="text-2xl font-bold text-foreground">{campaigns.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Campaigns Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {t("investor.activeCampaigns")}
            </h2>
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t("projectsPage.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : activeCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCampaigns.map((campaign) => (
                <Card key={campaign.id} className="border-border bg-card overflow-hidden group">
                  <div className="aspect-video bg-secondary relative">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <Hexagon className="w-16 h-16" />
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        Campaign #{campaign.id}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                      {campaign.title}
                    </h3>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground font-medium">
                          {parseFloat(campaign.totalRaised).toFixed(4)} ETH
                        </span>
                        <span className="text-muted-foreground">
                          {t("projectsPage.goal")}: {parseFloat(campaign.goal).toFixed(2)} ETH
                        </span>
                      </div>
                      <Progress value={Math.min(campaign.progress, 100)} className="h-2" />
                      <p className="text-xs text-accent mt-1">
                        {campaign.progress.toFixed(0)}% {t("projectsPage.funded")}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{parseFloat(campaign.totalRaised).toFixed(2)} ETH</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{campaign.daysLeft} {t("projects.daysLeft")}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        onClick={() => setSelectedCampaign(campaign)}
                      >
                        {t("investor.donate")}
                      </Button>
                      <Button variant="outline" size="icon" className="bg-transparent">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Hexagon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t("projectsPage.noProjects")}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {campaigns.length === 0
                  ? "No campaigns have been created yet. Create one on the Creator page!"
                  : t("projectsPage.tryAdjusting")}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Donate Modal */}
      {selectedCampaign && (
        <DonateModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          onDonated={loadData}
          t={t}
        />
      )}
    </div>
  );
}

export default function InvestorPage() {
  return (
    <I18nProvider>
      <InvestorContent />
    </I18nProvider>
  );
}
