"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, X, HelpCircle, Wallet } from "lucide-react"
import Link from "next/link"

interface WalletDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConnect: () => Promise<void>
  isConnecting: boolean
}

export function WalletDialog({
  open,
  onOpenChange,
  onConnect,
  isConnecting,
}: WalletDialogProps) {
  // Mock detection of installed wallets (in a real app, this would use window.StacksProvider)
  // For now, we assume if they click "Connect", we trigger the extension flow.

  const wallets = [
    {
      name: "Leather",
      url: "leather.io",
      icon: "L", // Placeholder for logo
      action: "Install",
      href: "https://leather.io/install-extension",
      primaryColor: "bg-black text-white",
    },
    {
      name: "Xverse Wallet",
      url: "xverse.app",
      icon: "X",
      action: "Install",
      href: "https://www.xverse.app/download",
      primaryColor: "bg-orange-500 text-white",
    },
    {
      name: "Asigna Multisig",
      url: "asigna.io",
      icon: "A",
      action: "Open",
      href: "https://asigna.io",
      primaryColor: "bg-purple-600 text-white",
    },
    {
      name: "Fordefi",
      url: "www.fordefi.com",
      icon: "F",
      action: "Install",
      href: "https://www.fordefi.com",
      primaryColor: "bg-blue-600 text-white",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md gap-0 border-border bg-card p-0 text-card-foreground">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-border p-6">
          <DialogTitle className="font-serif text-2xl font-semibold">
            Connect a wallet
          </DialogTitle>
          <div className="flex items-center gap-2">
            {/* Close button handled by Dialog primitive usually, but we can add custom if needed */}
          </div>
        </DialogHeader>

        <div className="p-6">
          <div className="flex flex-col gap-4">
            <Button
              size="lg"
              className="w-full gap-2 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 py-6 text-lg font-semibold shadow-md transition-all hover:scale-[1.02]"
              onClick={onConnect}
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="h-5 w-5" />
                  Connect Wallet
                </>
              )}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              This will open the Stacks wallet browser extension.
            </p>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or get a wallet
              </span>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">Supported Wallets</h3>
            <Link
              href="https://www.stacks.co/learn/wallets"
              target="_blank"
              className="flex items-center gap-1 text-xs text-accent hover:underline"
            >
              <HelpCircle className="h-3 w-3" />
              What is a wallet?
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {wallets.map((wallet) => (
              <div
                key={wallet.name}
                className="group flex items-center justify-between rounded-xl border border-border bg-muted/40 p-3 transition-all hover:bg-card hover:border-accent/30 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${wallet.primaryColor} font-bold shadow-sm`}>
                    {wallet.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{wallet.name}</span>
                    <span className="text-[10px] text-muted-foreground">{wallet.url}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-full px-3 text-xs font-medium hover:bg-accent hover:text-accent-foreground"
                  asChild
                >
                  <a href={wallet.href} target="_blank" rel="noopener noreferrer">
                    {wallet.action}
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function Loader2(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}

