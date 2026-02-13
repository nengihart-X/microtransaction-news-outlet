"use client"

import { ExternalLink, Coins, Check, Clock } from "lucide-react"
import type { Article } from "@/lib/data"

interface PaymentReceiptProps {
    article: Article
    txHash: string
    amount: number
    currency: string
}

export function PaymentReceipt({
    article,
    txHash,
    amount,
    currency,
}: PaymentReceiptProps) {
    return (
        <div className="fade-in-up mt-6 overflow-hidden rounded-xl border border-accent/20 bg-gradient-to-br from-accent/5 via-card to-card">
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-accent/10 bg-accent/5 px-5 py-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent">
                    <Check className="h-3.5 w-3.5 text-accent-foreground" />
                </div>
                <span className="text-sm font-semibold text-accent">
                    Payment Verified
                </span>
                <span className="ml-auto text-[10px] uppercase tracking-widest text-muted-foreground">
                    x402 Receipt
                </span>
            </div>

            {/* Body */}
            <div className="p-5">
                <div className="grid grid-cols-2 gap-4">
                    {/* Amount */}
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Amount Paid
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-lg font-bold tabular-nums text-foreground">
                            <Coins className="h-4 w-4 text-accent" />
                            {amount} {currency}
                        </p>
                    </div>

                    {/* Settlement */}
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Settlement
                        </p>
                        <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-foreground">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            ~30s · Bitcoin finality
                        </p>
                    </div>

                    {/* Recipient */}
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Recipient
                        </p>
                        <p className="mt-1 text-sm font-medium text-foreground">
                            {article.author.name}
                        </p>
                        <code className="text-[10px] text-muted-foreground">
                            {article.author.walletAddress.slice(0, 10)}...
                            {article.author.walletAddress.slice(-6)}
                        </code>
                    </div>

                    {/* Transaction Hash */}
                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            Transaction Hash
                        </p>
                        <a
                            href={`https://explorer.hiro.so/txid/${txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                        >
                            <code className="text-xs">
                                {txHash.slice(0, 10)}...{txHash.slice(-6)}
                            </code>
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-center gap-4 rounded-lg bg-secondary/50 px-4 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span>x402 Protocol</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                    <span>Stacks L2</span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground" />
                    <span>Bitcoin Settled</span>
                </div>
            </div>
        </div>
    )
}
