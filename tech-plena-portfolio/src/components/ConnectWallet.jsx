import React, { useEffect, useState } from 'react'
import "../styles/Header.css"

const shortAddr = (addr) => (addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '')

const ConnectWallet = () => {
  const [address, setAddress] = useState(null)
  const [balance, setBalance] = useState(null)
  const [chainId, setChainId] = useState(null)

  useEffect(() => {
    if (!window.ethereum) return

    const handleAccounts = (accounts) => {
      if (accounts && accounts.length) setAddress(accounts[0])
      else {
        setAddress(null)
        setBalance(null)
      }
    }

    const handleChain = (chain) => setChainId(chain)

    window.ethereum.on('accountsChanged', handleAccounts)
    window.ethereum.on('chainChanged', handleChain)

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccounts)
        window.ethereum.removeListener('chainChanged', handleChain)
      }
    }
  }, [])

  const formatWeiHexToEth = (hex) => {
    try {
      const wei = BigInt(hex)
      const s = wei.toString()
      if (s.length <= 18) {
        const frac = s.padStart(18, '0').slice(0, 4)
        return `0.${frac.replace(/0+$/, '') || '0'}`
      }
      const intPart = s.slice(0, -18)
      const fracPart = s.slice(-18, -14) // 4 decimals
      return `${intPart}.${fracPart.replace(/0+$/, '') || '0'}`
    } catch (e) {
      return null
    }
  }

  useEffect(() => {
    if (!address || !window.ethereum) return
    window.ethereum
      .request({ method: 'eth_getBalance', params: [address, 'latest'] })
      .then((hex) => {
        setBalance(formatWeiHexToEth(hex))
      })
      .catch(() => setBalance(null))
  }, [address])

  const connect = async () => {
    try {
      if (!window.ethereum) {
        window.open('https://metamask.io/download.html', '_blank')
        return
      }
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts && accounts.length) setAddress(accounts[0])
    } catch (err) {
      console.error('connect error', err)
    }
  }

  const disconnect = () => {
    setAddress(null)
    setBalance(null)
  }

  return (
    <div className="wallet-wrapper">
      {!address ? (
        <button className="connect-wallet-btn" onClick={connect}>
          <span>Connect Wallet</span>
        </button>
      ) : (
        <div className="wallet-info">
          <div className="wallet-meta">
            <span className="wallet-address">{shortAddr(address)}</span>
            <span className="wallet-balance">{balance ? parseFloat(balance).toFixed(4) + ' ETH' : '—'}</span>
          </div>
          <button className="wallet-disconnect-btn" onClick={disconnect}>Disconnect</button>
        </div>
      )}
    </div>
  )
}

export default ConnectWallet
