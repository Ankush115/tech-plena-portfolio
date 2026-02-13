import React from 'react'
import "../styles/Header.css"
import ConnectWallet from './ConnectWallet'

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">📈 Portfolio</h1>
        </div>
        <ConnectWallet />
      </div>
    </header>
  )
}

export default Header