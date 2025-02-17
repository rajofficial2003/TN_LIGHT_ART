import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/Logo/1.png';
import './header.css';

const Header = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { title: 'Home', link: '/' },
    { title: 'Upload Your Logo', link: '/upload-logo' },
    { title: 'Gallery', link: '/gallery' },
    { title: 'Custom Neon', link: '/custom-neon' },
    { title: 'Contact', link: '/contact' }
  ];

  return (
    <header className="header-container">
      <nav className="nav">
        <div className="logo-container">
          <img className='logo' src={logo || "/placeholder.svg"} alt="TN Light Arts Logo" />
        </div>
        
        <ul className="desktop-nav">
          {navItems.map((item, index) => (
            <li key={index} className="desktop-nav-item">
              <Link to={item.link}>{item.title}</Link>
            </li>
          ))}
        </ul>

        <div className="icons-container">
          <button className="icon">♡</button>
          <button className="icon" onClick={toggleSidebar}>🛒</button>
          <Link target='blank' style={{ textDecoration: "none" }} to="/login">
            <button className="icon d-none d-lg-block">Sign In</button>
          </Link>
          <button className="menu-button" onClick={toggleMenu}>
            <span>☰</span>
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <div className="mobile-header">
          <img className='logo' src={logo || "/placeholder.svg"} alt="TN Light Arts Logo" />
          <div className="mobile-icons-container d-flex">
            <button className="icon">♡</button>
            <button className="icon" onClick={toggleSidebar}>🛒</button>
          </div>
          <button className="back-button" onClick={toggleMenu}>←</button>
        </div>

        <div className="welcome-section">
          <span>Welcome</span>
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <button className="login-button">Login / Register</button>
          </Link>
        </div>

        {navItems.map((item, index) => (
          <div key={index} className="mobile-nav-item">
            <Link to={item.link} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="mobile-nav-header">
                <span className="nav-title">{item.title}</span>
                <span className="expand-icon">+</span>
              </div>
            </Link>
          </div>
        ))}

        <div className="bottom-nav">
          <div className="bottom-nav-item">
            <span>👤</span>
            <span>MY ACCOUNT</span>
          </div>
          <div className="bottom-nav-item">
            <span>📦</span>
            <span>TRACK ORDER</span>
          </div>
          <div className="brand-bar">
            TN LIGHT ARTS | CUSTOM SIGNS
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
