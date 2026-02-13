export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  author: Author
  publishedAt: string
  readTime: number
  price: number
  currency: string
  image: string
  featured: boolean
  reads: number
  tips: number
  contentImages?: { src: string; alt: string; caption?: string; position: number }[]
}

export interface Author {
  id: string
  name: string
  avatar: string
  bio: string
  walletAddress: string
  totalEarnings: number
  articlesCount: number
  followers: number
}

export const authors: Author[] = [
  {
    id: "a1",
    name: "Elena Vasquez",
    avatar: "/images/avatars/author-1.jpg",
    bio: "Investigative journalist covering technology and digital rights. Previously at Reuters and The Guardian.",
    walletAddress: "SP248QXA1FSS883DNGSZ1A47DP4WF5SEBNST9PXWP",
    totalEarnings: 4280.5,
    articlesCount: 127,
    followers: 8420,
  },
  {
    id: "a2",
    name: "Marcus Chen",
    avatar: "/images/avatars/author-2.jpg",
    bio: "Climate and energy correspondent. Pulitzer nominee. Covering the intersection of policy and science.",
    walletAddress: "SP2QZHZB0HH0ZVXTPT6SRY821W2Z6TGZ67F4BHKHY",
    totalEarnings: 3150.25,
    articlesCount: 94,
    followers: 6210,
  },
  {
    id: "a3",
    name: "Sarah Okonkwo",
    avatar: "/images/avatars/author-3.jpg",
    bio: "Financial markets analyst and writer. Breaking down complex economics for everyday readers.",
    walletAddress: "SP22N6X8BJSKVPFMDDP2ZEKSDC43EMBWTBC8SQFG3",
    totalEarnings: 5620.75,
    articlesCount: 203,
    followers: 12350,
  },
  {
    id: "a4",
    name: "James Mwangi",
    avatar: "/images/avatars/author-4.jpg",
    bio: "Culture and society editor. Telling stories that shape our understanding of the modern world.",
    walletAddress: "SP1JQ8H2ZHEV0QJ43Q2H1R6MVZE27XGQR72AX6KT9",
    totalEarnings: 2890.0,
    articlesCount: 76,
    followers: 4580,
  },
]

export const articles: Article[] = [
  {
    id: "1",
    title: "The Quiet Revolution: How Decentralized Identity Is Reshaping Digital Trust",
    excerpt:
      "In an era of data breaches and surveillance capitalism, a new wave of protocols promises to return ownership of personal data to individuals.",
    content: `In an era of data breaches and surveillance capitalism, a new wave of protocols promises to return ownership of personal data to individuals. The shift from centralized identity providers to self-sovereign identity (SSI) represents one of the most profound technological transformations of our time.

For decades, our digital identities have been scattered across hundreds of databases controlled by corporations and governments. Each account, each login, each verification creates another point of failure — another opportunity for hackers to steal our most sensitive information.

The numbers are staggering. In 2025 alone, over 4.2 billion records were exposed through data breaches. The average person has credentials stored across 130 different online services. Each one represents a vulnerability.

But a quiet revolution is underway. Decentralized identity protocols, built on blockchain technology and cryptographic proofs, are offering an alternative vision. One where you carry your credentials like a digital wallet — proving who you are without revealing more than necessary.

The concept is elegantly simple. Instead of storing your identity data on a company's server, you hold verifiable credentials on your own device. When a service needs to verify your age, your citizenship, or your qualifications, you present a cryptographic proof. The verifier can confirm the credential is authentic without ever accessing the underlying data.

Major institutions are taking notice. The European Union's eIDAS 2.0 regulation mandates digital identity wallets for all citizens by 2027. Microsoft, IBM, and dozens of startups are building the infrastructure. The World Wide Web Consortium has standardized the Decentralized Identifier (DID) specification.

"We're witnessing the unbundling of identity," says Dr. Amara Chen, a researcher at the MIT Digital Currency Initiative. "The idea that one company should hold all your personal data is becoming as antiquated as the idea that one company should control all your communications."

The implications extend far beyond privacy. Decentralized identity could transform everything from voting to healthcare, from financial inclusion to refugee services. In developing nations, where billions lack formal identification, SSI could provide a path to economic participation without the need for traditional bureaucratic infrastructure.

But challenges remain. Interoperability between different systems, key management for non-technical users, and regulatory uncertainty all threaten to slow adoption. The technology must become invisible before it can become universal.

As the digital world grapples with questions of trust, privacy, and sovereignty, decentralized identity stands as perhaps the most important — and least understood — innovation of the decade.`,
    category: "Technology",
    author: authors[0],
    publishedAt: "2026-02-12",
    readTime: 8,
    price: 0.15,
    currency: "STX",
    image: "/images/article-1.jpg",
    featured: true,
    reads: 12480,
    tips: 342,
    contentImages: [
      { src: "/images/article-1.jpg", alt: "Digital identity visualization", caption: "Decentralized identity protocols enable users to control their own credentials", position: 3 },
    ],
  },
  {
    id: "2",
    title: "The Last Glacier: A Journey to the Edge of Climate Change",
    excerpt:
      "Deep in the Peruvian Andes, the Quelccaya ice cap tells a story 1,800 years in the making — and its final chapter is being written now.",
    content: `Deep in the Peruvian Andes, the Quelccaya ice cap tells a story 1,800 years in the making — and its final chapter is being written now. At 5,670 meters above sea level, this tropical glacier has served as both a climate archive and a water source for communities stretching back to the Inca Empire.

Standing at its edge in January 2026, the retreat is visible to the naked eye. Stakes placed by glaciologists just two years ago now sit ten meters from the ice margin. The sound of meltwater is constant — a quiet, relentless rush that never stops, even in the predawn cold.

Dr. Carlos Huaraya has been studying Quelccaya for fifteen years. "When I first came here as a graduate student, the ice stretched beyond that ridge," he says, pointing to a rocky outcrop now surrounded by newly exposed soil. "That was 2011. In geological terms, what we're witnessing is instantaneous."

The data supports his observation. Quelccaya is retreating at a rate of approximately 60 meters per year — ten times faster than at any point in the past two millennia. Ice core samples extracted in the 1980s contained atmospheric records stretching back to 500 AD. Those same layers are now lost forever.

For the communities below, the glacier's retreat is more than scientific concern. The town of Sicuani, home to 60,000 people, depends on glacial meltwater during the dry season. As the ice disappears, so does their water security.

"People talk about climate change as a future problem," says Maria Quispe, a local community organizer. "For us, it's already here. Our grandparents remember a glacier twice this size."

The story of Quelccaya is not unique. Across the tropics — from Mount Kenya to Kilimanjaro, from the Himalayas to the Andes — glaciers are vanishing. They are the canary in the coal mine for global climate systems, and their message is unambiguous.

What makes Quelccaya particularly significant is its unbroken record. As a tropical glacier, it responds to global temperature changes more rapidly than its polar counterparts. Its retreat provides a real-time barometer of planetary warming.

Scientists estimate Quelccaya will be completely gone within 25 years. When it disappears, humanity will lose not only a critical water source but an irreplaceable archive of Earth's climate history.

The glacier does not ask for attention. It simply melts.`,
    category: "Climate",
    author: authors[1],
    publishedAt: "2026-02-10",
    readTime: 11,
    price: 0.2,
    currency: "STX",
    image: "/images/article-2.jpg",
    featured: true,
    reads: 8920,
    tips: 567,
    contentImages: [
      { src: "/images/article-2.jpg", alt: "Quelccaya glacier retreat", caption: "The Quelccaya ice cap in the Peruvian Andes, showing visible retreat markers", position: 2 },
      { src: "/images/article-2.jpg", alt: "Glacial meltwater", caption: "Meltwater streams from the retreating glacier", position: 5 },
    ],
  },
  {
    id: "3",
    title: "The Invisible Tax: How Algorithmic Pricing Is Reshaping Consumer Markets",
    excerpt:
      "From ride-hailing to grocery delivery, dynamic pricing algorithms are quietly extracting maximum willingness to pay from every transaction.",
    content: `From ride-hailing to grocery delivery, dynamic pricing algorithms are quietly extracting maximum willingness to pay from every transaction. What was once called "surge pricing" has evolved into a sophisticated, pervasive system that most consumers never see — and can't escape.

The premise is simple: charge each customer the maximum they're willing to pay. The execution is anything but. Modern pricing algorithms ingest hundreds of data points — your location, browsing history, device type, purchase history, time of day, weather conditions, and even your phone's battery level — to calculate a personalized price in milliseconds.

A 2025 study by the Federal Trade Commission found that 73% of major e-commerce platforms use some form of algorithmic pricing. The price differences can be substantial. The same product might cost 15-30% more depending on the buyer's profile.

"It's the perfect form of price discrimination," explains Professor Lisa Zhang of Stanford's Graduate School of Business. "Classical economics taught us that charging different prices to different consumers is theoretically optimal but practically impossible. Algorithms have made it practical."

The implications are deeply unequal. Research consistently shows that algorithmic pricing disadvantages lower-income consumers, who are often charged higher prices for essential goods and services. A ProPublica investigation found that insurance quotes generated by algorithms were systematically higher in predominantly Black neighborhoods.

Defenders of dynamic pricing argue it improves market efficiency. Surge pricing, they say, incentivizes supply when demand is highest. Variable pricing allows businesses to serve more customers at different price points.

But the counterargument is compelling. When every price is personalized, the concept of a "fair price" evaporates. Consumers lose the ability to comparison shop effectively, and the information asymmetry between buyer and seller becomes nearly absolute.

Regulatory responses are emerging but fragmented. The EU's Digital Markets Act imposes some restrictions on personalized pricing, but enforcement remains challenging. In the United States, legislative proposals have stalled in Congress.

The fundamental question is whether pricing should be a negotiation in which only one side has complete information. In the algorithmic marketplace, every transaction is an auction you don't know you're participating in.`,
    category: "Economics",
    author: authors[2],
    publishedAt: "2026-02-09",
    readTime: 9,
    price: 0.15,
    currency: "STX",
    image: "/images/article-3.jpg",
    featured: false,
    reads: 6750,
    tips: 198,
    contentImages: [
      { src: "/images/article-3.jpg", alt: "Algorithmic pricing visualization", caption: "Dynamic pricing algorithms analyze multiple data points to set personalized prices", position: 2 },
    ],
  },
  {
    id: "4",
    title: "The Architecture of Solitude: Why Cities Are Designing for Loneliness",
    excerpt:
      "Urban planners are rethinking public spaces as the loneliness epidemic reshapes how we design the places we live.",
    content: `Urban planners are rethinking public spaces as the loneliness epidemic reshapes how we design the places we live. From Tokyo's one-person karaoke booths to London's "conversation benches," cities are grappling with a paradox: billions of people packed together, yet more isolated than ever.

The Surgeon General's 2023 advisory on loneliness called it an epidemic comparable to smoking or obesity. Since then, cities worldwide have begun treating social isolation as a design problem — one that architecture and urban planning might help solve.

In Copenhagen, the Superkilen urban park was designed specifically to encourage chance encounters between residents of different backgrounds. In Melbourne, laneways have been redesigned to slow pedestrian traffic, creating natural gathering points. In Seoul, new apartment complexes include mandatory communal kitchens and shared gardens.

"The problem isn't that people don't want connection," says architect Yuki Tanaka, who designs what she calls 'encounter architecture.' "It's that our built environment has been optimized for efficiency, not interaction. We've designed loneliness into our cities."

The evidence supports her thesis. A landmark study tracking 50,000 residents across 12 cities found that those living in neighborhoods with "third places" — spaces that are neither home nor work — reported 40% lower rates of chronic loneliness.

But not everyone is convinced. Critics argue that designing physical spaces to combat loneliness ignores the deeper social and economic forces driving isolation. "You can build the most beautiful public square in the world," says urban sociologist Dr. James Mbeki, "but if people are working 60-hour weeks in the gig economy, they won't use it."

The tension between architectural optimism and social reality is playing out in real time. Cities are investing billions in redesigned public spaces, community hubs, and what Singapore calls "wellness districts." Whether these investments will move the needle on loneliness depends on factors that extend far beyond design.

What is clear is that the conversation has shifted. Loneliness is no longer seen as a personal failing but as a collective challenge — one that requires rethinking the very infrastructure of daily life.`,
    category: "Culture",
    author: authors[3],
    publishedAt: "2026-02-08",
    readTime: 7,
    price: 0.12,
    currency: "STX",
    image: "/images/article-4.jpg",
    featured: false,
    reads: 5430,
    tips: 145,
    contentImages: [
      { src: "/images/article-4.jpg", alt: "Urban public space design", caption: "Copenhagen's Superkilen park designed to encourage social interaction", position: 3 },
    ],
  },
  {
    id: "5",
    title: "Stablecoins and Sovereignty: The Battle for Digital Dollar Dominance",
    excerpt:
      "As stablecoins surpass $300 billion in market cap, central banks and regulators are locked in a high-stakes contest over the future of money.",
    content: `As stablecoins surpass $300 billion in market cap, central banks and regulators are locked in a high-stakes contest over the future of money. The outcome will determine not just the shape of financial markets but the nature of monetary sovereignty itself.

The growth has been exponential. In 2020, the total stablecoin market cap was $20 billion. By 2024, it reached $150 billion. Today, it stands at over $300 billion, with daily transaction volumes routinely exceeding those of Visa and Mastercard combined.

Behind the numbers lies a fundamental shift. Stablecoins — digital tokens pegged to fiat currencies, typically the US dollar — have evolved from a niche cryptocurrency tool into a parallel financial system. They're used for remittances in Latin America, savings in Nigeria, trade settlement in Southeast Asia, and increasingly, as the rails for AI-driven commerce.

"Stablecoins are doing for money what email did for mail," says Tara Sharma, chief economist at Circle, the issuer of USDC. "They make value transfer instant, global, and programmable."

But this growth has triggered alarm in central banking circles. The Bank for International Settlements has warned that privately issued stablecoins could undermine monetary policy transmission. The European Central Bank has called them a potential threat to financial stability.

The concern is not abstract. When a private company can issue billions in dollar-denominated tokens outside the traditional banking system, the central bank's ability to control money supply and credit conditions is diminished. Add AI agents making autonomous payments via protocols like x402, and the volume of programmatic transactions could dwarf human-initiated ones.

The response has been the development of Central Bank Digital Currencies (CBDCs). China's digital yuan is already in widespread use. The EU's digital euro is scheduled for launch in 2027. The US is debating competing legislative approaches.

But CBDCs face their own challenges: privacy concerns, technical complexity, and the simple fact that existing stablecoins already work. The market isn't waiting for regulators.

The next five years will likely determine whether digital dollars are primarily issued by governments or by private networks. Either way, the architecture of money is being rebuilt in real time.`,
    category: "Finance",
    author: authors[2],
    publishedAt: "2026-02-07",
    readTime: 10,
    price: 0.18,
    currency: "STX",
    image: "/images/article-5.png",
    featured: false,
    reads: 9210,
    tips: 412,
    contentImages: [
      { src: "/placeholder.svg", alt: "Digital currency growth chart", caption: "Stablecoin market cap has grown from $20B in 2020 to over $300B today", position: 2 },
    ],
  },
  {
    id: "6",
    title: "The Teacher Shortage Nobody Talks About: Who Will Teach the Next Generation of Engineers?",
    excerpt:
      "As demand for STEM graduates skyrockets, universities face a crisis: the people qualified to teach them can earn three times more in industry.",
    content: `As demand for STEM graduates skyrockets, universities face a crisis: the people qualified to teach them can earn three times more in industry. The result is a silent emergency in higher education that threatens the pipeline of technical talent.

The numbers paint a stark picture. According to the American Society for Engineering Education, unfilled faculty positions in engineering departments increased by 35% between 2022 and 2025. Computer science departments are even worse off, with some schools reporting vacancy rates above 40%.

The cause is straightforward economics. A newly minted PhD in computer science can expect a starting salary of $180,000 in industry, rising quickly to $300,000 or more at major tech companies. The same person would earn $85,000 as an assistant professor, with years of uncertain tenure ahead.

"We're competing with Google, Meta, and OpenAI for the same talent pool," says Dean Patricia Williams of Carnegie Mellon's College of Engineering. "And we're bringing a butter knife to a gunfight."

The consequences are already visible. Class sizes are growing. Course offerings are shrinking. Research output is declining in critical areas like semiconductor design and cybersecurity. Some universities have begun hiring instructors without PhDs — a move that would have been unthinkable a decade ago.

Students feel the impact directly. Wait lists for popular computer science courses now stretch into the hundreds at many public universities. At the University of Washington, over 700 students applied for 150 spots in the introductory machine learning course last semester.

Proposed solutions range from salary supplements funded by industry partners to hybrid positions that allow faculty to maintain consulting practices. Some institutions are experimenting with AI-assisted instruction to multiply the effectiveness of their limited faculty.

But the fundamental tension remains. As long as the private sector can outbid academia by a factor of three, the pipeline of qualified instructors will continue to narrow. And without teachers, there will be no engineers.

The irony is bitter: the same industry boom that makes STEM graduates so valuable is systematically undermining the institutions that produce them.`,
    category: "Education",
    author: authors[0],
    publishedAt: "2026-02-05",
    readTime: 8,
    price: 0.15,
    currency: "STX",
    image: "/images/article-6.png",
    featured: true,
    reads: 4890,
    tips: 167,
    contentImages: [
      { src: "/placeholder.svg", alt: "University engineering classroom", caption: "Growing class sizes reflect the shortage of qualified STEM instructors", position: 3 },
    ],
  },
]

export const categories = [
  "All",
  "Technology",
  "Climate",
  "Economics",
  "Finance",
  "Culture",
  "Education",
]

export interface Transaction {
  id: string
  txHash: string
  timestamp: string
  articleId: string
  authorId: string
  amount: number
  currency: string
  type: "read" | "tip"
  status: "settled" | "pending"
}

export const transactions: Transaction[] = [
  { id: "tx1", txHash: "0xf8a92c4b7e31d5a09c2e7b84f1d6a3e5b9c0d2f4", timestamp: "2026-02-12T13:42:00Z", articleId: "1", authorId: "a1", amount: 0.15, currency: "STX", type: "read", status: "settled" },
  { id: "tx2", txHash: "0xa1b2c3d4e5f67890abcdef1234567890abcdef12", timestamp: "2026-02-12T13:38:00Z", articleId: "2", authorId: "a2", amount: 0.20, currency: "STX", type: "read", status: "settled" },
  { id: "tx3", txHash: "0xdeadbeef12345678cafebabe87654321aabbccdd", timestamp: "2026-02-12T13:35:00Z", articleId: "1", authorId: "a1", amount: 1.00, currency: "STX", type: "tip", status: "settled" },
  { id: "tx4", txHash: "0x1122334455667788990011223344556677889900", timestamp: "2026-02-12T13:20:00Z", articleId: "3", authorId: "a3", amount: 0.15, currency: "STX", type: "read", status: "settled" },
  { id: "tx5", txHash: "0xaabbccdd11223344556677889900aabbccddeeff", timestamp: "2026-02-12T12:55:00Z", articleId: "5", authorId: "a3", amount: 5.00, currency: "STX", type: "tip", status: "settled" },
  { id: "tx6", txHash: "0x9988776655443322110099887766554433221100", timestamp: "2026-02-12T12:40:00Z", articleId: "4", authorId: "a4", amount: 0.12, currency: "STX", type: "read", status: "settled" },
  { id: "tx7", txHash: "0xffeeddccbbaa99887766554433221100ffeeddcc", timestamp: "2026-02-12T12:18:00Z", articleId: "6", authorId: "a1", amount: 0.50, currency: "STX", type: "tip", status: "settled" },
  { id: "tx8", txHash: "0x0011223344556677aabbccdd8899eeff00112233", timestamp: "2026-02-12T11:50:00Z", articleId: "2", authorId: "a2", amount: 0.20, currency: "STX", type: "read", status: "settled" },
  { id: "tx9", txHash: "0x445566778899aabb0011223344556677ccddeeff", timestamp: "2026-02-12T11:30:00Z", articleId: "5", authorId: "a3", amount: 0.18, currency: "STX", type: "read", status: "settled" },
  { id: "tx10", txHash: "0xbbccddee11223344aabb5566778899ff00112233", timestamp: "2026-02-12T10:45:00Z", articleId: "1", authorId: "a1", amount: 0.15, currency: "STX", type: "read", status: "settled" },
]

export interface MonthlyEarning {
  month: string
  reads: number
  tips: number
}

export const authorEarnings: Record<string, MonthlyEarning[]> = {
  a1: [
    { month: "Sep", reads: 320, tips: 110 },
    { month: "Oct", reads: 410, tips: 180 },
    { month: "Nov", reads: 380, tips: 250 },
    { month: "Dec", reads: 450, tips: 190 },
    { month: "Jan", reads: 520, tips: 310 },
    { month: "Feb", reads: 680, tips: 420 },
  ],
  a2: [
    { month: "Sep", reads: 280, tips: 90 },
    { month: "Oct", reads: 350, tips: 120 },
    { month: "Nov", reads: 310, tips: 200 },
    { month: "Dec", reads: 400, tips: 160 },
    { month: "Jan", reads: 470, tips: 280 },
    { month: "Feb", reads: 550, tips: 340 },
  ],
  a3: [
    { month: "Sep", reads: 520, tips: 180 },
    { month: "Oct", reads: 640, tips: 260 },
    { month: "Nov", reads: 580, tips: 340 },
    { month: "Dec", reads: 720, tips: 300 },
    { month: "Jan", reads: 810, tips: 420 },
    { month: "Feb", reads: 960, tips: 540 },
  ],
  a4: [
    { month: "Sep", reads: 180, tips: 60 },
    { month: "Oct", reads: 240, tips: 100 },
    { month: "Nov", reads: 210, tips: 130 },
    { month: "Dec", reads: 290, tips: 110 },
    { month: "Jan", reads: 360, tips: 180 },
    { month: "Feb", reads: 420, tips: 240 },
  ],
}

export function getAuthorArticles(authorId: string) {
  return articles.filter((a) => a.author.id === authorId)
}

export function getAuthorTransactions(authorId: string) {
  return transactions.filter((t) => t.authorId === authorId)
}

export function generateTxHash(): string {
  const chars = "0123456789abcdef"
  let hash = "0x"
  for (let i = 0; i < 40; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)]
  }
  return hash
}
