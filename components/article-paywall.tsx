"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/lib/wallet-context"
import { WalletDialog } from "@/components/wallet-dialog"
import {
  Loader2,
  Lock,
  Coins,
  Check,
  Wallet,
  ArrowRight,
} from "lucide-react"
import type { Article } from "@/lib/data"

interface ArticlePaywallProps {
  article: Article
  onUnlocked: (txHash: string) => void
}

export function ArticlePaywall({ article, onUnlocked }: ArticlePaywallProps) {
  const { user, isConnecting, connect, payForArticle, paidArticles } =
    useWallet()
  const [isPaying, setIsPaying] = useState(false)
  const [paymentStep, setPaymentStep] = useState<
    "idle" | "requirements" | "signing" | "verifying" | "settling" | "done"
  >("idle")

  const isUnlocked = paidArticles.has(article.id)

  const handlePay = async () => {
    if (!user) return
    setIsPaying(true)

    // x402 payment flow
    setPaymentStep("requirements")
    await new Promise((r) => setTimeout(r, 500))

    setPaymentStep("signing")
    await new Promise((r) => setTimeout(r, 800))

    setPaymentStep("verifying")
    await new Promise((r) => setTimeout(r, 700))

    setPaymentStep("settling")
    const result = await payForArticle(
      article.id,
      article.price,
      article.currency
    )

    if (result.success && result.txHash) {
      setPaymentStep("done")
      await new Promise((r) => setTimeout(r, 600))
      onUnlocked(result.txHash)
    }

    setIsPaying(false)
    setPaymentStep("idle")
  }

  if (isUnlocked) return null

  const stepLabels = {
    idle: "",
    requirements: "Getting requirements...",
    signing: "Signing payment...",
    verifying: "Verifying payment...",
    settling: "Settling on-chain...",
    done: "Payment complete",
  }

  return (
    <div className="relative mt-8">
      {/* Blurred content preview */}
      <div className="pointer-events-none select-none opacity-20 filter blur-[2px]" aria-hidden>
        <p className="font-serif text-lg leading-relaxed">
          {article.content.slice(0, 400)}...
        </p>
        <p className="font-serif text-lg leading-relaxed mt-4">
          {article.content.slice(200, 500)}...
        </p>
      </div>

      {/* Paywall overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-sm bg-card border border-border p-6 shadow-sm text-center">
          <div className="flex justify-center mb-4">
            <Lock className="h-6 w-6 text-foreground" />
          </div>

          <h3 className="font-serif text-xl font-bold text-foreground mb-2">
            Continue reading
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Support {article.author.name} directly with a micro-payment.
          </p>

          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-2xl font-bold text-foreground">
              {article.price} {article.currency}
            </span>
          </div>

          {isPaying ? (
            <div className="flex items-center justify-center gap-3 py-2 text-sm font-medium text-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{stepLabels[paymentStep]}</span>
            </div>
          ) : user ? (
            <Button
              onClick={handlePay}
              className="w-full rounded-none bg-foreground text-background hover:bg-foreground/90"
              size="lg"
            >
              Pay to Unlock
            </Button>
          ) : (
            <Button
              onClick={connect}
              disabled={isConnecting}
              className="w-full rounded-none bg-foreground text-background hover:bg-foreground/90"
              size="lg"
            >
              {isConnecting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wallet className="mr-2 h-4 w-4" />
              )}
              Connect Wallet
            </Button>
          )}

          <div className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground">
            Powered by x402 Protocol • Instant Settlement
          </div>
        </div>
      </div>
    </div>
  )
}
