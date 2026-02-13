import { NextRequest, NextResponse } from "next/server"
import { createPaymentRequirement, type PaymentRequiredResponse } from "@/lib/x402"
import { articles } from "@/lib/data"

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  try {
    const { price, recipient, currency } = await request.json()
    const { articleId } = await params

    // Find the article
    const article = articles.find(a => a.id === articleId)
    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      )
    }

    // Validate that the recipient matches the article's author
    if (recipient !== article.author.walletAddress) {
      return NextResponse.json(
        { error: "Invalid recipient address" },
        { status: 400 }
      )
    }

    // Create payment requirements
    const requirements = [createPaymentRequirement(
      parseFloat(price),
      recipient,
      `Access to premium article: ${article.title}`
    )]

    const response: PaymentRequiredResponse = {
      requirements,
      description: `Payment required to access: ${article.title}`,
      mimeType: "application/json"
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Payment requirements error:", error)
    return NextResponse.json(
      { error: "Failed to generate payment requirements" },
      { status: 500 }
    )
  }
}
