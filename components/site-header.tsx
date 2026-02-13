"use client"

import Link from "next/link"
import { useWallet } from "@/lib/wallet-context"
import { Button } from "@/components/ui/button"
import { WalletDialog } from "@/components/wallet-dialog"
import { ProfileSheet } from "@/components/profile-sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import { Wallet, Newspaper } from "lucide-react"

export function SiteHeader() {
  const { user, isConnecting, connect } = useWallet()
  const [walletOpen, setWalletOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Newspaper className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-foreground">
            The Wire
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Feed
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/journalists"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Writers
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How it Works
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <button
              onClick={() => setProfileOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                {user.displayName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:inline">
                {user.address.slice(0, 4)}...{user.address.slice(-4)}
              </span>
            </button>
          ) : (
            <Button
              onClick={connect}
              disabled={isConnecting}
              size="sm"
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isConnecting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Wallet className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </span>
            </Button>
          )}
        </div>
      </div>

      <ProfileSheet open={profileOpen} onOpenChange={setProfileOpen} />
    </header>
  )
}
