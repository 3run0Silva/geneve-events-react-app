import React, { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../services/database/firebase';
import { getDatabase, ref, get, set } from 'firebase/database';
import AuthModal from '../auth-modal/AuthModal';
import { useNotification } from '../../../context/NotificationContext';

const LoginBtn = ({ onLogin, onAuthInitiate }) => {
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  useEffect(() => {
    console.log('Modal data updated:', modalData);
  }, [modalData]); // Log the modal data whenever it changes

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    onAuthInitiate();
    try {
      console.log('Initiating Google Sign-In');
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        console.log('User exists:', user);
        onLogin(user);
        showNotification('Logged in successfully', 'success');
      } else {
        console.log('User does not exist, showing modal');
        setModalData({
          message: 'Account does not exist. Do you want to register?',
          onConfirm: async () => {
            console.log('Registering new user:', user);
            await set(userRef, {
              username: user.displayName,
              email: user.email,
              profile_picture: user.photoURL,
              loginAttempts: 0,
              accountType: 'google'
            });
            onLogin(user);
            showNotification('Your account was created successfully! Thank you for registering with us.', 'success');
            closeModal();
          },
          onCancel: () => {
            console.log('User canceled registration');
            closeModal();
          },
          confirmText: 'Register',
          cancelText: 'Cancel'
        });
        console.log('Modal data set:', modalData); 
      }
    } catch (error) {
      console.error('Error during sign-in with Google:', error);
      showNotification('Authentication failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <>
      <button onClick={handleGoogleSignIn} disabled={isLoading}>Login</button>
      {modalData && (
        <AuthModal
          message={modalData.message}
          onConfirm={modalData.onConfirm}
          onCancel={modalData.onCancel}
          confirmText={modalData.confirmText}
          cancelText={modalData.cancelText}
        />
      )}
    </>
  );
};

export default LoginBtn;
