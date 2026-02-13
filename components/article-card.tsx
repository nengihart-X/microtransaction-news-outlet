"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, Coins } from "lucide-react"
import type { Article } from "@/lib/data"

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.id}`} className="group block h-full">
      <article className="flex h-full flex-col">
        <div className="relative aspect-[3/2] overflow-hidden bg-muted">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-1 flex-col py-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-accent">
            <span>{article.category}</span>
            <span>•</span>
            <span>{new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric"
            })}</span>
          </div>

          <h3 className="mb-2 font-serif text-xl font-bold leading-tight text-foreground group-hover:underline decoration-2 underline-offset-4">
            {article.title}
          </h3>

          <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {article.author.avatar && (
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="h-6 w-6 rounded-full object-cover bg-secondary"
                />
              )}
              <span className="text-xs font-medium text-muted-foreground">
                {article.author.name}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readTime} min
              </span>
              <span className="flex items-center gap-1 font-semibold text-foreground">
                <Coins className="h-3 w-3 text-accent" />
                {article.price} {article.currency}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
