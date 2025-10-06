// src/connector.ts
// Main BIP-322 connector class

import { SupportedWallet, BIP322SignatureResult, SignMessageParams } from './types'
import { WalletDetector } from './detector'

export class BIP322Connector {
  private walletName: SupportedWallet | null = null
  private provider: any = null

  /**
   * Connect to a specific wallet
   */
  async connect(walletName: SupportedWallet): Promise<void> {
    // Check if wallet is installed
    if (!WalletDetector.isInstalled(walletName)) {
      throw new Error(`${walletName} wallet is not installed`)
    }

    // Get provider
    this.provider = WalletDetector.getProvider(walletName)
    this.walletName = walletName

    // Request account access
    try {
      await this.provider.requestAccounts()
    } catch (error) {
      throw new Error(`Failed to connect to ${walletName}: ${error}`)
    }
  }

  /**
   * Sign a message using BIP-322
   */
  async sign(address: string, message: string): Promise<BIP322SignatureResult> {
    if (!this.provider) {
      throw new Error('No wallet connected. Call connect() first.')
    }

    try {
      let signature: string

      // Different wallets have different APIs
      switch (this.walletName) {
        case 'unisat':
          signature = await this.provider.signMessage(message, 'bip322-simple')
          break

        case 'xverse':
          const response = await this.provider.request('signMessage', {
            address,
            message,
            protocol: 'BIP322'
          })
          signature = response.signature
          break

        case 'leather':
          const result = await this.provider.signMessage({
            message,
            paymentType: 'p2wpkh'
          })
          signature = result.signature
          break

        case 'okx':
          signature = await this.provider.signMessage(message, {
            from: address
          })
          break

        default:
          throw new Error(`Unsupported wallet: ${this.walletName}`)
      }

      return {
        address,
        message,
        signature,
        timestamp: Date.now()
      }
    } catch (error) {
      throw new Error(`Failed to sign message: ${error}`)
    }
  }

  /**
   * Get connected wallet name
   */
  getWalletName(): SupportedWallet | null {
    return this.walletName
  }

  /**
   * Disconnect from wallet
   */
  disconnect(): void {
    this.provider = null
    this.walletName = null
  }
}