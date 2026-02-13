"use client"

import { use, useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ArticlePaywall } from "@/components/article-paywall"
import { PaymentReceipt } from "@/components/payment-receipt"
import { TipButton } from "@/components/tip-button"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { articles } from "@/lib/data"
import { useWallet } from "@/lib/wallet-context"
import {
  ArrowLeft,
  Clock,
  Eye,
  Coins,
  Share2,
  Bookmark,
  ExternalLink,
} from "lucide-react"

export default function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { paidArticles } = useWallet()
  const [unlocked, setUnlocked] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)

  const article = articles.find((a) => a.id === id)
  if (!article) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Article not found
          </h1>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to feed
          </Link>
        </div>
      </div>
    )
  }

  const isAccessible = paidArticles.has(article.id) || unlocked

  const paragraphs = article.content.split("\n\n")
  
  // Insert content images at specified positions
  const contentWithImages: Array<{ type: 'paragraph' | 'image'; content?: string; image?: { src: string; alt: string; caption?: string } }> = []
  const contentImages = article.contentImages || []
  
  paragraphs.forEach((paragraph, index) => {
    contentWithImages.push({ type: 'paragraph', content: paragraph })
    
    // Check if there's an image that should be inserted after this paragraph
    const imageToInsert = contentImages.find(img => img.position === index + 1)
    if (imageToInsert) {
      contentWithImages.push({
        type: 'image',
        image: {
          src: imageToInsert.src,
          alt: imageToInsert.alt,
          caption: imageToInsert.caption,
        },
      })
    }
  })

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Article Header */}
        <div className="relative">
          <div className="relative h-[300px] overflow-hidden md:h-[450px]">
            <img
              src={article.image}
              alt={article.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto max-w-3xl px-4 pb-8">
              <Link
                href="/"
                className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </Link>

              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="border-none bg-accent/15 text-xs font-medium text-accent"
                >
                  {article.category}
                </Badge>
                <span className="flex items-center gap-1 text-xs font-medium text-accent">
                  <Coins className="h-3 w-3" />
                  {article.price} {article.currency}
                </span>
              </div>

              <h1 className="mt-3 text-balance font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
                {article.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article Meta */}
        <div className="mx-auto max-w-3xl px-4 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                href={`/journalist/${article.author.id}`}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-bold text-foreground transition-colors hover:bg-accent/15 hover:text-accent"
              >
                {article.author.name.charAt(0)}
              </Link>
              <div>
                <Link
                  href={`/journalist/${article.author.id}`}
                  className="text-sm font-semibold text-foreground hover:text-accent transition-colors"
                >
                  {article.author.name}
                </Link>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min read
                  </span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {article.reads.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Bookmark className="h-4 w-4" />
                <span className="sr-only">Bookmark</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground"
              >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>

          <Separator className="mt-6 bg-border" />
        </div>

        {/* Article Content */}
        <article className="mx-auto max-w-3xl px-4 py-8">
          {/* Show excerpt / first paragraph always */}
          <p className="text-lg font-medium leading-relaxed text-foreground">
            {article.excerpt}
          </p>

          <div className="mt-6">
            {/* Show first content image as preview even when locked */}
            {!isAccessible && contentImages.length > 0 && (
              <figure className="my-8">
                <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
                  <img
                    src={contentImages[0].src}
                    alt={contentImages[0].alt}
                    className="h-full w-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60">
                    <p className="text-sm font-medium text-foreground">Unlock to view full image</p>
                  </div>
                </div>
                {contentImages[0].caption && (
                  <figcaption className="mt-3 text-center text-sm italic text-muted-foreground">
                    {contentImages[0].caption}
                  </figcaption>
                )}
              </figure>
            )}
            
            {isAccessible ? (
              <>
                {/* Full article content */}
                <div className="prose-custom fade-in-up">
                  {contentWithImages.map((item, i) => {
                    if (item.type === 'paragraph') {
                      return (
                        <p
                          key={`para-${i}`}
                          className="mb-5 font-serif text-base leading-[1.8] text-foreground/90 md:text-[17px]"
                        >
                          {item.content}
                        </p>
                      )
                    } else if (item.type === 'image' && item.image) {
                      return (
                        <figure key={`img-${i}`} className="my-8">
                          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted">
                            <img
                              src={item.image.src}
                              alt={item.image.alt}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          {item.image.caption && (
                            <figcaption className="mt-3 text-center text-sm italic text-muted-foreground">
                              {item.image.caption}
                            </figcaption>
                          )}
                        </figure>
                      )
                    }
                    return null
                  })}
                </div>

                {/* Payment Receipt */}
                {txHash && (
                  <PaymentReceipt
                    article={article}
                    txHash={txHash}
                    amount={article.price}
                    currency={article.currency}
                  />
                )}

                <Separator className="my-8 bg-border" />

                {/* Author Card & Tip */}
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/journalist/${article.author.id}`}
                        className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-lg font-bold text-accent transition-colors hover:bg-accent/25"
                      >
                        {article.author.name.charAt(0)}
                      </Link>
                      <div>
                        <Link
                          href={`/journalist/${article.author.id}`}
                          className="font-semibold text-card-foreground hover:text-accent transition-colors"
                        >
                          {article.author.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {article.author.articlesCount} articles
                        </p>
                      </div>
                    </div>
                    <TipButton article={article} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {article.author.bio}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                    <span>Wallet:</span>
                    <code className="text-[10px]">
                      {article.author.walletAddress.slice(0, 8)}...
                      {article.author.walletAddress.slice(-6)}
                    </code>
                    <a
                      href={`https://explorer.hiro.so/address/${article.author.walletAddress}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-accent hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* Transaction Proof (if no receipt already shown) */}
                {!txHash && (
                  <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 p-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-accent">
                      <Coins className="h-3.5 w-3.5" />
                      Payment verified via x402-stacks protocol
                    </div>
                    <p className="mt-1 text-[10px] text-muted-foreground">
                      {article.price} {article.currency} sent to{" "}
                      {article.author.walletAddress.slice(0, 12)}... on Stacks
                      mainnet. Transaction settled in ~30 seconds with Bitcoin
                      finality.
                    </p>
                  </div>
                )}
              </>
            ) : (
              <ArticlePaywall
                article={article}
                onUnlocked={(hash) => {
                  setTxHash(hash)
                  setUnlocked(true)
                }}
              />
            )}
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  )
}
