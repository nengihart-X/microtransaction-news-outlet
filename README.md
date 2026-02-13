# The Wire - Decentralized News Outlet

> **Pay for journalism, not subscriptions.** A decentralized news platform powered by the x402 protocol on Stacks blockchain, enabling micropayments for individual articles.

🏆 **Built for x402 Stacks Challenge**

## 🌟 Overview

The Wire reimagines online journalism by eliminating subscription paywalls and enabling direct micro-transactions between readers and writers. Instead of paying monthly fees for content they may never read, users pay small amounts (in STX, sBTC, or USDCx) only for the articles they actually consume.

Journalists receive 100% of earnings directly to their Stacks wallet—no platform fees, no middlemen.

## ✨ Features

### For Readers
- **Pay-per-article** - Read individual stories for micro-amounts of cryptocurrency
- **No subscriptions** - Pay only for what you read
- **Instant access** - Unlock articles immediately via x402 protocol
- **Multiple currencies** - Pay with STX, sBTC, or USDCx
- **Browse by category** - Technology, Climate, Economics, Finance, Culture, Education

### For Writers
- **Direct payments** - 100% of earnings go to your wallet
- **Publisher onboarding** - Simple wallet connection and profile setup
- **Article composition** - Built-in editor for writing and publishing stories
- **Profile customization** - Upload avatar and bio
- **Real-time analytics** - Track reads, earnings, and engagement
- **Writers directory** - Showcase your work and build your audience

### Platform Features
- **Writer profiles** - Dedicated pages for each journalist with their complete portfolio
- **Featured articles** - Highlight important stories on the homepage
- **Dashboard analytics** - Comprehensive earnings and readership data
- **Payment history** - Complete transaction records on-chain
- **Local article publishing** - Write and publish articles that persist in browser storage

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (React 19) with TypeScript
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Blockchain**: Stacks blockchain integration via `@stacks/connect`
- **Payment Protocol**: x402 microtransaction standard
- **State Management**: React Context API
- **Storage**: localStorage for client-side persistence (demo mode)
- **Charts**: Recharts for analytics visualization
- **UI Components**: Radix UI primitives

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Stacks wallet (Leather, Xverse, or Hiro)

### Installation

```bash
# Clone the repository
git clone https://github.com/nengihart-X/microtransaction-news-outlet.git

# Navigate to project directory
cd microtransaction-news-outlet

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 📖 How It Works

### For Readers

1. **Browse Articles** - Explore the homepage feed or filter by category
2. **Connect Wallet** - Click "Connect Wallet" and choose your Stacks wallet
3. **Pay & Read** - Click an article, pay the listed price, and unlock full access
4. **Earnings to Writers** - 100% of payment goes directly to the journalist's wallet

### For Writers

1. **Become a Publisher** - Visit `/publish` and connect your Stacks wallet
2. **Create Profile** - Add your name, bio, and profile picture
3. **Write Articles** - Click "Write Story" on the dashboard
4. **Set Price** - Choose your article price in STX
5. **Publish** - Your article appears instantly on the homepage feed
6. **Get Paid** - Earnings go directly to your connected wallet

## 🎯 Key Innovation: x402 Protocol

The Wire leverages the **x402 HTTP status code** standard for microtransactions:

- Articles return `402 Payment Required` for non-paying users
- Smart contracts handle payments atomically
- Readers unlock content instantly after payment
- All transactions are transparent and on-chain

## 📸 Screenshots

> *<img width="1920" height="5406" alt="image" src="https://github.com/user-attachments/assets/bd66edef-5e64-4378-9712-4b1f7e040902" />
*

## 🏗️ Project Structure

```
microtransaction-news-outlet/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage with article feed
│   ├── dashboard/         # Platform analytics
│   ├── publish/           # Publisher onboarding
│   ├── write/             # Article composition
│   ├── journalist/[id]/   # Writer profile pages
│   └── journalists/       # Writers directory
├── components/            # Reusable UI components
├── lib/                   # Core utilities
│   ├── data.ts           # Article and author data
│   └── wallet-context.tsx # Wallet & state management
└── public/               # Static assets
```

## 🔮 Future Enhancements

- [ ] Backend API for persistent article storage
- [ ] Rich text editor with embedded media
- [ ] Article editing and deletion
- [ ] Comments and reader engagement
- [ ] Writer analytics and insights
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] AI-powered content recommendations

## 🤝 Contributing

This is a hackathon project, but contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- **Stacks Foundation** - For the blockchain infrastructure
- **x402 Protocol** - For the micropayment standard
- **Next.js Team** - For the amazing framework
- **Radix UI** - For accessible component primitives

## 📧 Contact

**Project Author**: nengihart-X  
**Repository**: [github.com/nengihart-X/microtransaction-news-outlet](https://github.com/nengihart-X/microtransaction-news-outlet)

---

Built with ❤️ for x402 Stacks Challenge | Powered by Stacks & x402
