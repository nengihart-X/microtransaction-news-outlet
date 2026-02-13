"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useWallet } from "@/lib/wallet-context"
import { Heart, Loader2, Check } from "lucide-react"
import { toast } from "sonner"
import type { Article } from "@/lib/data"

const tipAmounts = [0.1, 0.5, 1.0, 5.0]

export function TipButton({ article }: { article: Article }) {
  const { user } = useWallet()
  const [isTipping, setIsTipping] = useState(false)
  const [tipped, setTipped] = useState(false)

  const handleTip = async (amount: number) => {
    if (!user) return
    setIsTipping(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsTipping(false)
    setTipped(true)
    toast.success(`Tipped ${amount} STX to ${article.author.name}`, {
      description: "Payment settled via x402-stacks protocol.",
    })
    setTimeout(() => setTipped(false), 3000)
  }

  if (!user) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`gap-1.5 border-border text-foreground ${
            tipped
              ? "border-accent/30 bg-accent/10 text-accent"
              : "hover:border-accent/30 hover:text-accent"
          }`}
        >
          {tipped ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Heart className="h-3.5 w-3.5" />
          )}
          {tipped ? "Tipped" : "Tip"}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-52 border-border bg-card p-3"
        align="end"
      >
        <p className="mb-2 text-xs font-medium text-card-foreground">
          Send a tip to {article.author.name.split(" ")[0]}
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {tipAmounts.map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              className="border-border text-xs text-foreground hover:border-accent/30 hover:bg-accent/10 hover:text-accent"
              disabled={isTipping}
              onClick={() => handleTip(amount)}
            >
              {isTipping ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                `${amount} STX`
              )}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
