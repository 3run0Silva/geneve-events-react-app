import React, { useState, useRef, useEffect } from 'react';
import LoginBtn from '../login/LoginBtn';
import SignUpBtn from '../signup/SignUpBtn';
import './DropdownMenu.css';

const DropdownMenu = ({ isLoggedIn, user, onLogin, onLogout }) => {
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
      <button onClick={toggleMenu}>
        {isLoggedIn && user ? (
          <>
            <img src={user.photoURL} alt="avatar" className="avatar" />
            {user.displayName}
          </>
        ) : (
          'User'
        )}
        <span style={{ marginLeft: '8px' }}>▼</span>
      </button>
      <div
        className={`dropdown-content ${isOpen ? 'show' : ''} ${alignLeft ? 'left-aligned' : ''}`}
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
    </div>
  );
};

export default DropdownMenu;
