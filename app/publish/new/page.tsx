"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useWallet } from "@/lib/wallet-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Loader2, ArrowLeft, Image as ImageIcon, Coins, Eye, Save } from "lucide-react"
import Link from "next/link"

const CATEGORIES = ["Technology", "Crypto", "Culture", "Politics", "Science", "Finance"]

export default function NewArticlePage() {
    const router = useRouter()
    const { user } = useWallet()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        image: "",
        price: "0.5",
        currency: "STX",
    })

    // Redirect if not publisher
    if (!user?.isPublisher) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="font-serif text-2xl font-bold text-foreground">
                        Publisher Access Required
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        You need to create a publisher profile first.
                    </p>
                    <Button asChild className="mt-4 bg-accent text-accent-foreground">
                        <Link href="/publish">Become a Publisher</Link>
                    </Button>
                </div>
            </div>
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call and Data Store update
        await new Promise((r) => setTimeout(r, 1500))

        // In a real app, we would POST to an API here
        // For this demo, we'll just redirect to dashboard with a success toast (simulated)

        setIsLoading(false)
        router.push("/dashboard")
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <SiteHeader />

            <main className="mx-auto max-w-4xl px-4 py-8">
                <div className="mb-6 flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
                        <Link href="/dashboard">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Link>
                    </Button>
                    <h1 className="font-serif text-2xl font-bold">Write New Article</h1>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content Form */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-border bg-card">
                            <CardContent className="pt-6 space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Article Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="Enter a catchy headline..."
                                        value={formData.title}
                                        onChange={(e) =>
                                            setFormData({ ...formData, title: e.target.value })
                                        }
                                        className="bg-secondary/50 border-border text-lg font-serif font-bold"
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="excerpt">Excerpt</Label>
                                    <Textarea
                                        id="excerpt"
                                        placeholder="Short summary for the feed..."
                                        value={formData.excerpt}
                                        onChange={(e) =>
                                            setFormData({ ...formData, excerpt: e.target.value })
                                        }
                                        className="h-20 bg-secondary/50 border-border resize-none"
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground text-right">
                                        {formData.excerpt.length}/160 characters
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content">Content</Label>
                                    <div className="rounded-lg border border-border bg-secondary/20">
                                        <div className="flex items-center gap-2 border-b border-border p-2 bg-secondary/50 overflow-x-auto">
                                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">Bold</Button>
                                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">Italic</Button>
                                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">H2</Button>
                                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">Link</Button>
                                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">Quote</Button>
                                        </div>
                                        <Textarea
                                            id="content"
                                            placeholder="Write your story here..."
                                            value={formData.content}
                                            onChange={(e) =>
                                                setFormData({ ...formData, content: e.target.value })
                                            }
                                            className="min-h-[400px] border-none bg-transparent focus-visible:ring-0 p-4 font-serif text-lg leading-relaxed resize-none"
                                            required
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Settings */}
                    <div className="space-y-6">
                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="text-sm">Publishing Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(val) =>
                                            setFormData({ ...formData, category: val })
                                        }
                                    >
                                        <SelectTrigger className="bg-secondary/50 border-border">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CATEGORIES.map((cat) => (
                                                <SelectItem key={cat} value={cat}>
                                                    {cat}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image">Cover Image URL</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="image"
                                            placeholder="https://..."
                                            value={formData.image}
                                            onChange={(e) =>
                                                setFormData({ ...formData, image: e.target.value })
                                            }
                                            className="bg-secondary/50 border-border"
                                        />
                                        <Button size="icon" variant="outline" className="shrink-0 bg-secondary/50 border-border">
                                            <ImageIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="price">Price (STX)</Label>
                                    <div className="relative">
                                        <Coins className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="price"
                                            type="number"
                                            step="0.1"
                                            min="0.1"
                                            value={formData.price}
                                            onChange={(e) =>
                                                setFormData({ ...formData, price: e.target.value })
                                            }
                                            className="pl-9 bg-secondary/50 border-border"
                                        />
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Readers pay this amount to unlock.
                                    </p>
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col gap-2">
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isLoading || !formData.title || !formData.content}
                                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
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
                                <Button variant="ghost" className="w-full text-muted-foreground">
                                    Save Draft
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="border-border bg-card/50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-medium text-muted-foreground">Estimated Revenue</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-end gap-2">
                                    <span className="text-2xl font-bold tabular-nums">0.0</span>
                                    <span className="text-sm font-medium text-muted-foreground mb-1">STX</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Based on 0 reads</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    )
}
