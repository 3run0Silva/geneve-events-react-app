import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../services/database/firebase';
import AuthModal from '../auth-modal/AuthModal';
import { getDatabase, ref, get, set } from 'firebase/database';

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

      if (userSnapshot.exists()) {
        // If user exists, show error or log them in
        setAuthError('User already exists. Please log in.');
        onSignUp(user);
      } else {
        // Create new user in the database
        await set(userRef, {
          username: user.displayName,
          email: user.email,
          profile_picture: user.photoURL,
          loginAttempts: 0
        });
        onSignUp(user);
      }
      setModalType(null);
    } catch (error) {
      console.error('Error during sign-up with Google:', error);
      setAuthError('Authentication failed. Please try again.');
    }
  };

  return (
    <>
      <button onClick={handleSignUp}>Register</button>
      {authError && <p className="error">{authError}</p>}
      {modalType && (
        <AuthModal 
          user={user} 
          type={modalType} 
          onClose={() => setModalType(null)} 
          onLogin={onSignUp}
        />
      )}
    </>
  );
};

export default SignUpBtn;
