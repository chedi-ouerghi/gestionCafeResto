import React from 'react';
import { Link } from 'react-router-dom';
import './css/Navbar.css';

function Navbar({ user, onLogout }) {
  console.log("User in Navbar:", user);  // Debugging

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link className="navbar-link" to="/">
          <span>RestoCafé</span>
        </Link>
      </div>
      <div className="navbar-right">
        {user ? (
          <>
            <span className="navbar-username">{user.name}</span>
            {user.role === 'patron' && (
              <>
                <Link className="navbar-link" to="/homeAd">Home Ad</Link>
                <Link className="navbar-link" to="/statistics">Statistics</Link>
              </>
            )}
            <button className="navbar-button" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="navbar-link" to="/login">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
