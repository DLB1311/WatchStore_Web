import React, { useState, useEffect } from 'react';
import '../css/header.css';
import { Link } from 'react-router-dom';
function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        document.getElementById("header").classList.remove("scroll-down");
        document.getElementById("header").classList.add("scroll-up");
      } else {
        document.getElementById("header").classList.remove("scroll-up");
        document.getElementById("header").classList.add("scroll-down");
      }
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    const handleTop = () => {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos === 0) {
        document.getElementById("header").classList.add("scroll-top");
      } else {
        document.getElementById("header").classList.remove("scroll-top");
      }
    };
    window.addEventListener("scroll", handleTop);
    return () => window.removeEventListener("scroll", handleTop);
  }, []);
  
  return (
    <header id="header" >
      <div className="header-left">
        <button class="header-button">
          <div className="logo">
            <img src="../img/logo-bsk.png" alt="Logo" />
            <span class="header-button-text">BSK Watch Official</span>
          </div>
        </button>
      </div>
      <div className="header-right">
      <div className="vertical-divider"/>
        <button class="header-button">Cart</button>
        <div className="vertical-divider"/>
        <Link to="/signup" class="header-button">Sign Up</Link>
        <div className="vertical-divider"/>
        <Link to="/signin" class="header-button">Sign In</Link>
        <div className="vertical-divider"></div>
      </div>

    </header>
  );
}

export default Header;