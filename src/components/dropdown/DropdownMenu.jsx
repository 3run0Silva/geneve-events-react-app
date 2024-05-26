import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
import { auth, googleProvider } from '../../services/database/firebase';
import AuthModal from '../auth-modal/AuthModal';
import './DropdownMenu.css';

const DropdownMenu = ({ isLoggedIn, user, onLogin, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleGoogleSignIn = async (isRegistering = false) => {
    setIsOpen(false);  // Close the dropdown menu
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if the user already exists in the database
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        if (isRegistering) {
          setModalData({
            message: 'Account already exists. Do you want to log in?',
            onConfirm: () => {
              onLogin(user);
              setAlertMessage('Logged in successfully!');
              closeModal();
            },
            onCancel: closeModal,
            confirmText: 'Log In',
            cancelText: 'Cancel'
          });
        } else {
          onLogin(user);
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
          onLogin(user);
          setAlertMessage('Registered successfully!');
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
              onLogin(user);
              setAlertMessage('Registered successfully!');
              closeModal();
            },
            onCancel: closeModal,
            confirmText: 'Register',
            cancelText: 'Cancel'
          });
        }
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      setModalData({
        message: 'An error occurred during Google sign-in. Please try again.',
        onConfirm: closeModal,
        onCancel: closeModal,
        confirmText: 'Ok',
        cancelText: 'Cancel'
      });
    }
  };

  const handleLogout = () => {
    onLogout();
    setIsOpen(false);  // Close the dropdown menu
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

  return (
    <div className="dropdown-menu">
      <button onClick={toggleMenu}>
        {isLoggedIn && user ? (
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
        {isLoggedIn ? (
          <>
            <button>Profile</button>
            <button>Settings</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => handleGoogleSignIn(false)}>Login</button>
            <button onClick={() => handleGoogleSignIn(true)}>Register</button>
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
