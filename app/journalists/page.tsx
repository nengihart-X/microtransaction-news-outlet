import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { authors } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, ExternalLink, ArrowRight } from "lucide-react"

export default function JournalistsPage() {
    return (
        <div className="min-h-screen bg-background">
            <SiteHeader />

            <main className="mx-auto max-w-6xl px-4 py-12">
                <div className="mb-10 text-center">
                    <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
                        Our Writers
                    </h1>
                    <p className="mt-3 text-muted-foreground">
                        Meet the voices behind The Wire. Independent, verified, and community-supported.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                    {authors.map((author, index) => (
                        <div
                            key={author.id}
                            className="fade-in-up flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-accent/50"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="flex flex-1 flex-col gap-6 p-6 sm:flex-row sm:items-start">
                                {/* Avatar */}
                                <div className="shrink-0">
                                    <img
                                        src={author.avatar}
                                        alt={author.name}
                                        className="h-20 w-20 rounded-xl object-cover border border-border bg-secondary"
                                    />
                                </div>

                                <div className="flex flex-1 flex-col">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h2 className="font-serif text-xl font-bold text-card-foreground">
                                                {author.name}
                                            </h2>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                <Badge
                                                    variant="outline"
                                                    className="border-border text-xs text-muted-foreground"
                                                >
                                                    <BookOpen className="mr-1 h-3 w-3" />
                                                    {author.articlesCount} articles
                                                </Badge>
                                                <Badge
                                                    variant="outline"
                                                    className="border-border text-xs text-muted-foreground"
                                                >
                                                    <Users className="mr-1 h-3 w-3" />
                                                    {author.followers.toLocaleString()} followers
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                                        {author.bio}
                                    </p>

                                    <div className="mt-6 flex items-center justify-between">
                                        <a
                                            href={`https://explorer.hiro.so/address/${author.walletAddress}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent hover:underline"
                                        >
                                            <code className="text-[10px]">
                                                {author.walletAddress.slice(0, 6)}...{author.walletAddress.slice(-4)}
                                            </code>
                                            <ExternalLink className="h-3 w-3" />
                                        </a>

                                        <Link
                                            href={`/journalist/${author.id}`}
                                            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                                        >
                                            View Profile
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}
