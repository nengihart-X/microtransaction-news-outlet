import { NextRequest, NextResponse } from "next/server"
import { articles } from "@/lib/data"

// This is a simplified version. In a real implementation, you would use
// the @x402/next package to handle payment verification automatically
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ articleId: string }> }
) {
  try {
    const { price, recipient, currency } = await request.json()
    const { articleId } = await params

    // Check for payment signature header
    const paymentSignature = request.headers.get("payment-signature")
    if (!paymentSignature) {
      // Return 402 Payment Required with payment requirements
      const requirements = {
        scheme: "exact",
        price: price.toString(),
        network: process.env.NEXT_PUBLIC_X402_NETWORK || "mainnet",
        payTo: recipient,
        description: `Access to premium article: ${articleId}`,
        mimeType: "application/json"
      }

      const response = {
        requirements: [requirements],
        description: "Payment required to access this article",
        mimeType: "application/json"
      }

      // Base64 encode the response for the PAYMENT-REQUIRED header
      const encodedResponse = Buffer.from(JSON.stringify(response)).toString('base64')
      
      return new NextResponse(
        JSON.stringify({ error: "Payment required" }),
        {
          status: 402,
          headers: {
            'Content-Type': 'application/json',
            'PAYMENT-REQUIRED': encodedResponse
          }
        }
      )
    }

    // In a real implementation, you would verify the payment signature
    // using the x402 facilitator. For now, we'll simulate successful payment
    console.log("Payment signature received:", paymentSignature)

    // Find and return the article content
    const article = articles.find(a => a.id === articleId)
    if (!article) {
      return NextResponse.json(
        { error: "Article not found" },
        { status: 404 }
      )
    }

    // Generate a mock transaction hash for demonstration
    const txHash = `0x${Math.random().toString(16).substr(2, 64)}`

    // Return the article content with payment response
    const paymentResponse = {
      txHash,
      status: "completed",
      amount: price,
      currency: "STX"
    }

    const encodedPaymentResponse = Buffer.from(JSON.stringify(paymentResponse)).toString('base64')

    return NextResponse.json({
      success: true,
      article: {
        id: article.id,
        title: article.title,
        content: article.content,
        author: article.author,
        publishedAt: article.publishedAt,
        reads: article.reads + 1
      },
      payment: paymentResponse
    }, {
      headers: {
        'PAYMENT-RESPONSE': encodedPaymentResponse
      }
    })

  } catch (error) {
    console.error("Article access error:", error)
    return NextResponse.json(
      { error: "Failed to access article" },
      { status: 500 }
    )
  }
}
