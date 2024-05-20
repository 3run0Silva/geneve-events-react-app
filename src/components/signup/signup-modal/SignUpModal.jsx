import React, { useState } from 'react';
import { getDatabase, ref, set } from 'firebase/database';
import bcrypt from 'bcryptjs';
import './SignUpModal.css'; // Ensure you have a CSS file for styling the modal

const SignUpModal = ({ user, onClose, onSignUp }) => {
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
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
        password: hashedPassword // Store the hashed password
      });
      console.log('User added to the database');
      onSignUp(user);  // Call onSignUp to notify parent component
      onClose();
    } catch (error) {
      console.error('Error during sign-up: ', error);
    }
  };

  return (
    <div className="signup-modal">
      <div className="signup-modal-content">
        <h2>Complete Your Sign-Up</h2>
        <p>Email: {user.email}</p>
        <p>Display Name: {user.displayName}</p>
        <input 
          type="password" 
          placeholder="Set a Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleSignUp}>Create Account</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default SignUpModal;



