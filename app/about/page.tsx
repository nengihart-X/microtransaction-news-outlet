"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import {
  Wallet,
  Newspaper,
  Coins,
  Shield,
  Zap,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const steps = [
  {
    number: "01",
    title: "Connect Your Wallet",
    description:
      "No email, no password. Connect a Stacks-compatible wallet like Leather or Xverse. Your wallet is your identity.",
    icon: Wallet,
  },
  {
    number: "02",
    title: "Browse & Discover",
    description:
      "Explore articles from independent journalists. Each article shows its price upfront. Most cost less than a cup of coffee.",
    icon: Newspaper,
  },
  {
    number: "03",
    title: "Pay to Read",
    description:
      "When you find an article worth reading, pay the microtransaction via the x402 protocol. Your STX, sBTC, or USDCx goes directly to the journalist.",
    icon: Coins,
  },
  {
    number: "04",
    title: "Instant Access",
    description:
      "The x402-stacks facilitator verifies and settles your payment on the Stacks blockchain. Access is granted instantly. Bitcoin finality in ~30 seconds.",
    icon: Zap,
  },
]

const benefits = [
  {
    title: "No Subscriptions",
    description:
      "Pay only for what you read. No $10/month for one article. No bundled content you never touch.",
  },
  {
    title: "Direct Compensation",
    description:
      "100% of your payment goes to the journalist. No ad networks, no content aggregators, no middlemen.",
  },
  {
    title: "Self-Custodial",
    description:
      "Your funds stay in your wallet until you choose to spend them. We never hold your money or keys.",
  },
  {
    title: "On-Chain Transparency",
    description:
      "Every payment is recorded on the Stacks blockchain. Verify any transaction on the public explorer.",
  },
  {
    title: "Bitcoin Security",
    description:
      "Stacks settles on Bitcoin, inheriting the security of the most trusted blockchain network.",
  },
  {
    title: "Open Protocol",
    description:
      "Built on the x402 open standard. Any publisher can integrate. No vendor lock-in.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="border-b border-border bg-secondary/50">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center md:py-24">
            <div className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
              <Shield className="h-3 w-3" />
              x402-stacks Protocol
            </div>
            <h1 className="mt-6 text-balance font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl">
              How The Wire Works
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              The Wire uses the x402 payment protocol on Stacks to enable
              instant microtransactions for journalism. No accounts, no
              subscriptions, no ads.
            </p>
          </div>
        </section>

        {/* Medium Comparison */}
        <section className="mx-auto max-w-4xl px-4 py-16">
          <div className="text-center">
            <div className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <Newspaper className="h-3 w-3" />
              Crypto-Native Publishing
            </div>
            <h2 className="mt-6 font-serif text-2xl font-bold text-foreground md:text-3xl">
              Medium + Bitcoin = The Wire
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              We're building the crypto version of Medium - but better. Imagine paying only for articles you actually read, 
              with 100% going directly to journalists. No subscriptions, no ads, no middlemen.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <span className="text-lg">📰</span> Traditional Medium
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">$5/month subscription</p>
                    <p className="text-xs text-muted-foreground">Pay for content you never read</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">30-50% platform fees</p>
                    <p className="text-xs text-muted-foreground">Medium takes huge cut from writers</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">Centralized control</p>
                    <p className="text-xs text-muted-foreground">Corporate censorship possible</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">✗</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">Monthly payouts</p>
                    <p className="text-xs text-muted-foreground">Writers wait weeks for payment</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-accent/20 bg-accent/5 p-6">
              <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                <span className="text-lg">⚡</span> The Wire (x402-powered)
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">$0.03-0.06 per article</p>
                    <p className="text-xs text-muted-foreground">Pay only for what you read</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">0% platform fees</p>
                    <p className="text-xs text-muted-foreground">100% goes directly to journalists</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">Decentralized</p>
                    <p className="text-xs text-muted-foreground">Censorship-resistant on Stacks</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">Instant settlement</p>
                    <p className="text-xs text-muted-foreground">Bitcoin finality in ~30 seconds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">The result:</span> Writers earn more, readers pay less, 
              and journalism becomes sustainable through direct reader-to-writer microtransactions.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Four Steps. Zero Friction.
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/20"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/15">
                    <step.icon className="h-5 w-5 text-accent" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Step {step.number}
                  </span>
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-card-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* x402 Protocol Explainer */}
        <section className="border-y border-border bg-secondary/50">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <h2 className="font-serif text-2xl font-bold text-foreground">
              The x402 Protocol
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              x402 activates the dormant HTTP 402 &quot;Payment Required&quot;
              status code. When you request a paid article, our server responds
              with payment instructions. Your wallet signs and submits the
              transaction. The x402 facilitator verifies and settles the
              payment. Access is granted.
            </p>

            <div className="mt-8 rounded-xl border border-border bg-card p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <code className="flex h-8 items-center rounded bg-secondary px-2.5 font-mono text-xs text-foreground">
                    GET /article/1
                  </code>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <code className="flex h-8 items-center rounded bg-accent/10 px-2.5 font-mono text-xs text-accent">
                    402 Payment Required
                  </code>
                </div>
                <div className="flex items-center gap-3">
                  <code className="flex h-8 items-center rounded bg-secondary px-2.5 font-mono text-xs text-foreground">
                    Payment-Signature: base64...
                  </code>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <code className="flex h-8 items-center rounded bg-accent/10 px-2.5 font-mono text-xs text-accent">
                    200 OK + Content
                  </code>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6">
                <div className="text-center">
                  <p className="text-lg font-bold text-card-foreground">
                    STX
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Native Stacks
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-card-foreground">
                    sBTC
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Bitcoin-Backed
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-card-foreground">
                    USDCx
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Stable Value
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Why It Matters
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <h3 className="text-sm font-semibold text-card-foreground">
                    {b.title}
                  </h3>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-border bg-secondary/50">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
              Start reading. Start paying fairly.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Connect your wallet and support independent journalism with
              microtransactions.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link href="/">
                  <Newspaper className="h-4 w-4" />
                  Browse Articles
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 border-border text-foreground"
              >
                <a
                  href="https://docs.x402stacks.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  x402 Docs
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
