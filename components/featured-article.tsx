"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, Coins, Sparkles } from "lucide-react"
import type { Article } from "@/lib/data"

export function FeaturedArticle({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.id}`} className="group block">
      <article className="relative overflow-hidden rounded-3xl border border-border bg-card/50 shadow-sm transition-all hover:shadow-lg hover:border-accent/20">
        <div className="grid gap-0 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[450px]">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent md:bg-gradient-to-r" />
          </div>

          <div className="flex flex-col justify-center p-6 md:p-12">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="border-none bg-accent/10 text-xs font-medium text-accent"
              >
                {article.category}
              </Badge>
              <div className="relative overflow-hidden rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-xs font-semibold text-orange-600 dark:text-orange-400">
                <span className="relative z-10 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Featured
                </span>
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>
            </div>

            <h2 className="mt-6 font-serif text-3xl font-bold leading-tight text-foreground transition-colors group-hover:text-accent md:text-4xl lg:text-5xl">
              {article.title}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {article.excerpt}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-3">
                {article.author.avatar ? (
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-background border border-border bg-secondary"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground ring-2 ring-background">
                    {article.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {article.author.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-6 border-t border-border pt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.readTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {article.reads.toLocaleString()}
              </span>
              <span className="flex items-center gap-1.5 font-bold text-accent">
                <Coins className="h-4 w-4" />
                {article.price} {article.currency}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
