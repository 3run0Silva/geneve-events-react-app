import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../services/database/firebase';
import AuthModal from '../auth-modal/AuthModal';
import { getDatabase, ref, get } from 'firebase/database';
import bcrypt from 'bcryptjs';

const SignUpBtn = ({ onSignUp }) => {
  const [modalType, setModalType] = useState(null);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');

  const handleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Check if the user already exists in the database
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);
      const userSnapshot = await get(userRef);

      // Show the existing account error modal
      if (userSnapshot.exists()) {
        setUser(user);
        setModalType('existingAccount'); 
        return;
      }

      // Show the sign-up modal
      setUser(user);
      setModalType('signUp');
    } catch (error) {
      console.error('Error during sign-up with Google:', error);
      setAuthError('Authentication failed. Please try again.');
    }
  };

  const handleClose = () => {
    setModalType(null);
  };

  const handleExistingAccountLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Checking if user exists in the database
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        setUser(user);
        setModalType('password'); 
      } else {
        setAuthError('Account does not exist. Please sign up.');
      }
    } catch (error) {
      console.error('Error during sign-in with Google:', error);
      setAuthError('Authentication failed. Please try again.');
    }
  };

  const handlePasswordSubmit = async (password) => {
    const db = getDatabase();
    const userRef = ref(db, 'users/' + user.uid);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();

    const isPasswordCorrect = bcrypt.compareSync(password, userData.password);

    if (isPasswordCorrect) {
      onSignUp(user);
      setModalType(null);
    } else {
      const errorMsg = 'Incorrect password.';
      console.error(errorMsg);
      setAuthError(errorMsg);
      setPassword('');
    }
  };

  return (
    <>
      <button onClick={handleSignUp}>Sign Up with Google</button>
      {authError && <p className="error">{authError}</p>}
      {modalType && (
        <AuthModal 
          user={user} 
          type={modalType} 
          onClose={handleClose} 
          onLogin={onSignUp} 
          onPasswordSubmit={handlePasswordSubmit} 
          onExistingAccountLogin={handleExistingAccountLogin}
        />
      )}
    </>
  );
};

export default SignUpBtn;