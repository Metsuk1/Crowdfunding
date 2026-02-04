"use client";

import { useState } from "react";
import Link from "next/link";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Users,
  Flag,
  Bell,
  Settings,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Wallet,
  Copy,
  ExternalLink,
  TrendingUp,
  Eye,
  Share2,
  ChevronRight,
  CheckCircle2,
  Circle,
  Timer,
} from "lucide-react";

function DashboardContent() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for demonstration
  const projectData = {
    name: "EcoChain: Carbon Credit Marketplace",
    status: "active",
    totalRaised: 156.8,
    fundingGoal: 200,
    totalBackers: 342,
    daysRemaining: 18,
    smartContractAddress: "0x1234...5678",
    walletBalance: 45.2,
    availableToWithdraw: 32.5,
    lockedInMilestones: 124.3,
  };

  const recentBackers = [
    { name: "0x8f3a...2c4d", amount: 2.5, time: "2 hours ago" },
    { name: "0x7b2e...9f1a", amount: 1.0, time: "5 hours ago" },
    { name: "0x4c5d...3e2f", amount: 5.0, time: "1 day ago" },
    { name: "0x9a1b...7c8d", amount: 0.5, time: "2 days ago" },
  ];

  const milestones = [
    { title: "Project Launch", status: "completed", amount: 20, date: "Jan 15, 2026" },
    { title: "MVP Development", status: "completed", amount: 50, date: "Feb 1, 2026" },
    { title: "Beta Testing", status: "inProgress", amount: 40, date: "Feb 15, 2026" },
    { title: "Public Launch", status: "pending", amount: 90, date: "Mar 1, 2026" },
  ];

  const recentTransactions = [
    { type: "contribution", amount: 2.5, from: "0x8f3a...2c4d", date: "2 hours ago", hash: "0xabc..." },
    { type: "contribution", amount: 1.0, from: "0x7b2e...9f1a", date: "5 hours ago", hash: "0xdef..." },
    { type: "withdrawal", amount: 15.0, to: "0x1234...5678", date: "3 days ago", hash: "0xghi..." },
    { type: "contribution", amount: 5.0, from: "0x4c5d...3e2f", date: "1 day ago", hash: "0xjkl..." },
  ];

  const stats = [
    { label: t("creator.pageViews"), value: "12,458", change: "+12.5%", positive: true },
    { label: t("creator.conversionRate"), value: "3.2%", change: "+0.8%", positive: true },
    { label: t("creator.averageContribution"), value: "0.46 ETH", change: "-0.05", positive: false },
    { label: t("creator.shareRate"), value: "8.7%", change: "+2.1%", positive: true },
  ];

  const sidebarItems = [
    { id: "overview", icon: LayoutDashboard, label: t("creator.overview") },
    { id: "projects", icon: FolderKanban, label: t("creator.myProjects") },
    { id: "analytics", icon: BarChart3, label: t("creator.analytics") },
    { id: "backers", icon: Users, label: t("creator.backers") },
    { id: "milestones", icon: Flag, label: t("creator.milestones") },
    { id: "updates", icon: Bell, label: t("creator.updates") },
    { id: "settings", icon: Settings, label: t("creator.settings") },
  ];

  const fundingPercentage = (projectData.totalRaised / projectData.fundingGoal) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border p-4 hidden lg:block">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-foreground mb-1">{t("creator.dashboard")}</h2>
            <p className="text-sm text-muted-foreground truncate">{projectData.name}</p>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeTab === item.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <Separator className="my-6" />

          <div className="space-y-3">
            <Link href="/register">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Plus className="w-4 h-4 mr-2" />
                {t("creator.createNewProject")}
              </Button>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-6">
          {/* Mobile Navigation */}
          <div className="lg:hidden mb-6 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                    activeTab === item.id
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{t("creator.overview")}</h1>
              <p className="text-muted-foreground">{projectData.name}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="border-border bg-transparent">
                <Settings className="w-4 h-4 mr-2" />
                {t("creator.editProject")}
              </Button>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Bell className="w-4 h-4 mr-2" />
                {t("creator.postUpdate")}
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t("creator.totalRaised")}</span>
                  <TrendingUp className="w-4 h-4 text-accent" />
                </div>
                <div className="text-2xl font-bold text-foreground">{projectData.totalRaised} ETH</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {t("creator.fundingGoal")}: {projectData.fundingGoal} ETH
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t("creator.totalBackers")}</span>
                  <Users className="w-4 h-4 text-accent" />
                </div>
                <div className="text-2xl font-bold text-foreground">{projectData.totalBackers}</div>
                <div className="flex items-center text-xs text-accent mt-1">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +24 this week
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t("creator.daysRemaining")}</span>
                  <Clock className="w-4 h-4 text-accent" />
                </div>
                <div className="text-2xl font-bold text-foreground">{projectData.daysRemaining}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {t("creator.projectStatus")}: {t("creator.active")}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{t("creator.fundingProgress")}</span>
                  <BarChart3 className="w-4 h-4 text-accent" />
                </div>
                <div className="text-2xl font-bold text-foreground">{fundingPercentage.toFixed(1)}%</div>
                <Progress value={fundingPercentage} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Wallet & Contract Info */}
            <Card className="bg-card border-border lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-accent" />
                  {t("creator.walletBalance")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">{t("creator.walletBalance")}</p>
                    <p className="text-xl font-bold text-foreground">{projectData.walletBalance} ETH</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">{t("creator.availableToWithdraw")}</p>
                    <p className="text-xl font-bold text-accent">{projectData.availableToWithdraw} ETH</p>
                  </div>
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">{t("creator.lockedInMilestones")}</p>
                    <p className="text-xl font-bold text-foreground">{projectData.lockedInMilestones} ETH</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t("creator.smartContractAddress")}</p>
                    <p className="text-sm font-mono text-foreground">{projectData.smartContractAddress}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  {t("creator.withdrawFunds")}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>{t("creator.quickActions")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-border bg-transparent">
                  <Bell className="w-4 h-4 mr-2" />
                  {t("creator.postUpdate")}
                </Button>
                <Button variant="outline" className="w-full justify-start border-border bg-transparent">
                  <Flag className="w-4 h-4 mr-2" />
                  {t("creator.addMilestone")}
                </Button>
                <Button variant="outline" className="w-full justify-start border-border bg-transparent">
                  <Settings className="w-4 h-4 mr-2" />
                  {t("creator.editProject")}
                </Button>
                <Button variant="outline" className="w-full justify-start border-border bg-transparent">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Project
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <div className={`flex items-center text-xs mt-1 ${stat.positive ? "text-accent" : "text-destructive"}`}>
                    {stat.positive ? (
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3 mr-1" />
                    )}
                    {stat.change}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Milestones & Recent Backers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Milestones */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{t("creator.milestoneProgress")}</CardTitle>
                <Button variant="ghost" size="sm" className="text-accent">
                  {t("creator.viewAll")}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {milestone.status === "completed" ? (
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                        ) : milestone.status === "inProgress" ? (
                          <Timer className="w-5 h-5 text-yellow-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground">{milestone.title}</p>
                          <Badge
                            variant={
                              milestone.status === "completed"
                                ? "default"
                                : milestone.status === "inProgress"
                                ? "secondary"
                                : "outline"
                            }
                            className={
                              milestone.status === "completed"
                                ? "bg-accent text-accent-foreground"
                                : milestone.status === "inProgress"
                                ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
                                : ""
                            }
                          >
                            {t(`creator.${milestone.status === "inProgress" ? "inProgress" : milestone.status}`)}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-muted-foreground">{milestone.date}</p>
                          <p className="text-sm font-medium text-foreground">{milestone.amount} ETH</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Backers */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{t("creator.recentBackers")}</CardTitle>
                <Button variant="ghost" size="sm" className="text-accent">
                  {t("creator.viewAll")}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBackers.map((backer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-mono text-sm text-foreground">{backer.name}</p>
                          <p className="text-xs text-muted-foreground">{backer.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-accent">+{backer.amount} ETH</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t("creator.recentTransactions")}</CardTitle>
              <Button variant="ghost" size="sm" className="text-accent">
                {t("creator.viewAll")}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">From/To</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tx Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((tx, index) => (
                      <tr key={index} className="border-b border-border last:border-0">
                        <td className="py-3 px-4">
                          <Badge
                            variant={tx.type === "contribution" ? "default" : "secondary"}
                            className={
                              tx.type === "contribution"
                                ? "bg-accent/20 text-accent border-accent/30"
                                : "bg-secondary text-muted-foreground"
                            }
                          >
                            {tx.type === "contribution" ? t("creator.contribution") : t("creator.withdrawal")}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <span className={tx.type === "contribution" ? "text-accent" : "text-foreground"}>
                            {tx.type === "contribution" ? "+" : "-"}{tx.amount} ETH
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-sm text-muted-foreground">
                          {tx.from || tx.to}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{tx.date}</td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm" className="font-mono text-xs text-muted-foreground hover:text-foreground">
                            {tx.hash}
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <I18nProvider>
      <DashboardContent />
    </I18nProvider>
  );
}
