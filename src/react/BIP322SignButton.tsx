// src/react/BIP322SignButton.tsx
// React component for one-click BIP-322 signing

import React, { useState, useEffect } from 'react'
import { BIP322Connector } from '../connector'
import { WalletDetector } from '../detector'
import { SupportedWallet, BIP322SignatureResult } from '../types'

export interface BIP322SignButtonProps {
  message: string
  onSigned: (result: BIP322SignatureResult) => void
  onError?: (error: Error) => void
  className?: string
  style?: React.CSSProperties
}

export const BIP322SignButton: React.FC<BIP322SignButtonProps> = ({
  message,
  onSigned,
  onError,
  className = '',
  style = {}
}) => {
  const [availableWallets, setAvailableWallets] = useState<SupportedWallet[]>([])
  const [selectedWallet, setSelectedWallet] = useState<SupportedWallet | null>(null)
  const [signing, setSigning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Detect available wallets on mount
  useEffect(() => {
    const detected = WalletDetector.detectAll()
    const walletNames = detected.map(w => w.name)
    setAvailableWallets(walletNames)
    
    // Auto-select first wallet if only one available
    if (walletNames.length === 1) {
      setSelectedWallet(walletNames[0])
    }
  }, [])

  const handleSign = async (walletName: SupportedWallet) => {
    setSigning(true)
    setError(null)

    try {
      const connector = new BIP322Connector()
      
      // Connect to wallet
      await connector.connect(walletName)
      
      // Get user's Bitcoin address
      const provider = WalletDetector.getProvider(walletName)
      let address: string
      
      switch (walletName) {
        case 'unisat':
          const accounts = await provider.getAccounts()
          address = accounts[0]
          break
        case 'xverse':
          const xverseAccounts = await provider.request('getAccounts', null)
          address = xverseAccounts[0].address
          break
        case 'leather':
          const leatherAccounts = await provider.getAccounts()
          address = leatherAccounts[0].address
          break
        case 'okx':
          const okxAccounts = await provider.getAccounts()
          address = okxAccounts[0]
          break
        default:
          throw new Error(`Unsupported wallet: ${walletName}`)
      }

      // Sign message
      const result = await connector.sign(address, message)
      
      // Success callback
      onSigned(result)
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      
      if (onError) {
        onError(err instanceof Error ? err : new Error(errorMessage))
      }
    } finally {
      setSigning(false)
    }
  }

  // No wallets detected
  if (availableWallets.length === 0) {
    return (
      <div className={`bip322-no-wallet ${className}`} style={style}>
        <p>No Bitcoin wallet detected</p>
        <p>Please install UniSat, Xverse, Leather, or OKX wallet</p>
      </div>
    )
  }

  return (
    <div className={`bip322-sign-widget ${className}`} style={style}>
      {availableWallets.length === 1 ? (
        // Single wallet - one-click signing
        <button
          onClick={() => handleSign(availableWallets[0])}
          disabled={signing}
          className="bip322-sign-button"
        >
          {signing ? 'Signing...' : `Sign with ${availableWallets[0]}`}
        </button>
      ) : (
        // Multiple wallets - show selection
        <div className="bip322-wallet-selector">
          <p>Sign with Bitcoin wallet:</p>
          {availableWallets.map(wallet => (
            <button
              key={wallet}
              onClick={() => handleSign(wallet)}
              disabled={signing}
              className="bip322-wallet-button"
            >
              {signing && selectedWallet === wallet 
                ? 'Signing...' 
                : `Sign with ${wallet}`}
            </button>
          ))}
        </div>
      )}
      
      {error && (
        <div className="bip322-error">
          Error: {error}
        </div>
      )}
    </div>
  )
}