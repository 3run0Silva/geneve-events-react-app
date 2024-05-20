import React, { useState } from 'react';
import './PasswordModal.css'; // Ensure you have a CSS file for styling the modal

const PasswordModal = ({ user, onClose, onPasswordSubmit }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onPasswordSubmit(password);
  };

  return (
    <div className="password-modal">
      <div className="password-modal-content">
        <h2>Enter Your Password</h2>
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default PasswordModal;
