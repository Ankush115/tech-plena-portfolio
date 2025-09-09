import React from 'react'
import "../App.css"

const Header = () => {
  return (
    <>
    <header>
        <p> <img src="token.png" alt="" />Token Portfolio</p>
        <button id='connect-wallet-btn'> <img src="./button.png" alt="" />Connect Wallet</button>
    </header>
    </>
  )
}

export default Header