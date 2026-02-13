"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, Coins, Star, TrendingUp, Lock } from "lucide-react"
import type { Article } from "@/lib/data"

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/article/${article.id}`} className="group block h-full">
      <article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
        
        {/* Premium Badge */}
        {article.price > 0 && (
          <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-accent/90 px-2.5 py-1 text-xs font-bold text-accent-foreground backdrop-blur-sm">
            <Coins className="h-3 w-3" />
            Premium
          </div>
        )}

        {/* Trending Badge for popular articles */}
        {article.reads > 500 && (
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-orange-500/90 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
            <TrendingUp className="h-3 w-3" />
            Trending
          </div>
        )}

        {/* Image Container */}
        <div className="relative aspect-[3/2] overflow-hidden bg-muted">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        <div className="flex flex-1 flex-col p-5">
          {/* Category and Date */}
          <div className="mb-3 flex items-center gap-2 text-xs">
            <Badge variant="secondary" className="border-none bg-accent/10 text-accent hover:bg-accent/20">
              {article.category}
            </Badge>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric"
              })}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-3 font-serif text-xl font-bold leading-tight text-foreground group-hover:text-accent transition-colors line-clamp-2">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground flex-grow">
            {article.excerpt}
          </p>

          {/* Author and Metrics */}
          <div className="flex items-center justify-between border-t border-border/50 pt-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                {article.author.avatar ? (
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="h-7 w-7 rounded-full object-cover ring-2 ring-background"
                  />
                ) : (
                  <div className="h-7 w-7 rounded-full bg-accent/15 flex items-center justify-center">
                    <span className="text-xs font-bold text-accent">
                      {article.author.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-foreground">
                  {article.author.name}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {article.author.articlesCount} articles
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Read Time */}
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {article.readTime}m
              </span>
              
              {/* Price - More prominent */}
              <div className="flex items-center gap-1 rounded-md bg-accent/10 px-2 py-1">
                <Coins className="h-3 w-3 text-accent" />
                <span className="text-xs font-bold text-accent">
                  {article.price} {article.currency}
                </span>
              </div>
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {article.reads.toLocaleString()} reads
            </span>
            
            {/* Rating indicator */}
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-2.5 w-2.5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted'}`} 
                />
              ))}
              <span className="ml-1">4.2</span>
            </div>
          </div>
        </div>

        {/* Hover overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      </article>
    </Link>
  )
}
