import React from 'react';
import './Navbar.css';

const Navbar = () => (
  <nav className="top-nav">
    <div className="search-bar">
      <input type="text" placeholder="Search analytics..." />
    </div>
    <div className="user-profile">
      <span>Demo User</span>
      <div className="avatar"></div>
    </div>
  </nav>
);
export default Navbar;