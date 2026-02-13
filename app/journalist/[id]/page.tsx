"use client"

import { use, useMemo } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    authors,
    getAuthorArticles,
    getAuthorTransactions,
    authorEarnings,
} from "@/lib/data"
import {
    ArrowLeft,
    Coins,
    TrendingUp,
    BookOpen,
    Heart,
    Users,
    ExternalLink,
    Eye,
    Clock,
    ArrowUpRight,
} from "lucide-react"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts"

export default function JournalistPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params)
    const author = authors.find((a) => a.id === id)

    const authorArticles = useMemo(
        () => (author ? getAuthorArticles(author.id) : []),
        [author]
    )
    const authorTxns = useMemo(
        () => (author ? getAuthorTransactions(author.id) : []),
        [author]
    )
    const earnings = author ? authorEarnings[author.id] || [] : []

    if (!author) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="font-serif text-2xl font-bold text-foreground">
                        Writer not found
                    </h1>
                    <Link
                        href="/dashboard"
                        className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:underline"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to dashboard
                    </Link>
                </div>
            </div>
        )
    }

    const totalReads = authorArticles.reduce((s, a) => s + a.reads, 0)
    const totalTips = authorArticles.reduce((s, a) => s + a.tips, 0)
    const thisMonthEarning = earnings.length > 0 ? earnings[earnings.length - 1] : null
    const thisMonthTotal = thisMonthEarning ? thisMonthEarning.reads + thisMonthEarning.tips : 0
    const lastMonthEarning = earnings.length > 1 ? earnings[earnings.length - 2] : null
    const lastMonthTotal = lastMonthEarning ? lastMonthEarning.reads + lastMonthEarning.tips : 0
    const growthPct = lastMonthTotal > 0 ? (((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100).toFixed(1) : "0"

    const chartData = earnings.map((e) => ({
        month: e.month,
        total: e.reads + e.tips,
        reads: e.reads,
        tips: e.tips,
    }))

    const totalReadRevenue = earnings.reduce((s, e) => s + e.reads, 0)
    const totalTipRevenue = earnings.reduce((s, e) => s + e.tips, 0)
    const pieData = [
        { name: "Article Reads", value: totalReadRevenue, color: "hsl(24, 80%, 50%)" },
        { name: "Tips", value: totalTipRevenue, color: "hsl(173, 58%, 39%)" },
    ]

    const avgPerArticle = author.articlesCount > 0
        ? (author.totalEarnings / author.articlesCount).toFixed(2)
        : "0"

    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />

            <main className="mx-auto max-w-6xl px-4 py-12">
                {/* Back */}
                <Link
                    href="/dashboard"
                    className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back to Dashboard
                </Link>

                {/* Hero */}
                <div className="fade-in-up rounded-2xl border border-border bg-gradient-to-br from-card via-card to-accent/5 p-8">
                    <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                        {author.avatar ? (
                            <img
                                src={author.avatar}
                                alt={author.name}
                                className="h-20 w-20 rounded-2xl object-cover border border-border bg-secondary"
                            />
                        ) : (
                            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/15 text-3xl font-bold text-accent">
                                {author.name.charAt(0)}
                            </div>
                        )}
                        <div className="flex-1">
                            <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                                {author.name}
                            </h1>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                                {author.bio}
                            </p>
                            <div className="mt-3 flex flex-wrap items-center gap-3">
                                <Badge
                                    variant="outline"
                                    className="gap-1 border-border text-xs text-muted-foreground"
                                >
                                    <Users className="h-3 w-3" />
                                    {author.followers.toLocaleString()} followers
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="gap-1 border-border text-xs text-muted-foreground"
                                >
                                    <BookOpen className="h-3 w-3" />
                                    {author.articlesCount} articles
                                </Badge>
                                <a
                                    href={`https://explorer.hiro.so/address/${author.walletAddress}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                                >
                                    <code className="text-[10px]">
                                        {author.walletAddress.slice(0, 8)}...{author.walletAddress.slice(-6)}
                                    </code>
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <div className="fade-in-up rounded-xl border border-border bg-card p-5" style={{ animationDelay: "0.05s" }}>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Coins className="h-3.5 w-3.5 text-accent" />
                            Total Earned
                        </div>
                        <p className="mt-2 text-2xl font-bold tabular-nums text-card-foreground">
                            {author.totalEarnings.toLocaleString()}{" "}
                            <span className="text-sm font-normal text-muted-foreground">STX</span>
                        </p>
                        <div className="mt-1 flex items-center gap-1 text-xs text-accent">
                            <ArrowUpRight className="h-3 w-3" />
                            +{growthPct}% this month
                        </div>
                    </div>

                    <div className="fade-in-up rounded-xl border border-border bg-card p-5" style={{ animationDelay: "0.1s" }}>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <TrendingUp className="h-3.5 w-3.5 text-accent" />
                            This Month
                        </div>
                        <p className="mt-2 text-2xl font-bold tabular-nums text-card-foreground">
                            {thisMonthTotal.toLocaleString()}{" "}
                            <span className="text-sm font-normal text-muted-foreground">STX</span>
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            {thisMonthEarning?.reads} reads + {thisMonthEarning?.tips} tips
                        </p>
                    </div>

                    <div className="fade-in-up rounded-xl border border-border bg-card p-5" style={{ animationDelay: "0.15s" }}>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <BookOpen className="h-3.5 w-3.5 text-accent" />
                            Avg Per Article
                        </div>
                        <p className="mt-2 text-2xl font-bold tabular-nums text-card-foreground">
                            {avgPerArticle}{" "}
                            <span className="text-sm font-normal text-muted-foreground">STX</span>
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Across {author.articlesCount} articles
                        </p>
                    </div>

                    <div className="fade-in-up rounded-xl border border-border bg-card p-5" style={{ animationDelay: "0.2s" }}>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Heart className="h-3.5 w-3.5 text-accent" />
                            Total Tips
                        </div>
                        <p className="mt-2 text-2xl font-bold tabular-nums text-card-foreground">
                            {totalTips.toLocaleString()}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            {totalReads.toLocaleString()} total reads
                        </p>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="mt-8 grid gap-6 lg:grid-cols-3">
                    {/* Earnings Area Chart */}
                    <div className="fade-in-up rounded-xl border border-border bg-card p-6 lg:col-span-2" style={{ animationDelay: "0.25s" }}>
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="font-serif text-lg font-semibold text-card-foreground">
                                    Earnings Over Time
                                </h2>
                                <p className="text-xs text-muted-foreground">
                                    Monthly STX revenue breakdown
                                </p>
                            </div>
                            <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full bg-accent" />
                                    Reads
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="h-2 w-2 rounded-full" style={{ background: "hsl(173, 58%, 39%)" }} />
                                    Tips
                                </span>
                            </div>
                        </div>
                        <div className="mt-4 h-[240px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                                    <defs>
                                        <linearGradient id="readGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(24, 80%, 50%)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="hsl(24, 80%, 50%)" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="tipGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="hsl(173, 58%, 39%)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        tick={{ fontSize: 10, fill: "hsl(220, 10%, 55%)" }}
                                        axisLine={false}
                                        tickLine={false}
                                        width={40}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            background: "hsl(220, 18%, 9%)",
                                            border: "1px solid hsl(220, 16%, 16%)",
                                            borderRadius: "8px",
                                            fontSize: "12px",
                                            color: "hsl(220, 14%, 93%)",
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="reads"
                                        stackId="1"
                                        stroke="hsl(24, 80%, 50%)"
                                        fill="url(#readGrad)"
                                        strokeWidth={2}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="tips"
                                        stackId="1"
                                        stroke="hsl(173, 58%, 39%)"
                                        fill="url(#tipGrad)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="fade-in-up rounded-xl border border-border bg-card p-6" style={{ animationDelay: "0.3s" }}>
                        <h2 className="font-serif text-lg font-semibold text-card-foreground">
                            Revenue Split
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            Reads vs Tips (6 months)
                        </p>
                        <div className="mt-4 flex items-center justify-center">
                            <div className="h-[180px] w-[180px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={pieData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={80}
                                            paddingAngle={4}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {pieData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                background: "hsl(220, 18%, 9%)",
                                                border: "1px solid hsl(220, 16%, 16%)",
                                                borderRadius: "8px",
                                                fontSize: "12px",
                                                color: "hsl(220, 14%, 93%)",
                                            }}
                                            formatter={(value: number) => [`${value} STX`, ""]}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                            {pieData.map((d) => (
                                <div key={d.name} className="flex items-center justify-between text-sm">
                                    <span className="flex items-center gap-2 text-muted-foreground">
                                        <span
                                            className="h-2.5 w-2.5 rounded-full"
                                            style={{ background: d.color }}
                                        />
                                        {d.name}
                                    </span>
                                    <span className="font-semibold tabular-nums text-card-foreground">
                                        {d.value.toLocaleString()} STX
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <Separator className="my-10 bg-border" />

                {/* Published Articles Table */}
                <div className="fade-in-up" style={{ animationDelay: "0.35s" }}>
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                        Published Articles
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        All articles by {author.name}, sorted by earnings.
                    </p>

                    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
                        {/* Table Header */}
                        <div className="hidden grid-cols-12 gap-4 border-b border-border bg-secondary/50 px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground md:grid">
                            <div className="col-span-5">Article</div>
                            <div className="col-span-2 text-right">Price</div>
                            <div className="col-span-2 text-right">Reads</div>
                            <div className="col-span-1 text-right">Tips</div>
                            <div className="col-span-2 text-right">Est. Revenue</div>
                        </div>
                        {authorArticles
                            .sort((a, b) => b.reads * b.price - a.reads * a.price)
                            .map((article, i) => {
                                const estRevenue = (article.reads * article.price).toFixed(0)
                                return (
                                    <Link
                                        key={article.id}
                                        href={`/article/${article.id}`}
                                        className={`grid grid-cols-1 gap-2 px-5 py-4 transition-colors hover:bg-secondary/50 md:grid-cols-12 md:items-center md:gap-4 ${i < authorArticles.length - 1 ? "border-b border-border" : ""
                                            }`}
                                    >
                                        <div className="col-span-5">
                                            <p className="text-sm font-medium text-card-foreground line-clamp-1">
                                                {article.title}
                                            </p>
                                            <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground md:hidden">
                                                <span>{article.price} {article.currency}</span>
                                                <span>·</span>
                                                <span>{article.reads.toLocaleString()} reads</span>
                                            </div>
                                        </div>
                                        <div className="col-span-2 hidden text-right md:block">
                                            <span className="text-sm font-medium tabular-nums text-accent">
                                                {article.price} {article.currency}
                                            </span>
                                        </div>
                                        <div className="col-span-2 hidden text-right md:block">
                                            <span className="flex items-center justify-end gap-1 text-sm tabular-nums text-muted-foreground">
                                                <Eye className="h-3 w-3" />
                                                {article.reads.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="col-span-1 hidden text-right md:block">
                                            <span className="text-sm tabular-nums text-muted-foreground">
                                                {article.tips}
                                            </span>
                                        </div>
                                        <div className="col-span-2 hidden text-right md:block">
                                            <Badge
                                                variant="outline"
                                                className="border-accent/30 bg-transparent text-xs font-semibold tabular-nums text-accent"
                                            >
                                                ~{estRevenue} STX
                                            </Badge>
                                        </div>
                                    </Link>
                                )
                            })}
                    </div>
                </div>

                {/* Recent On-Chain Activity */}
                <div className="mt-12 fade-in-up" style={{ animationDelay: "0.4s" }}>
                    <h2 className="font-serif text-2xl font-bold text-foreground">
                        Recent On-Chain Activity
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Verified transactions from the x402 facilitator.
                    </p>

                    <div className="mt-6 rounded-xl border border-border bg-card">
                        {authorTxns.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <Coins className="h-8 w-8 text-muted-foreground/40" />
                                <p className="mt-3 text-sm text-muted-foreground">No transactions yet.</p>
                            </div>
                        ) : (
                            authorTxns.map((tx, i) => (
                                <div
                                    key={tx.id}
                                    className={`flex items-center justify-between px-5 py-3 ${i < authorTxns.length - 1 ? "border-b border-border" : ""
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${tx.type === "tip"
                                                ? "bg-chart-2/10"
                                                : "bg-accent/10"
                                                }`}
                                        >
                                            {tx.type === "tip" ? (
                                                <Heart className="h-4 w-4" style={{ color: "hsl(173, 58%, 39%)" }} />
                                            ) : (
                                                <Coins className="h-4 w-4 text-accent" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-card-foreground">
                                                {tx.type === "tip" ? "Tip received" : "Article read"}
                                            </p>
                                            <a
                                                href={`https://explorer.hiro.so/txid/${tx.txHash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-accent"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <code>{tx.txHash.slice(0, 10)}...{tx.txHash.slice(-6)}</code>
                                                <ExternalLink className="h-2.5 w-2.5" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold tabular-nums text-accent">
                                            +{tx.amount} {tx.currency}
                                        </p>
                                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                                            {tx.status}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* On-chain Transparency */}
                <div className="mt-8 rounded-xl border border-accent/20 bg-accent/5 p-6 fade-in-up" style={{ animationDelay: "0.45s" }}>
                    <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15">
                            <Coins className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                            <h3 className="font-serif text-lg font-semibold text-foreground">
                                On-Chain Transparency
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                All payments to {author.name} are settled on the Stacks blockchain with Bitcoin finality.
                                Every transaction is publicly verifiable.
                            </p>
                            <a
                                href={`https://explorer.hiro.so/address/${author.walletAddress}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                            >
                                View all transactions on Explorer
                                <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}
