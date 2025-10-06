// src/index.ts
// Main entry point for BIP-322 Connector

export { BIP322Connector } from './connector'
export { WalletDetector } from './detector'
export type {
  SupportedWallet,
  BIP322SignatureResult,
  WalletDetectionResult,
  SignMessageParams
} from './types'

// React component (optional import)
export { BIP322SignButton } from './react/BIP322SignButton'
export type { BIP322SignButtonProps } from './react/BIP322SignButton'