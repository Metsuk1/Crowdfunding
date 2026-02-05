"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import {
  Hexagon,
  TrendingUp,
  Rocket,
  Check,
  ChevronRight,
  Wallet,
} from "lucide-react";
import { useWallet } from "@/lib/wallet-context";

type Role = "investor" | "creator" | null;

function RoleSelectionContent() {
  const { t } = useI18n();
  const router = useRouter();
  const { walletAddress } = useWallet();
  const [selectedRole, setSelectedRole] = useState<Role>(null);

  const handleContinue = () => {
    if (selectedRole === "investor") {
      router.push("/investor");
    } else if (selectedRole === "creator") {
      router.push("/creator");
    }
  };

  const roles = [
    {
      id: "investor" as Role,
      icon: TrendingUp,
      title: "role.investor",
      description: "role.investorDesc",
      features: [
        "role.investorFeature1",
        "role.investorFeature2",
        "role.investorFeature3",
      ],
    },
    {
      id: "creator" as Role,
      icon: Rocket,
      title: "role.creator",
      description: "role.creatorDesc",
      features: [
        "role.creatorFeature1",
        "role.creatorFeature2",
        "role.creatorFeature3",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
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
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Wallet className="w-4 h-4" />
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
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {t("role.selectTitle")}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t("role.selectSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;

              return (
                <Card
                  key={role.id}
                  className={`cursor-pointer transition-all border-2 ${isSelected
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50 bg-card"
                    }`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl ${isSelected ? "bg-accent/20" : "bg-secondary"
                          }`}
                      >
                        <Icon
                          className={`w-8 h-8 ${isSelected ? "text-accent" : "text-foreground"
                            }`}
                        />
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected
                          ? "border-accent bg-accent"
                          : "border-muted-foreground"
                          }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-accent-foreground" />}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {t(role.title)}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {t(role.description)}
                    </p>

                    <ul className="space-y-2">
                      {role.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <Check
                            className={`w-4 h-4 ${isSelected ? "text-accent" : "text-muted-foreground"
                              }`}
                          />
                          {t(feature)}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={handleContinue}
              disabled={!selectedRole}
              className="px-12"
            >
              {t("role.continue")}
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function SelectRolePage() {
  return (
    <I18nProvider>
      <RoleSelectionContent />
    </I18nProvider>
  );
}
