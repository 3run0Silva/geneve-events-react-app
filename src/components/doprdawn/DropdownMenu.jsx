import React, { useState } from 'react';
import LoginBtn from '../login/LoginBtn';
import SignUpBtn from '../signup/SignUpBtn';
import './DropdownMenu.css';

const DropdownMenu = ({ isLoggedIn, onLogin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-menu">
      <button onClick={toggleMenu}>Menu</button>
      {isOpen && (
        <div className="dropdown-content">
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

