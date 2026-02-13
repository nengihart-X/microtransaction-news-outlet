"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/lib/wallet-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Loader2, Check, ExternalLink, Newspaper } from "lucide-react"

export default function PublishOnboardingPage() {
    const router = useRouter()
    const { user, isConnecting, connect, becomePublisher } = useWallet()
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        avatar: "",
    })

    // Redirect if already a publisher
    useEffect(() => {
        if (user?.isPublisher) {
            router.push("/dashboard")
        }
    }, [user, router])

    if (user?.isPublisher) {
        return null
    }

    const handleConnect = async () => {
        await connect()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call
        await new Promise((r) => setTimeout(r, 1000))
        becomePublisher(formData.name, formData.bio, formData.avatar)

        setIsLoading(false)
        router.push("/dashboard")
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />

            <main className="mx-auto max-w-2xl px-4 py-16">
                <div className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                        <Newspaper className="h-6 w-6 text-accent" />
                    </div>
                    <h1 className="mt-6 font-serif text-3xl font-bold text-foreground md:text-4xl">
                        Become a Publisher
                    </h1>
                    <p className="mt-3 text-muted-foreground">
                        Join the decentralized news network. Get paid directly by readers.
                    </p>
                </div>

                {/* Step 1: Wallet Connection */}
                {!user && (
                    <Card className="mt-10 border-border bg-card">
                        <CardHeader>
                            <CardTitle>1. Connect your Wallet</CardTitle>
                            <CardDescription>
                                You need a Stacks wallet to receive payments directly.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button
                                onClick={handleConnect}
                                disabled={isConnecting}
                                className="w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                            >
                                {isConnecting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    "Connect Stacks Wallet"
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Step 2: Profile Details */}
                {user && !user.isPublisher && (
                    <Card className="mt-10 border-border bg-card fade-in-up">
                        <form onSubmit={handleSubmit}>
                            <CardHeader>
                                <CardTitle>2. Creates your Profile</CardTitle>
                                <CardDescription>
                                    This is how you&apos;ll appear to readers on the platform.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Display Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g. Sarah J. Journalist"
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        required
                                        className="bg-secondary/50 border-border placeholder:text-muted-foreground/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio</Label>
                                    <Textarea
                                        id="bio"
                                        placeholder="Tell readers about your beat and background..."
                                        value={formData.bio}
                                        onChange={(e) =>
                                            setFormData({ ...formData, bio: e.target.value })
                                        }
                                        required
                                        className="min-h-[100px] bg-secondary/50 border-border placeholder:text-muted-foreground/50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="avatar">Profile Picture URL</Label>
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <Input
                                                id="avatar"
                                                placeholder="https://example.com/avatar.jpg"
                                                value={formData.avatar}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, avatar: e.target.value })
                                                }
                                                className="bg-secondary/50 border-border placeholder:text-muted-foreground/50"
                                            />
                                            <p className="mt-1 text-[10px] text-muted-foreground">
                                                Paste a direct link to an image (e.g. from Unsplash or Imgur).
                                            </p>
                                        </div>
                                        {formData.avatar && (
                                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-muted">
                                                <img
                                                    src={formData.avatar}
                                                    alt="Preview"
                                                    className="h-full w-full object-cover"
                                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="rounded-lg bg-secondary p-3 text-xs text-muted-foreground">
                                    <p className="font-semibold text-foreground mb-1">
                                        Payout Address:
                                    </p>
                                    <code className="text-[10px] break-all">
                                        {user.address}
                                    </code>
                                    <div className="mt-2 flex items-center gap-1 text-accent">
                                        <Check className="h-3 w-3" />
                                        <span>Verified</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    type="submit"
                                    disabled={isLoading || !formData.name || !formData.bio}
                                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creating Profile...
                                        </>
                                    ) : (
                                        "Create Publisher Profile"
                                    )}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                )}
            </main>

            <SiteFooter />
        </div>
    )
}
