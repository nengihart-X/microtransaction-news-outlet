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
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2, FileText } from "lucide-react"
import { categories } from "@/lib/data"

export default function WritePage() {
    const router = useRouter()
    const { user, publishArticle } = useWallet()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "Technology",
        price: "0.15",
        image: "",
    })

    // Redirect if not a publisher
    useEffect(() => {
        // Only redirect if user is loaded and is NOT a publisher
        if (user && !user.isPublisher) {
            router.push("/publish")
        }
    }, [user, router])

    // Show nothing while loading or if not a publisher
    if (!user || !user.isPublisher) {
        return null
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate publishing delay
        await new Promise((r) => setTimeout(r, 1000))

        // Create author object from current user
        const author = {
            id: user.publisherProfile!.id,
            name: user.publisherProfile!.name,
            avatar: user.avatar || "",
            bio: user.publisherProfile!.bio,
            walletAddress: user.address,
            totalEarnings: 0,
            articlesCount: 1,
            followers: 0,
        }

        publishArticle({
            title: formData.title,
            excerpt: formData.excerpt,
            content: formData.content,
            category: formData.category,
            author,
            readTime: Math.ceil(formData.content.split(" ").length / 200),
            price: parseFloat(formData.price),
            currency: "STX",
            image: formData.image || "/images/article-1.jpg",
            featured: false,
        })

        setIsLoading(false)
        router.push("/")
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />

            <main className="mx-auto max-w-4xl px-4 py-16">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
                            <FileText className="h-5 w-5 text-accent" />
                        </div>
                        <h1 className="font-serif text-3xl font-bold text-foreground">
                            Write a Story
                        </h1>
                    </div>
                    <p className="text-muted-foreground">
                        Share your insights with the world and get paid directly by readers.
                    </p>
                </div>

                <Card className="border-border bg-card">
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle>Article Details</CardTitle>
                            <CardDescription>
                                Fill in the details for your article. All fields are required.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter a compelling headline..."
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    required
                                    className="bg-secondary/50 border-border"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    placeholder="Write a brief summary that will appear on the feed..."
                                    value={formData.excerpt}
                                    onChange={(e) =>
                                        setFormData({ ...formData, excerpt: e.target.value })
                                    }
                                    required
                                    className="min-h-[80px] bg-secondary/50 border-border"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Full Article</Label>
                                <Textarea
                                    id="content"
                                    placeholder="Write your full article here..."
                                    value={formData.content}
                                    onChange={(e) =>
                                        setFormData({ ...formData, content: e.target.value })
                                    }
                                    required
                                    className="min-h-[300px] bg-secondary/50 border-border font-serif"
                                />
                                <p className="text-xs text-muted-foreground">
                                    {formData.content.split(" ").filter((w) => w).length} words ·{" "}
                                    {Math.ceil(
                                        formData.content.split(" ").filter((w) => w).length / 200
                                    )}{" "}
                                    min read
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) =>
                                            setFormData({ ...formData, category: value })
                                        }
                                    >
                                        <SelectTrigger className="bg-secondary/50 border-border">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.filter((c) => c !== "All").map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="price">Price (STX)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder="0.15"
                                        value={formData.price}
                                        onChange={(e) =>
                                            setFormData({ ...formData, price: e.target.value })
                                        }
                                        required
                                        className="bg-secondary/50 border-border"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">Cover Image URL (Optional)</Label>
                                <Input
                                    id="image"
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.image}
                                    onChange={(e) =>
                                        setFormData({ ...formData, image: e.target.value })
                                    }
                                    className="bg-secondary/50 border-border"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Leave blank to use a default cover image.
                                </p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.push("/dashboard")}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={
                                        isLoading ||
                                        !formData.title ||
                                        !formData.excerpt ||
                                        !formData.content
                                    }
                                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Publishing...
                                        </>
                                    ) : (
                                        "Publish Article"
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </form>
                </Card>
            </main>

            <SiteFooter />
        </div>
    )
}
