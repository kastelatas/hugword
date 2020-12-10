import React from 'react'
import SVG from 'react-inlinesvg'
import Nav from "@src/components/Nav";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="logo">
        <SVG src="/icons/logo.svg" />
      </div>
      <Nav />
      <div className="footer__item">
        <span className="footer__policy">Refund policy</span>
        <span className="footer__rights">© All rights reserved | 2020</span>
      </div>
    </footer>
  )
}

export default Footer
