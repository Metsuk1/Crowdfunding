"use client";

import React from "react"

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
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
  User,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  Rocket,
  Target,
  Clock,
  Wallet,
} from "lucide-react";

function RegisterForm() {
  const { t } = useI18n();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    projectName: "",
    category: "",
    description: "",
    fundingGoal: "",
    duration: "30",
    walletAddress: "",
    agreeTerms: false,
  });

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic
  };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex flex-1 bg-secondary/30 items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <LanguageSwitcher />
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-8">
          <div className="mb-8">
            <Rocket className="h-24 w-24 text-accent mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            {t("cta.title")}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {t("cta.description")}
          </p>

          {/* Features list */}
          <div className="mt-8 space-y-4 text-left max-w-sm mx-auto">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Target className="h-4 w-4 text-accent" />
              </div>
              <span>{t("features.smartContractSecurity")}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Clock className="h-4 w-4 text-accent" />
              </div>
              <span>{t("features.instantTransactions")}</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Wallet className="h-4 w-4 text-accent" />
              </div>
              <span>{t("features.globalAccess")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 overflow-y-auto">
        <div className="mx-auto w-full max-w-lg">
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
              {t("register.title")}
            </h1>
            <p className="text-muted-foreground">{t("register.subtitle")}</p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            <div
              className={`h-2 flex-1 rounded-full ${step >= 1 ? "bg-accent" : "bg-secondary"}`}
            />
            <div
              className={`h-2 flex-1 rounded-full ${step >= 2 ? "bg-accent" : "bg-secondary"}`}
            />
            <span className="text-sm text-muted-foreground ml-2">
              {t("register.step")} {step} {t("register.of")} 2
            </span>
          </div>

          <Card className="border-border bg-card">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-5">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      {t("register.accountInfo")}
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-foreground">
                        {t("register.fullName")}
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="John Doe"
                          value={formData.fullName}
                          onChange={(e) =>
                            updateFormData("fullName", e.target.value)
                          }
                          className="pl-10 bg-input border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">
                        {t("register.email")}
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            updateFormData("email", e.target.value)
                          }
                          className="pl-10 bg-input border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-foreground">
                        {t("register.password")}
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={formData.password}
                          onChange={(e) =>
                            updateFormData("password", e.target.value)
                          }
                          className="pl-10 bg-input border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-foreground"
                      >
                        {t("register.confirmPassword")}
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            updateFormData("confirmPassword", e.target.value)
                          }
                          className="pl-10 bg-input border-border"
                        />
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={nextStep}
                      className="w-full"
                      size="lg"
                    >
                      {t("register.next")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      {t("register.projectInfo")}
                    </h3>

                    <div className="space-y-2">
                      <Label htmlFor="projectName" className="text-foreground">
                        {t("register.projectName")}
                      </Label>
                      <div className="relative">
                        <Rocket className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="projectName"
                          type="text"
                          placeholder="My Awesome Project"
                          value={formData.projectName}
                          onChange={(e) =>
                            updateFormData("projectName", e.target.value)
                          }
                          className="pl-10 bg-input border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-foreground">
                        {t("register.projectCategory")}
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          updateFormData("category", value)
                        }
                      >
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue
                            placeholder={t("register.selectCategory")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tech">
                            {t("register.categoryTech")}
                          </SelectItem>
                          <SelectItem value="environment">
                            {t("register.categoryEnvironment")}
                          </SelectItem>
                          <SelectItem value="healthcare">
                            {t("register.categoryHealthcare")}
                          </SelectItem>
                          <SelectItem value="art">
                            {t("register.categoryArt")}
                          </SelectItem>
                          <SelectItem value="education">
                            {t("register.categoryEducation")}
                          </SelectItem>
                          <SelectItem value="finance">
                            {t("register.categoryFinance")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-foreground">
                        {t("register.projectDescription")}
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your project..."
                        value={formData.description}
                        onChange={(e) =>
                          updateFormData("description", e.target.value)
                        }
                        className="bg-input border-border min-h-[100px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="fundingGoal"
                          className="text-foreground"
                        >
                          {t("register.fundingGoal")}
                        </Label>
                        <div className="relative">
                          <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="fundingGoal"
                            type="number"
                            placeholder="10"
                            value={formData.fundingGoal}
                            onChange={(e) =>
                              updateFormData("fundingGoal", e.target.value)
                            }
                            className="pl-10 bg-input border-border"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration" className="text-foreground">
                          {t("register.duration")}
                        </Label>
                        <Select
                          value={formData.duration}
                          onValueChange={(value) =>
                            updateFormData("duration", value)
                          }
                        >
                          <SelectTrigger className="bg-input border-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="30">
                              {t("register.days30")}
                            </SelectItem>
                            <SelectItem value="60">
                              {t("register.days60")}
                            </SelectItem>
                            <SelectItem value="90">
                              {t("register.days90")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="walletAddress"
                        className="text-foreground"
                      >
                        {t("register.walletAddress")}
                      </Label>
                      <div className="relative">
                        <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="walletAddress"
                          type="text"
                          placeholder="0x..."
                          value={formData.walletAddress}
                          onChange={(e) =>
                            updateFormData("walletAddress", e.target.value)
                          }
                          className="pl-10 bg-input border-border"
                        />
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) =>
                          updateFormData("agreeTerms", checked as boolean)
                        }
                        className="mt-1"
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                      >
                        {t("register.agreeTerms")}
                      </Label>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="flex-1 bg-transparent"
                        size="lg"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t("register.back")}
                      </Button>
                      <Button type="submit" className="flex-1" size="lg">
                        {t("register.createProject")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                {t("register.haveAccount")}{" "}
                <Link
                  href="/login"
                  className="text-accent hover:text-accent/80 font-medium transition-colors"
                >
                  {t("register.signIn")}
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <I18nProvider>
      <RegisterForm />
    </I18nProvider>
  );
}
