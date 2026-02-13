"use client"

import { useState } from "react"
import Link from "next/link"
import { useWallet } from "@/lib/wallet-context"
import { SiteHeader } from "@/components/site-header"
import { FeaturedArticle } from "@/components/featured-article"
import { ArticleCard } from "@/components/article-card"
import { CategoryFilter } from "@/components/category-filter"
import { SiteFooter } from "@/components/site-footer"
import { articles } from "@/lib/data"
import { Newspaper, Zap, Shield, Users, ArrowRight, Coins } from "lucide-react"

export default function HomePage() {
  const { localArticles } = useWallet()
  const [category, setCategory] = useState("All")

  // Merge local articles with static articles
  const allArticles = [...localArticles, ...articles]
  const featured = allArticles.filter((a) => a.featured)
  const filtered =
    category === "All"
      ? allArticles.filter((a) => !a.featured)
      : allArticles.filter((a) => a.category === category && !a.featured)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="border-b border-border py-16 md:py-24 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-secondary/20" />
          <div className="container mx-auto max-w-6xl px-4 relative z-10">
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-accent">
                <Zap className="h-3.5 w-3.5" />
                <span>Powered by x402 Protocol</span>
                <span className="ml-2 px-2 py-0.5 bg-accent text-accent-foreground rounded-full text-xs">
                  BETA
                </span>
              </div>

              <h1 className="mb-6 font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
                Pay for journalism, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/70">
                  not subscriptions.
                </span>
              </h1>

              <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl mb-8">
                Read individual articles for micro-amounts of STX, sBTC, or USDCx.
                Journalists get paid directly. No middlemen. No monthly fees.
              </p>

              {/* Value Proposition Cards */}
              <div className="grid gap-4 md:grid-cols-3 mb-10">
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-bold text-sm">$</span>
                    </div>
                    <span className="font-semibold text-foreground">Pay-per-article</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Only $0.03-0.06 per article vs $5/month subscriptions
                  </p>
                </div>
                
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">0%</span>
                    </div>
                    <span className="font-semibold text-foreground">No fees</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    100% goes directly to journalists, no platform cuts
                  </p>
                </div>
                
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-sm">⚡</span>
                    </div>
                    <span className="font-semibold text-foreground">Instant access</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Pay once, read forever. Bitcoin finality in ~30 seconds
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <p className="font-serif text-3xl font-bold text-foreground">
                    {articles.reduce((s, a) => s + a.reads, 0).toLocaleString()}
                  </p>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Articles read</p>
                </div>
                <div className="h-auto w-px bg-border my-1"></div>
                <div>
                  <p className="font-serif text-3xl font-bold text-foreground">0%</p>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Platform fees</p>
                </div>
                <div className="h-auto w-px bg-border my-1"></div>
                <div>
                  <p className="font-serif text-3xl font-bold text-foreground">{articles.length}</p>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Independent writers</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="#latest"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground rounded-lg px-6 py-3 font-semibold hover:bg-accent/90 transition-colors"
                >
                  <Newspaper className="h-4 w-4" />
                  Start Reading
                </Link>
                <Link
                  href="/publish"
                  className="inline-flex items-center gap-2 border border-border rounded-lg px-6 py-3 font-semibold hover:bg-accent hover:text-accent-foreground transition-all"
                >
                  Start Writing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="border-b border-border bg-muted/30 py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-8 font-serif text-2xl font-bold text-foreground">
              Featured Story
            </h2>
            {featured.map((article) => (
              <FeaturedArticle key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* All Articles */}
        <section id="latest" className="container mx-auto max-w-6xl px-4 py-16">
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground">
                Latest Stories
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Discover premium journalism from independent writers
              </p>
            </div>
            <CategoryFilter selected={category} onSelect={setCategory} />
          </div>

          {/* Stats Bar */}
          <div className="mb-8 rounded-xl border border-border bg-card p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm text-muted-foreground">
                    {filtered.length} articles available
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-accent" />
                  <span className="text-sm text-muted-foreground">
                    Prices from {Math.min(...filtered.map(a => a.price))} STX
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Sort by: Latest</span>
                <span>Filter: {category}</span>
              </div>
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <div key={article.id}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center border rounded-xl border-dashed border-border bg-muted/20">
              <Newspaper className="h-12 w-12 text-muted-foreground/40 mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No articles found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try selecting a different category or check back later.
              </p>
              <button 
                onClick={() => setCategory("All")}
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:bg-accent/90 transition-colors"
              >
                Show All Articles
              </button>
            </div>
          )}

          {/* Load More Button */}
          {filtered.length > 6 && (
            <div className="mt-12 text-center">
              <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200">
                Load More Articles
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
