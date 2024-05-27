import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../services/database/firebase';
import AuthModal from '../auth-modal/AuthModal';
import { getDatabase, ref, get, set } from 'firebase/database';
import { useNotification } from '../../context/NotificationContext';

const SignUpBtn = ({ onSignUp }) => {
  const [modalType, setModalType] = useState(null);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const { showNotification } = useNotification();

  const handleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        setAuthError('User already exists. Please log in.');
        showNotification('User already exists. Please log in.', 'error');
        onSignUp(user);
      } else {
        await set(userRef, {
          username: user.displayName,
          email: user.email,
          profile_picture: user.photoURL,
          loginAttempts: 0
        });
        onSignUp(user);
        showNotification('Your account was created successfully!', 'success');
      }
      setModalType(null);
    } catch (error) {
      console.error('Error during sign-up with Google:', error);
      setAuthError('Authentication failed. Please try again.');
      showNotification('Authentication failed. Please try again.', 'error');
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
