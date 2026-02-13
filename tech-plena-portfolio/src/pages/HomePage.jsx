import React, { useState } from 'react'
import "../styles/HomePage.css"

const HomePage = () => {
  const [walletConnected, setWalletConnected] = useState(false)

  // Mock data
  const portfolioData = {
    totalValue: 12543.89,
    dayChange: 234.56,
    dayChangePercent: 1.89,
    tokens: [
      { id: 1, name: 'Bitcoin', symbol: 'BTC', amount: 0.5, value: 22500, change: 5.2 },
      { id: 2, name: 'Ethereum', symbol: 'ETH', amount: 5.2, value: 11700, change: 3.4 },
    ]
  }

  return (
    <main className="home-page">
      {!walletConnected ? (
        <div className='wallet-prompt'>
          <div className='wallet-prompt-content'>
            <h2>Welcome to Your Portfolio</h2>
            <p>Connect your wallet to view and manage your token portfolio</p>
            <button className='prompt-connect-btn'>Connect Wallet</button>
          </div>
        </div>
      ) : (
        <div className="portfolio-container">
          {/* Portfolio Summary */}
          <div className='portfolio-summary'>
            <div className='summary-card'>
              <h3>Total Portfolio Value</h3>
              <p className='portfolio-value'>${portfolioData.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              <p className={`portfolio-change ${portfolioData.dayChangePercent >= 0 ? 'positive' : 'negative'}`}>
                {portfolioData.dayChangePercent >= 0 ? '+' : ''}{portfolioData.dayChangePercent}% Today
              </p>
            </div>
            <div className='summary-card'>
              <h3>24h Change</h3>
              <p className='change-value'>${portfolioData.dayChange.toFixed(2)}</p>
              <p className={`portfolio-change ${portfolioData.dayChangePercent >= 0 ? 'positive' : 'negative'}`}>
                {portfolioData.dayChangePercent >= 0 ? '📈' : '📉'}
              </p>
            </div>
          </div>

          {/* Tokens List */}
          <div className='tokens-section'>
            <h3 className='section-title'>Your Tokens</h3>
            <div className='tokens-list'>
              {portfolioData.tokens.map(token => (
                <div key={token.id} className='token-card'>
                  <div className='token-info'>
                    <div>
                      <h4>{token.name}</h4>
                      <p className='symbol'>{token.symbol}</p>
                    </div>
                  </div>
                  <div className='token-amount'>
                    <p className='amount'>{token.amount} {token.symbol}</p>
                  </div>
                  <div className='token-value'>
                    <p className='value'>${token.value.toLocaleString('en-US')}</p>
                    <p className={`change ${token.change >= 0 ? 'positive' : 'negative'}`}>
                      {token.change >= 0 ? '+' : ''}{token.change}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Token */}
          <div className='add-token-section'>
            <h3 className='section-title'>Add Token</h3>
            <div className='add-token-card'>
              <input type='text' placeholder='Enter token address or symbol' />
              <button className='add-token-btn'>+ Add Token</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default HomePage