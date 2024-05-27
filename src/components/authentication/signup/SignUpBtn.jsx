import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';
import { auth, googleProvider } from '../../../services/database/firebase';
import { useNotification } from '../../../context/NotificationContext';
import AuthModal from '../auth-modal/AuthModal';

const SignUpBtn = ({ onRegister, onAuthInitiate }) => {
  const [modalData, setModalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    onAuthInitiate();
    try {
      console.log('Initiating Google Sign-Up');
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        console.log('User already exists, showing modal');
        setModalData({
          message: 'Account already exists. Do you want to log in?',
          onConfirm: () => {
            console.log('Logging in existing user:', user);
            onRegister(user);
            showNotification('Logged in successfully', 'success');
            closeModal();
          },
          onCancel: () => {
            console.log('User canceled login');
            closeModal();
          },
          confirmText: 'Log In',
          cancelText: 'Cancel'
        });
      } else {
        console.log('User does not exist, creating account');
        await set(userRef, {
          username: user.displayName,
          email: user.email,
          profile_picture: user.photoURL,
          loginAttempts: 0,
          accountType: 'google'
        });
        onRegister(user);
        showNotification('Your account was created successfully! Thank you for registering with us.', 'success');
      }
    } catch (error) {
      console.error('Google sign-up error:', error);
      showNotification('Google sign-up error. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <>
      <button onClick={handleGoogleSignUp} disabled={isLoading}>Register</button>
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

export default SignUpBtn;