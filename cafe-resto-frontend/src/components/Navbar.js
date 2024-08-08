import React from 'react';
import './css/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span>RestoCafé</span>
      </div>
      <div className="navbar-right">
        <span className="navbar-username">Chedi Ouerghi</span>
      </div>
    </nav>
  );
}

export default Navbar;
