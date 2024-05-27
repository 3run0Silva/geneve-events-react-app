import React, { useEffect } from 'react';
import DropdownMenu from '../authentication/dropdown/DropdownMenu';
import './Navbar.css';

const Navbar = () => {

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 50) { 
        navbar.classList.add('scroll');
      } else {
        navbar.classList.remove('scroll');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className="navbar">
      <h1>GEE</h1>
      <DropdownMenu />
    </nav>
  );
};

export default Navbar;
