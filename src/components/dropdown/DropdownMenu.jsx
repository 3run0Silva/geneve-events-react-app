// src/components/dropdown/DropdownMenu.jsx

import React, { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
import { auth, googleProvider } from '../../services/database/firebase';
import AuthModal from '../auth-modal/AuthModal';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation
import { useAuth } from '../../context/AuthContext';
import './DropdownMenu.css';

const DropdownMenu = () => {
  const { user, login, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleGoogleSignIn = async (isRegistering = false) => {
    setIsOpen(false);
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        if (isRegistering) {
          setModalData({
            message: 'Account already exists. Do you want to log in?',
            onConfirm: () => {
              login(user);
              setAlertMessage('Logged in successfully!');
              closeModal();
            },
            onCancel: closeModal,
            confirmText: 'Log In',
            cancelText: 'Cancel'
          });
        } else {
          login(user);
        }
      } else {
        if (isRegistering) {
          await set(userRef, {
            username: user.displayName,
            email: user.email,
            profile_picture: user.photoURL,
            loginAttempts: 0,
            accountType: 'google'
          });
          login(user);
          setAlertMessage('Your account was created successfully! Thank you for registering with us.');
        } else {
          setModalData({
            message: 'Account does not exist. Do you want to register?',
            onConfirm: async () => {
              await set(userRef, {
                username: user.displayName,
                email: user.email,
                profile_picture: user.photoURL,
                loginAttempts: 0,
                accountType: 'google'
              });
              login(user);
              setAlertMessage('Your account was created successfully! Thank you for registering with us.');
              closeModal();
            },
            onCancel: closeModal,
            confirmText: 'Register',
            cancelText: 'Cancel'
          });
        }
      }
    } catch (error) {
      if (error.code !== 'auth/cancelled-popup-request') {
        console.error('Google sign-in error:', error);
        setModalData({
          message: 'An error occurred during Google sign-in. Please try again.',
          onConfirm: closeModal,
          onCancel: closeModal,
          confirmText: 'Ok',
          cancelText: 'Cancel'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    if (location.pathname === '/profile') {
      navigate('/');
    }
  };

  const closeModal = () => {
    setModalData(null);
  };

  const closeAlert = () => {
    setAlertMessage('');
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest('.alert')) {
      closeAlert();
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsOpen(false);
  };

  const handleHomeClick = () => {
    navigate('/');
    setIsOpen(false);
  };

  return (
    <div className="dropdown-menu">
      <button onClick={toggleMenu}>
        {user ? (
          <>
            <img src={user.photoURL} alt="avatar" className="avatar" />
            {user.displayName}
          </>
        ) : (
          'Account'
        )}
        <span style={{ marginLeft: '8px' }}>▼</span>
      </button>
      <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
        {user ? (
          <>
            {location.pathname !== '/profile' ? (
              <button onClick={handleProfileClick}>Profile</button>
            ) : (
              <button onClick={handleHomeClick}>Home</button>
            )}
            <button>Settings</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => handleGoogleSignIn(false)} disabled={isLoading}>Login</button>
            <button onClick={() => handleGoogleSignIn(true)} disabled={isLoading}>Register</button>
          </>
        )}
      </div>
      {modalData && (
        <AuthModal
          message={modalData.message}
          onConfirm={modalData.onConfirm}
          onCancel={modalData.onCancel}
          confirmText={modalData.confirmText}
          cancelText={modalData.cancelText}
        />
      )}
      {alertMessage && (
        <div className="alert-overlay" onClick={handleOutsideClick}>
          <div className="alert">
            <p>{alertMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
