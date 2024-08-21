import React from 'react';
import './Header.css';
import logo from '../assets/logo.jpeg'; // Adjust the path as necessary

const Header = () => {
  return (
    <header className="header">
      <h1>QUANTASIP USER MANAGEMENT</h1>
      <img src={logo} alt="Company Logo" className="logo" />
    </header>
  );
};

export default Header;
