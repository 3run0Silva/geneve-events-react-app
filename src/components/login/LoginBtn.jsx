import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../services/database/firebase';
import { getDatabase, ref, get } from 'firebase/database';
import AuthModal from '../auth-modal/AuthModal';

const LoginBtn = ({ onLogin }) => {
  const [modalType, setModalType] = useState(null);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);

      // Check if user exists in the database
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        onLogin(user);
        setModalType(null);
      } else {
        setAuthError('Account does not exist. Please sign up.');
        setModalType('nonExistent');
      }
    } catch (error) {
      console.error('Error during sign-in with Google:', error);
      setAuthError('Authentication failed. Please try again.');
    }
  };

  return (
    <>
      <button onClick={handleLogin}>Login</button>
      {authError && <p className="error">{authError}</p>}
      {modalType && (
        <AuthModal 
          user={user} 
          type={modalType} 
          onClose={() => setModalType(null)} 
          onLogin={onLogin}
        />
      )}
    </>
  );
};

export default LoginBtn;

