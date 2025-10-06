# BIP-322 Connector

One-click BIP-322 signature verification for Bitcoin wallets with MetaMask-like UX.

## Features

- ✅ **One-click signing** - Simple as MetaMask
- 🔐 **BIP-322 compliant** - Industry standard
- 🎯 **Multi-wallet support** - UniSat, Xverse, Leather, OKX
- ⚛️ **React component** - Drop-in UI widget
- 📦 **TypeScript** - Full type safety
- 🚀 **Zero dependencies** - Lightweight

## Installation

```bash
npm install @reservebtc/bip322-connector
```

## Quick Start

### Vanilla JavaScript

```javascript
import { BIP322Connector, WalletDetector } from '@reservebtc/bip322-connector'

// Detect available wallets
const wallets = WalletDetector.detectAll()
console.log('Available wallets:', wallets)

// Connect and sign
const connector = new BIP322Connector()
await connector.connect('unisat')

const result = await connector.sign(
  'bc1q...',
  'Sign this message'
)

console.log('Signature:', result.signature)
```

### React Component

```tsx
import { BIP322SignButton } from '@reservebtc/bip322-connector'

function MyApp() {
  const handleSigned = (result) => {
    console.log('Signed!', result)
  }

  return (
    <BIP322SignButton
      message="Sign this message"
      onSigned={handleSigned}
    />
  )
}
```

## API Reference

### BIP322Connector

Main class for wallet connection and signing.

**Methods:**

- `connect(walletName: SupportedWallet): Promise<void>` - Connect to wallet
- `sign(address: string, message: string): Promise<BIP322SignatureResult>` - Sign message
- `disconnect(): void` - Disconnect from wallet
- `getWalletName(): SupportedWallet | null` - Get connected wallet

### WalletDetector

Utility for detecting installed wallets.

**Methods:**

- `detectAll(): WalletDetectionResult[]` - Detect all available wallets
- `isInstalled(walletName: SupportedWallet): boolean` - Check if wallet installed
- `getProvider(walletName: SupportedWallet): any` - Get wallet provider
- `getFirstAvailable(): WalletDetectionResult | null` - Get first available wallet

### BIP322SignButton (React)

React component for one-click signing.

**Props:**

- `message: string` - Message to sign
- `onSigned: (result: BIP322SignatureResult) => void` - Success callback
- `onError?: (error: Error) => void` - Error callback (optional)
- `className?: string` - Custom CSS class (optional)
- `style?: React.CSSProperties` - Inline styles (optional)

## Supported Wallets

- UniSat Wallet
- Xverse Wallet
- Leather Wallet (ex-Hiro)
- OKX Wallet

## Examples

See `/examples` directory for complete examples:

- Vanilla JavaScript example
- React example
- Next.js example

## Why BIP-322 Connector?

**Before (6 steps, 2 minutes):**
1. Install wallet
2. Find signing feature
3. Copy message
4. Paste in wallet
5. Sign
6. Copy signature back

**After (1 click, 5 seconds):**
```tsx
<BIP322SignButton message="Sign this" onSigned={handleSign} />
```

## Live Demo

[https://app.reservebtc.io/bip322-demo](https://app.reservebtc.io/bip322-demo)
- **Working Example**: https://app.reservebtc.io/verify (current implementation)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT License - see [LICENSE](LICENSE)

## Credits

Built by [ReserveBTC](https://app.reservebtc.io) team.

Improving Bitcoin DeFi UX, one signature at a time.

---
