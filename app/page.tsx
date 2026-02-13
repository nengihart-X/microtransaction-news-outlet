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
import { Newspaper, Zap, Shield, Users, ArrowRight } from "lucide-react"

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
        <section className="border-b border-border py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent">
                <Zap className="h-3.5 w-3.5" />
                <span>Powered by x402 Protocol</span>
              </div>

              <h1 className="mb-6 font-serif text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl">
                Pay for journalism, <br />
                <span className="text-secondary-foreground">not subscriptions.</span>
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Read individual articles for micro-amounts of STX, sBTC, or USDCx.
                Journalists get paid directly. No middlemen. No monthly fees.
              </p>

              <div className="mt-10 flex flex-wrap gap-8">
                <div>
                  <p className="font-serif text-3xl font-bold text-foreground">
                    {articles.reduce((s, a) => s + a.reads, 0).toLocaleString()}
                  </p>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Reads served</p>
                </div>
                <div className="h-auto w-px bg-border my-1"></div>
                <div>
                  <p className="font-serif text-3xl font-bold text-foreground">0%</p>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Platform Fees</p>
                </div>
                <div className="h-auto w-px bg-border my-1"></div>
                <div>
                  <p className="font-serif text-3xl font-bold text-foreground">4</p>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Independent Writers</p>
                </div>
              </div>

              <div className="mt-10">
                <Link
                  href="/publish"
                  className="inline-flex items-center gap-2 border-b-2 border-accent pb-0.5 text-sm font-bold text-foreground hover:text-accent transition-colors"
                >
                  Start writing on The Wire <ArrowRight className="h-4 w-4" />
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
        <section className="container mx-auto max-w-6xl px-4 py-16">
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-serif text-3xl font-bold text-foreground">
              Latest Stories
            </h2>
            <CategoryFilter selected={category} onSelect={setCategory} />
          </div>

          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article) => (
              <div key={article.id}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center border rounded-lg border-dashed">
              <Newspaper className="h-10 w-10 text-muted-foreground/40 mb-4" />
              <p className="text-lg font-medium text-foreground">
                No articles found
              </p>
              <p className="text-muted-foreground">
                Try selecting a different category.
              </p>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
