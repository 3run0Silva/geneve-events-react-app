import React, { useState, useRef, useEffect } from 'react';
import LoginBtn from '../login/LoginBtn';
import SignUpBtn from '../signup/SignUpBtn';
import './DropdownMenu.css';

const DropdownMenu = ({ isLoggedIn, onLogin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alignLeft, setAlignLeft] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const isOffScreenRight = rect.right > window.innerWidth;
      setAlignLeft(isOffScreenRight);
    }
  }, [isOpen]);

  return (
    <div className="dropdown-menu">
      <button onClick={toggleMenu}>Menu</button>
      {isOpen && (
        <div
          className={`dropdown-content ${alignLeft ? 'left-aligned' : ''}`}
          ref={dropdownRef}
        >
          {isLoggedIn ? (
            <>
              <button>Profile</button>
              <button>Settings</button>
              <button onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <LoginBtn onLogin={onLogin} />
              <SignUpBtn onSignUp={onLogin} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
