"use client"

import { Newspaper } from "lucide-react"
import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <Newspaper className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-serif text-lg font-bold text-foreground">
            The Wire
          </span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Feed
          </Link>
          <Link
            href="/dashboard"
            className="transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground"
          >
            How it Works
          </Link>
          <a
            href="https://docs.x402stacks.xyz"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
          >
            x402 Docs
          </a>
        </nav>

        <p className="text-xs text-muted-foreground">
          Built on x402-stacks protocol
        </p>
      </div>
    </footer>
  )
}
