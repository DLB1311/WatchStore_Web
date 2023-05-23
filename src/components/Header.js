import React, { useState, useEffect } from 'react';
import '../css/header.css';
import { Link } from 'react-router-dom';
import API from '../services/api';

const Header = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [customer, setCustomer] = useState('');

  useEffect(() => {
    async function fetchData() {

      const token = getCookie('token');
      if (!token) {
        setCustomer(null)
        return;
    }
      try {
        const response = await API.get('/account/get-cus', {
          headers: { Authorization: `Bearer ${token}` },
      });
        setCustomer(response.data);

      } catch (error) {
        console.log('Error:', error);
        setCustomer(null);
      }
    }
    fetchData();
  }, []);

  const getCookie = (name) => {
    const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
    return cookieValue ? cookieValue.pop() : '';
};
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



  return (
    <header id="header" class="scroll-top">
      <div className="header-left">
        <Link to="/home" class="header-button">
          <div className="logo">

            <img src="/img/logo-bsk.png" alt="Logo" />

            <span class="header-button-text">BSK Watch Official</span>
          </div>
        </Link>
      </div>
      <div className="header-right">
        <div className="vertical-divider" />
        {!customer ? (
          <>
            <Link to="/watchlist" class="header-button">Dicover</Link>
            <div className="vertical-divider" />
            <Link to="/cart" class="header-button">Cart</Link>
            <div className="vertical-divider" />
            <Link to="/signup" class="header-button">Sign Up</Link>
            <div className="vertical-divider" />
            <Link to="/signin" class="header-button">Sign In</Link>
            <div className="vertical-divider" />

          </>
        ) : (
            <>
            <Link to="/watchlist" class="header-button">Dicover</Link>
            <div className="vertical-divider" />
            <Link to="/cart" class="header-button">Cart</Link>
            <div className="vertical-divider" />
            <Link to="/order" class="header-button">User</Link>
            <div className="vertical-divider" />
            </>
        )}
      </div>

    </header>
  );
}

export default Header;