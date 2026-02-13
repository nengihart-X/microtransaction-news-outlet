"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { authors, articles, transactions } from "@/lib/data"
import { useWallet } from "@/lib/wallet-context"
import {
  TrendingUp,
  Users,
  BookOpen,
  Coins,
  ExternalLink,
  ArrowUpRight,
  BarChart3,
  Heart,
} from "lucide-react"

const earningsHistory = [
  { month: "Sep", amount: 420 },
  { month: "Oct", amount: 580 },
  { month: "Nov", amount: 710 },
  { month: "Dec", amount: 640 },
  { month: "Jan", amount: 890 },
  { month: "Feb", amount: 1120 },
]

export default function DashboardPage() {
  const { user, resetPublisher } = useWallet()
  const totalEarnings = authors.reduce((s, a) => s + a.totalEarnings, 0)
  const totalArticles = authors.reduce((s, a) => s + a.articlesCount, 0)
  const totalReads = articles.reduce((s, a) => s + a.reads, 0)
  const totalTips = articles.reduce((s, a) => s + a.tips, 0)
  const maxEarning = Math.max(...earningsHistory.map((e) => e.amount))

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-4 py-12">
        {/* Page Header */}
        <div className="fade-in-up flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Platform Dashboard
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Real-time earnings and readership data powered by x402-stacks
              on-chain settlement.
            </p>
          </div>
          {user?.isPublisher && (
            <Button
              onClick={() => window.location.href = "/write"}
              className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              Write Story
            </Button>
          )}
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="fade-in-up hover-lift rounded-xl border border-border bg-card p-5" style={{ animationDelay: "0.05s" }}>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Coins className="h-3.5 w-3.5 text-accent" />
              Total Earnings
            </div>
            <p className="mt-2 text-2xl font-bold tabular-nums text-card-foreground">
              {totalEarnings.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                STX
              </span>
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs text-accent">
              <ArrowUpRight className="h-3 w-3" />
              +18.2% this month
            </div>
          </div>

          <div className="fade-in-up hover-lift rounded-xl border border-border bg-card p-5" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5 text-accent" />
              Total Reads
            </div>
            <p className="mt-2 text-2xl font-bold tabular-nums text-card-foreground">
              {totalReads.toLocaleString()}
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs text-accent">
              <ArrowUpRight className="h-3 w-3" />
              +12.5% this month
            </div>
          </div>

          <div className="fade-in-up hover-lift rounded-xl border border-border bg-card p-5" style={{ animationDelay: "0.15s" }}>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3.5 w-3.5 text-accent" />
              Tips Received
            </div>
            <p className="mt-2 text-2xl font-bold tabular-nums text-card-foreground">
              {totalTips.toLocaleString()}
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs text-accent">
              <ArrowUpRight className="h-3 w-3" />
              +24.8% this month
            </div>
          </div>

          <div className="fade-in-up hover-lift rounded-xl border border-border bg-card p-5" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5 text-accent" />
              Articles Published
            </div>
            <p className="mt-2 text-2xl font-bold tabular-nums text-card-foreground">
              {totalArticles}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Across {authors.length} journalists
            </p>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="fade-in-up mt-8 rounded-xl border border-border bg-card p-6" style={{ animationDelay: "0.25s" }}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-semibold text-card-foreground">
                Platform Earnings
              </h2>
              <p className="text-xs text-muted-foreground">
                Monthly STX revenue from article payments
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              <BarChart3 className="h-3 w-3" />
              Last 6 months
            </div>
          </div>

          <div className="mt-6 flex items-end gap-3">
            {earningsHistory.map((entry) => (
              <div
                key={entry.month}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <span className="text-xs font-semibold tabular-nums text-card-foreground">
                  {entry.amount}
                </span>
                <div
                  className="w-full rounded-t-md bg-accent/80 transition-all duration-300 hover:bg-accent"
                  style={{
                    height: `${(entry.amount / maxEarning) * 140}px`,
                    minHeight: "20px",
                  }}
                />
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {entry.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        {/* Writers Leaderboard */}
        <div className="fade-in-up" style={{ animationDelay: "0.3s" }}>
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Writers
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            All earnings are settled on-chain via Stacks with Bitcoin finality.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {authors
              .sort((a, b) => b.totalEarnings - a.totalEarnings)
              .map((author, i) => {
                const authorArticles = articles.filter(
                  (a) => a.author.id === author.id
                )
                const authorReads = authorArticles.reduce(
                  (s, a) => s + a.reads,
                  0
                )

                return (
                  <Link
                    key={author.id}
                    href={`/journalist/${author.id}`}
                    className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent/30 hover-lift"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {author.avatar ? (
                            <img
                              src={author.avatar}
                              alt={author.name}
                              className="h-12 w-12 rounded-full object-cover border border-border bg-secondary"
                            />
                          ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-lg font-bold text-accent transition-colors group-hover:bg-accent/25">
                              {author.name.charAt(0)}
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-card text-[10px] font-bold text-muted-foreground ring-2 ring-card">
                            #{i + 1}
                          </div>
                        </div>
                        <div>
                          <p className="font-semibold text-card-foreground group-hover:text-accent transition-colors">
                            {author.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {author.followers.toLocaleString()} followers
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-accent/30 bg-transparent text-xs font-semibold text-accent"
                      >
                        {author.totalEarnings.toLocaleString()} STX
                      </Badge>
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {author.bio}
                    </p>

                    <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
                      <span>{author.articlesCount} articles</span>
                      <span>{authorReads.toLocaleString()} reads</span>
                      <span className="ml-auto flex items-center gap-1 text-accent opacity-0 transition-opacity group-hover:opacity-100">
                        View Profile
                        <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                )
              })}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-12 fade-in-up" style={{ animationDelay: "0.35s" }}>
          <div className="flex items-center gap-3">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              Recent Transactions
            </h2>
            <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent pulse-dot" />
              Live
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Live payment feed from the x402 facilitator.
          </p>

          <div className="mt-6 rounded-xl border border-border bg-card">
            {transactions.slice(0, 8).map((tx, i) => {
              const article = articles.find((a) => a.id === tx.articleId)
              return (
                <div
                  key={tx.id}
                  className={`flex items-center justify-between p-4 transition-colors hover:bg-secondary/50 ${i < 7 ? "border-b border-border" : ""
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${tx.type === "tip" ? "bg-chart-2/10" : "bg-accent/10"
                        }`}
                    >
                      {tx.type === "tip" ? (
                        <Heart className="h-4 w-4" style={{ color: "hsl(173, 58%, 39%)" }} />
                      ) : (
                        <Coins className="h-4 w-4 text-accent" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-card-foreground line-clamp-1">
                        {article ? article.title.slice(0, 50) + "..." : "Unknown"}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span>to {article?.author.name || "Unknown"}</span>
                        <span>·</span>
                        <span>{tx.type === "tip" ? "Tip" : "Read"}</span>
                        <span>·</span>
                        <a
                          href={`https://explorer.hiro.so/txid/${tx.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-0.5 text-muted-foreground hover:text-accent"
                        >
                          <code className="text-[10px]">{tx.txHash.slice(0, 8)}...</code>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold tabular-nums text-accent">
                      {tx.type === "tip" ? "+" : ""}{tx.amount} {tx.currency}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {tx.status}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Developer Controls */}
        <div className="mt-12 flex justify-center border-t border-border pt-12">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (confirm("Reset publisher status? This will allow you to see the onboarding flow again.")) {
                resetPublisher()
                window.location.reload()
              }
            }}
            className="text-muted-foreground hover:text-destructive"
          >
            Reset Publisher Status (Dev)
          </Button>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
