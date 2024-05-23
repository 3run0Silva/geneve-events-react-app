import React from 'react';
import DropdownMenu from '../doprdown/DropdownMenu';
import './Navbar.css';

const Navbar = ({ isLoggedIn, user, onLogin, onLogout }) => {
  return (
    <nav className="navbar">
      <h1>GEE</h1>
      <DropdownMenu isLoggedIn={isLoggedIn} user={user} onLogin={onLogin} onLogout={onLogout} />
    </nav>
  );
};

export default Navbar;

