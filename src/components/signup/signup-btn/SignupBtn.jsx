import React, { useState } from 'react';
import SignUpModal from '../signup-modal/SignUpModal';

const SignUpBtn = ({ onSignUp }) => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowSignUpModal(true)}>Sign Up</button>
      {showSignUpModal && (
        <SignUpModal 
          onClose={() => setShowSignUpModal(false)} 
          onSignUp={onSignUp} 
        />
      )}
    </>
  );
};

export default SignUpBtn;

