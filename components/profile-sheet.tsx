"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useWallet } from "@/lib/wallet-context"
import { articles } from "@/lib/data"
import {
  Copy,
  LogOut,
  Check,
  BookOpen,
  Coins,
  ExternalLink,
  Clock,
  PenTool,
  LayoutDashboard,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface ProfileSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileSheet({ open, onOpenChange }: ProfileSheetProps) {
  const { user, disconnect, updateProfile, paymentHistory } = useWallet()
  const [copied, setCopied] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [nameValue, setNameValue] = useState("")

  if (!user) return null

  const copyAddress = () => {
    navigator.clipboard.writeText(user.address)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const saveName = () => {
    if (nameValue.trim()) {
      updateProfile({ displayName: nameValue.trim() })
    }
    setEditingName(false)
  }

  const getTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime()
    const mins = Math.floor(diff / 60000)
    if (mins < 1) return "just now"
    if (mins < 60) return `${mins}m ago`
    const hrs = Math.floor(mins / 60)
    if (hrs < 24) return `${hrs}h ago`
    return `${Math.floor(hrs / 24)}d ago`
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="border-border bg-card text-card-foreground overflow-y-auto sm:max-w-[400px]">
        <SheetHeader>
          <SheetTitle className="font-serif text-card-foreground">
            Your Profile
          </SheetTitle>
          <SheetDescription className="text-muted-foreground">
            Manage your wallet identity and view your reading activity.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-6">
          {/* Avatar & Name */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-xl font-bold text-accent-foreground">
              {user.displayName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    className="h-8 border-border bg-secondary text-foreground"
                    placeholder="Display name"
                    onKeyDown={(e) => e.key === "Enter" && saveName()}
                    autoFocus
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={saveName}
                    className="text-foreground"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setNameValue(user.displayName)
                    setEditingName(true)
                  }}
                  className="text-left"
                >
                  <p className="text-sm font-semibold text-foreground">
                    {user.displayName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Click to edit name
                  </p>
                </button>
              )}
            </div>
          </div>

          {/* Wallet Address */}
          <div>
            <Label className="text-xs text-muted-foreground">
              Wallet Address
            </Label>
            <button
              onClick={copyAddress}
              className="mt-1 flex w-full items-center justify-between rounded-lg border border-border bg-secondary px-3 py-2 transition-colors hover:bg-secondary/80"
            >
              <code className="text-xs text-foreground">
                {user.address.slice(0, 12)}...{user.address.slice(-8)}
              </code>
              {copied ? (
                <Check className="h-3.5 w-3.5 text-accent" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </button>
          </div>

          {/* Publisher CTA / Dashboard Link */}
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
            {user.isPublisher ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                  <Check className="h-4 w-4" />
                  Publisher Account Active
                </div>
                <Button
                  className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                  asChild
                  onClick={() => onOpenChange(false)}
                >
                  <Link href="/publish/new">
                    <PenTool className="h-4 w-4" />
                    Write New Article
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 border-accent/20 text-accent hover:bg-accent/10 hover:text-accent"
                  asChild
                  onClick={() => onOpenChange(false)}
                >
                  <Link href="/dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    Publisher Dashboard
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <h4 className="font-semibold text-foreground">Become a Publisher</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Start earning from your writing directly.
                </p>
                <Button
                  size="sm"
                  className="mt-3 w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  asChild
                  onClick={() => onOpenChange(false)}
                >
                  <Link href="/publish">
                    Get Started
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <Separator className="bg-border" />

          {/* Balances */}
          <div>
            <Label className="text-xs text-muted-foreground">Balances</Label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <div className="rounded-lg border border-border bg-secondary p-3 text-center">
                <p className="text-lg font-semibold tabular-nums text-foreground">
                  {user.balance.stx.toLocaleString(undefined, {
                    maximumFractionDigits: 1,
                  })}
                </p>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  STX
                </p>
              </div>
              <div className="rounded-lg border border-border bg-secondary p-3 text-center">
                <p className="text-lg font-semibold tabular-nums text-foreground">
                  {user.balance.sbtc.toFixed(4)}
                </p>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  sBTC
                </p>
              </div>
              <div className="rounded-lg border border-border bg-secondary p-3 text-center">
                <p className="text-lg font-semibold tabular-nums text-foreground">
                  {user.balance.usdcx.toFixed(1)}
                </p>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  USDCx
                </p>
              </div>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Activity Stats */}
          <div>
            <Label className="text-xs text-muted-foreground">
              Reading Activity
            </Label>
            <div className="mt-2 flex flex-col gap-2">
              <div className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    Articles Read
                  </span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {user.articlesRead}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-secondary px-3 py-2">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Total Spent</span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {user.totalSpent.toFixed(2)} STX
                </span>
              </div>
            </div>
          </div>

          {/* Payment History */}
          {paymentHistory.length > 0 && (
            <>
              <Separator className="bg-border" />
              <div>
                <Label className="text-xs text-muted-foreground">
                  Recent Payments
                </Label>
                <div className="mt-2 flex flex-col gap-1.5">
                  {paymentHistory.slice(0, 5).map((payment) => {
                    const article = articles.find((a) => a.id === payment.articleId)
                    return (
                      <div
                        key={payment.txHash}
                        className="rounded-lg border border-border bg-secondary px-3 py-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-foreground line-clamp-1 max-w-[60%]">
                            {article?.title || "Unknown Article"}
                          </p>
                          <span className="text-sm font-semibold tabular-nums text-accent">
                            {payment.amount} {payment.currency}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <a
                            href={`https://explorer.hiro.so/txid/${payment.txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-accent"
                          >
                            <code>
                              {payment.txHash.slice(0, 8)}...{payment.txHash.slice(-4)}
                            </code>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                          <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Clock className="h-2.5 w-2.5" />
                            {getTimeAgo(payment.timestamp)}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </>
          )}

          <Separator className="bg-border" />

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="justify-start gap-2 border-border text-foreground hover:bg-secondary"
              asChild
            >
              <a
                href={`https://explorer.hiro.so/address/${user.address}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
                View on Explorer
              </a>
            </Button>
            <Button
              variant="outline"
              className="justify-start gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => {
                disconnect()
                onOpenChange(false)
              }}
            >
              <LogOut className="h-4 w-4" />
              Disconnect Wallet
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
