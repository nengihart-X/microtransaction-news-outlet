"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"

import { generateTxHash, type Article } from "@/lib/data"
import { getX402Client, type X402PaymentClient } from "@/lib/x402"

export interface PaymentRecord {
  txHash: string
  timestamp: string
  articleId: string
  amount: number
  currency: string
}

export interface PublisherProfile {
  id: string
  name: string
  bio: string
  walletAddress: string
  avatar?: string
  joinedAt: string
}

export interface WalletUser {
  address: string
  displayName: string
  avatar: string
  balance: {
    stx: number
    sbtc: number
    usdcx: number
  }
  articlesRead: number
  totalSpent: number
  isPublisher: boolean
  publisherProfile?: PublisherProfile
}

interface WalletContextType {
  user: WalletUser | null
  isConnecting: boolean
  connect: () => Promise<void>
  disconnect: () => void
  updateProfile: (updates: Partial<Pick<WalletUser, "displayName" | "avatar">>) => void
  payForArticle: (
    articleId: string,
    price: number,
    currency: string
  ) => Promise<{ success: boolean; txHash: string | null }>
  paidArticles: Set<string>
  paymentHistory: PaymentRecord[]
  becomePublisher: (name: string, bio: string, avatar?: string) => void
  resetPublisher: () => void
  localArticles: Article[]
  publishArticle: (article: Omit<Article, "id" | "publishedAt" | "reads" | "tips">) => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

const dummyContext: WalletContextType = {
  user: null,
  isConnecting: false,
  connect: async () => { },
  disconnect: () => { },
  updateProfile: () => { },
  payForArticle: async () => ({ success: false, txHash: null }),
  paidArticles: new Set(),
  paymentHistory: [],
  becomePublisher: () => { },
  resetPublisher: () => { },
  localArticles: [],
  publishArticle: () => { },
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<WalletUser | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [paidArticles, setPaidArticles] = useState<Set<string>>(new Set())
  const [paymentHistory, setPaymentHistory] = useState<PaymentRecord[]>([])
  const [localArticles, setLocalArticles] = useState<Article[]>([])
  const [x402Client, setX402Client] = useState<X402PaymentClient | null>(null)

  useEffect(() => {
    setMounted(true)
    // Load local articles from localStorage
    const savedArticles = localStorage.getItem('local_articles')
    if (savedArticles) {
      setLocalArticles(JSON.parse(savedArticles))
    }
  }, [])

  // Fetch real STX balance from Hiro API
  const fetchBalance = useCallback(async (address: string) => {
    try {
      const response = await fetch(
        `https://api.mainnet.hiro.so/extended/v1/address/${address}/stx`
      )
      if (response.ok) {
        const data = await response.json()
        // Balance is returned in micro-STX (10^6)
        const stx = parseInt(data.balance) / 1000000
        return stx
      }
      return 0
    } catch (e) {
      console.error("Failed to fetch balance:", e)
      return 0
    }
  }, [])

  const syncUser = useCallback(async () => {
    try {
      if (typeof window === "undefined") return

      // Simple persistence check
      const address = localStorage.getItem("wallet_address")

      if (address) {
        const stxBalance = await fetchBalance(address)

        // Initialize x402 client when user is available
        const client = getX402Client(address)
        setX402Client(client)

        // Restore local state if available
        const savedPublisher = localStorage.getItem(`publisher_${address}`)
        const publisherProfile = savedPublisher ? JSON.parse(savedPublisher) : undefined

        setUser((prev) => ({
          address,
          displayName: prev?.displayName || `User ${address.slice(0, 4)}`,
          avatar: prev?.avatar || "",
          balance: {
            stx: stxBalance,
            sbtc: 0,
            usdcx: 0,
          },
          articlesRead: prev?.articlesRead || 0,
          totalSpent: prev?.totalSpent || 0,
          isPublisher: !!publisherProfile,
          publisherProfile,
        }))
      } else {
        setUser(null)
        setX402Client(null)
      }
    } catch (error) {
      console.error("Error syncing user:", error)
    }
  }, [fetchBalance])

  useEffect(() => {
    syncUser()
  }, [syncUser])

  const connect = useCallback(async () => {
    try {
      setIsConnecting(true)

      // @ts-ignore
      const { connect } = await import("@stacks/connect/dist/index.js")

      if (!connect) {
        throw new Error("Connect function not found in library")
      }

      await connect({
        forceWalletSelect: true,
        persistWalletSelect: true,
        onFinish: (payload: any) => {
          // Fallback if 'connect' behaves like showConnect in some versions, 
          // but typically 'connect' returns a promise. 
          // However, Stackable usage: 'const result = await connect(...)'
          // I will handle the Promise result below.
        }
      }).then((result: any) => {
        // Stackable checks result.addresses
        if (result && result.addresses) {
          const stxAddress = result.addresses.find(
            (a: { symbol?: string; address: string }) =>
              a.symbol === "STX" || a.address.startsWith("S")
          );

          if (stxAddress) {
            localStorage.setItem("wallet_address", stxAddress.address)
            syncUser()
          }
        }
      })

      setIsConnecting(false)
    } catch (e) {
      console.error("Connect failed:", e)
      setIsConnecting(false)
    }
  }, [syncUser])

  const disconnect = useCallback(async () => {
    localStorage.removeItem("wallet_address")
    setUser(null)
    setPaidArticles(new Set())
    setPaymentHistory([])
    // Also clear publisher cache if desired, but keeping it is fine
  }, [])



  const updateProfile = useCallback(
    (updates: Partial<Pick<WalletUser, "displayName" | "avatar">>) => {
      setUser((prev) => (prev ? { ...prev, ...updates } : null))
    },
    []
  )

  const becomePublisher = useCallback((name: string, bio: string, avatar?: string) => {
    setUser((prev) => {
      if (!prev) return null
      const profile: PublisherProfile = {
        id: prev.address,
        name,
        bio,
        avatar,
        walletAddress: prev.address,
        joinedAt: new Date().toISOString(),
      }
      // Persist to local storage for now
      localStorage.setItem(`publisher_${prev.address}`, JSON.stringify(profile))

      return {
        ...prev,
        isPublisher: true,
        displayName: name, // specific to this app logic
        avatar: avatar || prev.avatar,
        publisherProfile: profile,
      }
    })
  }, [])

  const resetPublisher = useCallback(() => {
    setUser((prev) => {
      if (!prev) return null
      localStorage.removeItem(`publisher_${prev.address}`)
      return {
        ...prev,
        isPublisher: false,
        publisherProfile: undefined,
      }
    })
  }, [])

  const publishArticle = useCallback((article: Omit<Article, "id" | "publishedAt" | "reads" | "tips">) => {
    const newArticle: Article = {
      ...article,
      id: `local-${Date.now()}`,
      publishedAt: new Date().toISOString().split('T')[0],
      reads: 0,
      tips: 0,
    }

    setLocalArticles((prev) => {
      const updated = [newArticle, ...prev]
      localStorage.setItem('local_articles', JSON.stringify(updated))
      return updated
    })
  }, [])

  const payForArticle = useCallback(
    async (articleId: string, price: number, currency: string) => {
      console.log("payForArticle called with x402", { articleId, price, currency, user })
      if (!user || !x402Client) {
        console.log("No user or x402 client, returning early")
        return { success: false, txHash: null }
      }

      try {
        // Import articles to get author wallet
        const { articles } = await import("@/lib/data")
        const article = articles.find(a => a.id === articleId)
        if (!article) {
          console.log("Article not found:", articleId)
          return { success: false, txHash: null }
        }

        const recipientAddress = article.author.walletAddress
        console.log("Initiating x402 payment", {
          articleId,
          price,
          recipient: recipientAddress,
          currency
        })

        // Use x402 client to handle payment
        const result = await x402Client.payForArticle(articleId, price, recipientAddress)
        
        if (result.success && result.txHash) {
          console.log("x402 payment successful", result.txHash)

          setPaidArticles((prev) => {
            const next = new Set(prev)
            next.add(articleId)
            return next
          })

          setPaymentHistory((prev) => [
            {
              txHash: result.txHash || '',
              timestamp: new Date().toISOString(),
              articleId,
              amount: price,
              currency,
            },
            ...prev,
          ])

          setUser((prev) =>
            prev
              ? {
                  ...prev,
                  balance: {
                    ...prev.balance,
                    stx: Math.max(0, prev.balance.stx - price),
                  },
                  articlesRead: prev.articlesRead + 1,
                  totalSpent: prev.totalSpent + price,
                }
              : null
          )

          return { success: true, txHash: result.txHash }
        } else {
          console.log("x402 payment failed:", result.error)
          return { success: false, txHash: null }
        }
      } catch (error) {
        console.error("x402 payment error:", error)
        return { success: false, txHash: null }
      }
    },
    [user, x402Client]
  )

  if (!mounted) {
    return (
      <WalletContext.Provider value={dummyContext}>
        {children}
      </WalletContext.Provider>
    )
  }

  return (
    <WalletContext.Provider
      value={{
        user,
        isConnecting,
        connect,
        disconnect,
        updateProfile,
        payForArticle,
        paidArticles,
        paymentHistory,
        becomePublisher,
        resetPublisher,
        localArticles,
        publishArticle,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
