import React from 'react';
import DropdownMenu from '../authentication/dropdown/DropdownMenu';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>GEE</h1>
      <DropdownMenu />
    </nav>
  );
};

export default Navbar;
