// src/detector.ts
// Wallet detection and availability checker

import { SupportedWallet, WalletDetectionResult } from './types'

export class WalletDetector {
  /**
   * Detect all available Bitcoin wallets in the browser
   */
  static detectAll(): WalletDetectionResult[] {
    const wallets: WalletDetectionResult[] = []

    // UniSat Wallet
    if (typeof window !== 'undefined' && window.unisat) {
      wallets.push({
        name: 'unisat',
        installed: true,
        provider: window.unisat
      })
    }

    // Xverse Wallet
    if (typeof window !== 'undefined' && window.XverseProviders) {
      wallets.push({
        name: 'xverse',
        installed: true,
        provider: window.XverseProviders
      })
    }

    // Leather Wallet
    if (typeof window !== 'undefined' && window.LeatherProvider) {
      wallets.push({
        name: 'leather',
        installed: true,
        provider: window.LeatherProvider
      })
    }

    // OKX Wallet
    if (typeof window !== 'undefined' && window.okxwallet?.bitcoin) {
      wallets.push({
        name: 'okx',
        installed: true,
        provider: window.okxwallet.bitcoin
      })
    }

    return wallets
  }

  /**
   * Check if a specific wallet is installed
   */
  static isInstalled(walletName: SupportedWallet): boolean {
    const detected = this.detectAll()
    return detected.some(w => w.name === walletName && w.installed)
  }

  /**
   * Get the provider for a specific wallet
   */
  static getProvider(walletName: SupportedWallet): any {
    const detected = this.detectAll()
    const wallet = detected.find(w => w.name === walletName)
    return wallet?.provider
  }

  /**
   * Get the first available wallet
   */
  static getFirstAvailable(): WalletDetectionResult | null {
    const wallets = this.detectAll()
    return wallets.length > 0 ? wallets[0] : null
  }
}