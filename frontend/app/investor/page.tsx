"use client";

import Link from "next/link";
import { useState } from "react";
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
  Users,
  Search,
  Heart,
  ExternalLink,
  X,
} from "lucide-react";
import { useWallet } from "@/lib/wallet-context";

const mockCampaigns = [
  {
    id: "1",
    title: "EcoChain: Carbon Credit Marketplace",
    description: "A decentralized platform for trading verified carbon credits using blockchain technology.",
    category: "Environment",
    raised: 45.8,
    goal: 100,
    backers: 234,
    daysLeft: 18,
    image: "/placeholder.svg",
    creator: "0x1a2b...3c4d",
    verified: true,
  },
  {
    id: "2",
    title: "MedVault: Healthcare Data Security",
    description: "Secure, patient-controlled medical records stored on the blockchain.",
    category: "Healthcare",
    raised: 78.5,
    goal: 150,
    backers: 456,
    daysLeft: 12,
    image: "/placeholder.svg",
    creator: "0x5e6f...7g8h",
    verified: true,
  },
  {
    id: "3",
    title: "ArtBlock: NFT Gallery Platform",
    description: "Democratizing art ownership through fractional NFT investments.",
    category: "Art & Culture",
    raised: 32.1,
    goal: 80,
    backers: 189,
    daysLeft: 25,
    image: "/placeholder.svg",
    creator: "0x9i0j...1k2l",
    verified: false,
  },
  {
    id: "4",
    title: "DeFi Lending Protocol",
    description: "Decentralized lending platform with competitive interest rates.",
    category: "DeFi",
    raised: 120.5,
    goal: 200,
    backers: 678,
    daysLeft: 8,
    image: "/placeholder.svg",
    creator: "0x3m4n...5o6p",
    verified: true,
  },
];

function DonateModal({
  campaign,
  onClose,
  t,
}: {
  campaign: typeof mockCampaigns[0];
  onClose: () => void;
  t: (key: string) => string;
}) {
  const [amount, setAmount] = useState("");
  const [confirming, setConfirming] = useState(false);

  const handleDonate = async () => {
    setConfirming(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setConfirming(false);
    onClose();
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
            <p className="text-sm text-muted-foreground">{campaign.description}</p>
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

          <Button
            className="w-full"
            size="lg"
            onClick={handleDonate}
            disabled={!amount || parseFloat(amount) <= 0 || confirming}
          >
            {confirming ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
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
  const [selectedCampaign, setSelectedCampaign] = useState<typeof mockCampaigns[0] | null>(null);
  const { walletAddress } = useWallet();
  const filteredCampaigns = mockCampaigns.filter(
    (campaign) =>
      campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalInvested = 12.5;
  const projectsBacked = 5;

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
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("investor.totalInvested")}</p>
                  <p className="text-2xl font-bold text-foreground">{totalInvested} ETH</p>
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
                  <p className="text-sm text-muted-foreground">{t("investor.projectsBacked")}</p>
                  <p className="text-2xl font-bold text-foreground">{projectsBacked}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-accent/20 rounded-xl">
                  <Wallet className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t("creator.walletBalance")}</p>
                  <p className="text-2xl font-bold text-foreground">25.8 ETH</p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => {
              const progress = (campaign.raised / campaign.goal) * 100;

              return (
                <Card key={campaign.id} className="border-border bg-card overflow-hidden group">
                  <div className="aspect-video bg-secondary relative">
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                      <Hexagon className="w-16 h-16" />
                    </div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                        {campaign.category}
                      </Badge>
                      {campaign.verified && (
                        <Badge className="bg-accent text-accent-foreground">
                          {t("projectsPage.verified")}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                      {campaign.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {campaign.description}
                    </p>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground font-medium">{campaign.raised} ETH</span>
                        <span className="text-muted-foreground">{t("projectsPage.goal")}: {campaign.goal} ETH</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-accent mt-1">{progress.toFixed(0)}% {t("projectsPage.funded")}</p>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{campaign.backers} {t("projects.backers")}</span>
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
              );
            })}
          </div>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">{t("projectsPage.noProjects")}</p>
              <p className="text-sm text-muted-foreground mt-1">{t("projectsPage.tryAdjusting")}</p>
            </div>
          )}
        </div>
      </main>

      {/* Donate Modal */}
      {selectedCampaign && (
        <DonateModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
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
