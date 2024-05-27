import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../services/database/firebase';
import { getDatabase, ref, get } from 'firebase/database';
import AuthModal from '../auth-modal/AuthModal';
import { useNotification } from '../../context/NotificationContext';

const LoginBtn = ({ onLogin }) => {
  const [modalType, setModalType] = useState(null);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const { showNotification } = useNotification();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setUser(user);

      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        onLogin(user);
        setModalType(null);
      } else {
        setAuthError('Account does not exist. Please sign up.');
        setModalType('nonExistent');
        showNotification('Account does not exist. Please sign up.', 'error');
      }
    } catch (error) {
      console.error('Error during sign-in with Google:', error);
      setAuthError('Authentication failed. Please try again.');
      showNotification('Authentication failed. Please try again.', 'error');
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

