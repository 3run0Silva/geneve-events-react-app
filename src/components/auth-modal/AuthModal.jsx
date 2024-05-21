import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import { getDatabase, ref, set } from 'firebase/database';
import './AuthModal.css';

const AuthModal = ({ user, type, onClose, onLogin, onPasswordSubmit, onExistingAccountLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordSubmit = async () => {
    try {
      await onPasswordSubmit(password);
      setPassword(''); // Clear password field on success
    } catch (err) {
      console.error('Error during password submission:', err);
      setError(err.message);
      setPassword(''); // Clear password field on error
    }
  };

  const handleSignUp = async () => {
    try {
      if (!user) {
        const errorMsg = 'User information is missing.';
        console.error(errorMsg);
        setError(errorMsg);
        return;
      }

      // Hash the password before storing
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Add user to the database with hashed password
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);
      await set(userRef, {
        username: user.displayName,
        email: user.email,
        profile_picture: user.photoURL,
        password: hashedPassword,
        loginAttempts: 0
      });

      onLogin(user);
      setPassword('');
      setError('');
      onClose();
    } catch (error) {
      console.error('An error occurred during sign-up:', error);
      setError('An error occurred during sign-up. Please try again.');
      setPassword('');
    }
  };

  const handleExistingAccount = () => {
    setError('');
    onExistingAccountLogin();
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal-content">
        {type === 'password' && (
          <>
            <h2>Enter Your Password</h2>
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            {error && <p className="error">{error}</p>}
            <button onClick={handlePasswordSubmit}>Submit</button>
            <button onClick={onClose}>Cancel</button>
          </>
        )}
        {type === 'signUp' && (
          <>
            <h2>Complete Your Sign-Up</h2>
            <p>Email: {user.email}</p>
            <p>Display Name: {user.displayName}</p>
            <input 
              type="password" 
              placeholder="Set a Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            {error && <p className="error">{error}</p>}
            <button onClick={handleSignUp}>Create Account</button>
            <button onClick={onClose}>Cancel</button>
          </>
        )}
        {type === 'nonExistent' && (
          <>
            <h2>Account Does Not Exist</h2>
            <p>This account does not exist. Would you like to create a new account?</p>
            <button onClick={() => onLogin(user, 'signUp')}>Register</button>
            <button onClick={onClose}>Cancel</button>
          </>
        )}
        {type === 'existingAccount' && (
          <>
            <h2>Account Already Exists</h2>
            <p>This account already exists. Would you like to log in instead?</p>
            <button onClick={handleExistingAccount}>Log In</button>
            <button onClick={onClose}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;


