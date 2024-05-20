import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../services/database/firebase';
import { getDatabase, ref, get } from 'firebase/database';
import bcrypt from 'bcryptjs';
import PasswordModal from '../password-modal/PasswordModal';
import SignUpModal from '../signup/signup-modal/SignUpModal';

const LoginBtn = ({ onLogin }) => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('User signed in: ', user);

      // Check if user exists in the database
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        console.log('User exists in the database:', userSnapshot.val());
        setUser(user);
        setShowPasswordModal(true);
      } else {
        console.log('User does not exist, showing sign-up modal');
        setUser(user);
        setShowSignUpModal(true);
      }
    } catch (error) {
      console.error('Error during sign-in with Google: ', error);
    }
  };

  const handleSignUp = (user) => {
    onLogin(user);
    setShowSignUpModal(false);
  };

  const handlePasswordSubmit = async (password) => {
    // Verify password
    const db = getDatabase();
    const userRef = ref(db, 'users/' + user.uid);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val();

    const isPasswordCorrect = bcrypt.compareSync(password, userData.password);

    if (isPasswordCorrect) {
      onLogin(user);
    } else {
      alert('Incorrect password. Please try again.');
    }
    setShowPasswordModal(false);
  };

  return (
    <>
      <button onClick={handleLogin}>Sign in with Google</button>
      {showSignUpModal && (
        <SignUpModal 
          user={user} 
          onClose={() => setShowSignUpModal(false)} 
          onSignUp={handleSignUp} 
        />
      )}
      {showPasswordModal && (
        <PasswordModal 
          user={user} 
          onClose={() => setShowPasswordModal(false)} 
          onPasswordSubmit={handlePasswordSubmit} 
        />
      )}
    </>
  );
};

export default LoginBtn;
