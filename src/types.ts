// src/types.ts
// Type definitions for Bitcoin wallet providers

export interface WalletProvider {
  requestAccounts(): Promise<string[]>
  getAccounts(): Promise<string[]>
  signMessage(params: SignMessageParams): Promise<string>
  getNetwork(): Promise<string>
}

export interface SignMessageParams {
  address: string
  message: string
  protocol?: 'BIP-322' | 'legacy'
}

export interface BIP322SignatureResult {
  address: string
  message: string
  signature: string
  timestamp: number
}

export type SupportedWallet = 'unisat' | 'xverse' | 'leather' | 'okx'

export interface WalletDetectionResult {
  name: SupportedWallet
  installed: boolean
  provider?: any
}

// Window extensions for wallet providers
declare global {
  interface Window {
    unisat?: any
    XverseProviders?: any
    LeatherProvider?: any
    okxwallet?: any
  }
}