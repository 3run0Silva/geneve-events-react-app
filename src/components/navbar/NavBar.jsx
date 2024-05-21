import React from 'react';
import DropdownMenu from '../doprdawn/DropdownMenu';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogin, onLogout }) => {
  return (
    <nav className="navbar">
      <h1>My App</h1>
      <DropdownMenu isLoggedIn={isLoggedIn} onLogin={onLogin} onLogout={onLogout} />
    </nav>
  );
};

export default Navbar;

