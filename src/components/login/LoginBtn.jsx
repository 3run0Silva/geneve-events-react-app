import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../services/database/firebase';
import { getDatabase, ref, get } from 'firebase/database';
import AuthModal from '../auth-modal/AuthModal';
import bcrypt from 'bcryptjs';

const LoginBtn = ({ onLogin }) => {
  const [modalType, setModalType] = useState(null);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState(null);

  const handleLogin = async () => {
    if (lockUntil && new Date() < lockUntil) {
      setAuthError(`Account locked. Try again after ${lockUntil.toLocaleTimeString()}.`);
      return;
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);

      // Check if user exists in the database
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        setModalType('password');
      } else {
        setModalType('nonExistent');
      }
    } catch (error) {
      console.error('Error during sign-in with Google:', error);
      setAuthError('Authentication failed. Please try again.');
    }
  };

  const handleClose = () => {
    setModalType(null);
  };

  const handleRegister = (user, type) => {
    setUser(user);
    setModalType(type);
  };

  const handlePasswordSubmit = async (password) => {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + user.uid);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();

    const isPasswordCorrect = bcrypt.compareSync(password, userData.password);

    // Check password
    if (isPasswordCorrect) {
      onLogin(user);
      setLoginAttempts(0);
      handleClose();
    } else {
      setLoginAttempts((prev) => prev + 1);
      if (loginAttempts >= 2) {
        setLockUntil(new Date(new Date().getTime() + 60 * 60 * 1000));
        setAuthError('Account locked due to too many failed attempts. Try again in 1 hour.');
        console.error('Account locked due to too many failed attempts. Try again in 1 hour.');
      } else {
        const errorMsg = `Incorrect password. ${3 - loginAttempts - 1} attempts left.`;
        console.error(errorMsg);
        setAuthError(errorMsg);
      }
      throw new Error(authError);
    }
  };

  return (
    <>
      <button onClick={handleLogin}>Sign in with Google</button>
      {authError && <p className="error">{authError}</p>}
      {modalType && (
        <AuthModal 
          user={user} 
          type={modalType} 
          onClose={handleClose} 
          onLogin={handleRegister} 
          onPasswordSubmit={handlePasswordSubmit}
        />
      )}
    </>
  );
};

export default LoginBtn;
