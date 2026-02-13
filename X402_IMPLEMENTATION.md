# x402 Payment Protocol Implementation

This project implements an x402-inspired payment protocol for microtransactions on article content, following patterns from the Stackable repository.

## Overview

x402 is an HTTP-native payment protocol that enables seamless payments for digital content. This implementation includes:

- **Payment Request Handling**: Server-side API endpoints that return 402 Payment Required responses
- **Client-side Payment Processing**: Mock x402 client with payment handling (ready for real implementation)
- **Stacks Blockchain Integration**: Ready for STX payments on the Stacks network

## Current Implementation Status

**Note**: The official x402 packages are not yet publicly available. This implementation uses a mock client that follows the x402 protocol specification and can be easily replaced with the official packages when they become available.

## Architecture

### Payment Flow

1. **Client Request**: User attempts to access premium article content
2. **402 Response**: Server returns `402 Payment Required` with payment requirements
3. **Payment Processing**: Mock x402 client handles payment simulation
4. **Verification**: Server simulates payment verification
5. **Content Access**: User gains access to content after successful payment

### Key Components

#### 1. x402 Client (`/lib/x402.ts`)
- Mock x402 client implementation following protocol specification
- Handles payment requests and verification simulation
- Provides payment requirement generation
- **Ready to replace with official `@x402/core` when available**

#### 2. Wallet Context (`/lib/wallet-context.tsx`)
- Integrates mock x402 client with existing wallet system
- Manages payment state and history
- Handles user authentication and balance tracking

#### 3. API Routes
- `/api/articles/[articleId]/payment-requirements`: Returns payment requirements
- `/api/articles/[articleId]/access`: Payment-protected content endpoint
- `/api/payments/verify/[txHash]`: Payment verification endpoint

#### 4. Frontend Components
- `ArticlePaywall`: Displays payment interface with x402 flow
- Shows payment steps: Requirements → Signing → Verification → Settlement

## Configuration

### Environment Variables

Create a `.env.local` file based on `.env.example`:

```bash
# x402 Payment Protocol Configuration
NEXT_PUBLIC_X402_FACILITATOR_URL=https://api.x402.org
NEXT_PUBLIC_X402_NETWORK=mainnet

# Stacks Configuration
STACKABLE_WALLET_ADDRESS=your_stacks_wallet_address_here
```

## Migration to Official x402 Packages

When the official x402 packages become available, you can replace the mock implementation by:

1. **Install official packages**:
   ```bash
   npm install @x402/core @x402/fetch @x402/stacks
   ```

2. **Update `/lib/x402.ts`**:
   ```typescript
   // Replace mock imports with:
   import { x402Client, wrapFetchWithPayment } from "@x402/fetch"
   import { registerExactStacksScheme } from "@x402/stacks/exact/client"
   import { createStacksSigner } from "@x402/stacks/signer"
   ```

3. **Update client initialization**:
   ```typescript
   // Replace mock client with official implementation
   this.client = new x402Client({
     facilitatorUrl: this.facilitatorUrl,
     network: this.network
   })
   ```

## Usage

### For Article Access

When a user tries to access a premium article:

1. The paywall component checks if the user has paid
2. If not paid, it displays the payment interface
3. User clicks "Pay to Unlock" → Mock x402 payment flow initiates
4. Payment is simulated and content becomes accessible

### Payment Requirements

The system generates payment requirements in the x402 format:

```typescript
{
  scheme: "exact",
  price: "0.01",
  network: "mainnet",
  payTo: "recipient_wallet_address",
  description: "Access to premium article: Article Title",
  mimeType: "application/json"
}
```

## Security Features

- **Payment Verification**: All payments are verified before content access
- **Non-custodial**: Payments go directly from reader to author (when using real blockchain)
- **Transparent**: All transactions recorded on blockchain (in production)
- **Protocol Standard**: Follows x402 open standard for interoperability

## Development Notes

### Mock Implementation

Current implementation uses mock verification for development. Features:

- Simulated payment flow with realistic timing
- Proper 402 Payment Required responses
- Payment requirement generation
- Transaction hash generation

### Testing

To test the payment flow:

1. Connect any wallet (mock implementation works without real STX)
2. Navigate to a premium article
3. Click "Pay to Unlock" to see the x402 flow
4. Content unlocks after simulated payment

## Future Enhancements

- **Official x402 Integration**: Replace mock with official packages
- **Real Blockchain Integration**: Connect to Stacks blockchain
- **Multiple Payment Schemes**: Support for "upto" and other payment schemes
- **Fiat Integration**: Add support for fiat payment methods
- **Subscription Model**: Implement recurring payments for article access
- **Analytics**: Add payment analytics and reporting

## References

- [x402 Protocol Specification](https://github.com/coinbase/x402)
- [Stackable Repository](https://github.com/fozagtx/Stackable)
- [Stacks Blockchain](https://stacks.co/)
