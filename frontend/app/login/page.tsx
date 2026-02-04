"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Hexagon, Wallet, Shield, Check, ChevronRight } from "lucide-react";
import { useWallet } from "@/lib/wallet-context";

const wallets = [
  {
    id: "metamask",
    name: "wallet.metamask",
    popular: true,
  },
  {
    id: "walletconnect",
    name: "wallet.walletconnect",
    popular: false,
  },
  {
    id: "coinbase",
    name: "wallet.coinbase",
    popular: false,
  },
];

function LoginContent() {
  const { t } = useI18n();
  const router = useRouter();
  const { connectWallet, isConnecting, isConnected, walletAddress } = useWallet();
  const [localConnecting, setLocalConnecting] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected && walletAddress) {
      const timer = setTimeout(() => {
        router.push("/select-role");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isConnected, walletAddress, router]);

  const handleConnectWallet = async (walletId: string) => {
    setLocalConnecting(walletId);

    if (walletId === "metamask") {
      await connectWallet();
      setLocalConnecting(null);
    } else {
      // Placeholder for other wallets
      alert("Only MetaMask is supported in this demo currently.");
      setLocalConnecting(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Wallet Connect */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="relative">
              <Hexagon className="h-8 w-8 text-accent fill-accent/20" />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-accent">
                CF
              </span>
            </div>
            <span className="text-xl font-bold text-foreground">ChainFund</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t("wallet.title")}{" "}
              <span className="bg-blue-600 text-white px-2 py-1 rounded-md">
                {t("wallet.titleHighlight")}
              </span>
            </h1>
            <p className="text-muted-foreground">
              {t("wallet.subtitle")}{" "}
              <span className="bg-blue-600 text-white px-1 py-0.5 rounded">
                {t("wallet.subtitleHighlight")}
              </span>
            </p>
          </div>

          <Card className="border-border bg-card">
            <CardContent className="pt-6 space-y-4">
              {wallets.map((wallet) => (
                <Button
                  key={wallet.id}
                  variant="outline"
                  className="w-full h-16 justify-between bg-transparent border-border hover:bg-secondary hover:border-accent/50 transition-all"
                  onClick={() => handleConnectWallet(wallet.id)}
                  disabled={localConnecting !== null || isConnected}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{t(wallet.name)}</span>
                    {wallet.popular && (
                      <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                        {t("wallet.popular")}
                      </span>
                    )}
                  </div>
                  {localConnecting === wallet.id || (wallet.id === "metamask" && isConnecting) ? (
                    <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  ) : isConnected && walletAddress ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  )}
                </Button>
              ))}

              {isConnected && walletAddress && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="flex items-center gap-2 text-green-500">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">{t("wallet.connected")}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 font-mono">
                    {walletAddress}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-6 pt-4 border-t border-border">
                <Shield className="w-4 h-4" />
                <span>{t("wallet.secure")}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-secondary/30 items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <LanguageSwitcher />
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-8">
          <div className="mb-8">
            <Wallet className="h-24 w-24 text-accent mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("howItWorks.step1.title")}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {t("howItWorks.step1.description")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <I18nProvider>
      <LoginContent />
    </I18nProvider>
  );
}