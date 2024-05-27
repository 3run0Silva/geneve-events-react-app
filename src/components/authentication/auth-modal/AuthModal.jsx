import React from 'react';
import './AuthModal.css';

const AuthModal = ({ message, onConfirm, onCancel, confirmText, cancelText }) => {
  console.log('Rendering AuthModal with message:', message); 

  return (
    <>
      <div className="auth-modal-overlay" onClick={onCancel}></div>
      <div className="auth-modal">
        <div className="auth-modal-content">
          <p>{message}</p>
          <div className="auth-modal-buttons">
            <button onClick={onConfirm}>{confirmText}</button>
            <button onClick={onCancel}>{cancelText}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;

