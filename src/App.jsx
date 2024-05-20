import React, { useState} from 'react';
import LoginBtn from './components/login/LoginBtn';
import SignUpBtn from './components/signup/signup-btn/SignUpBtn';

function App() {
  const [user, setUser] = useState(null);
  const handleLogin = (user) => {
    setUser(user);
    console.log('User logged in: ', user);
  };
  return (
    <div>
       <h1>My App</h1>
      {user ? (
        <h1>Logged In</h1>
      ) : (
        <>
          <LoginBtn onLogin={handleLogin} />
          <SignUpBtn onSignUp={handleLogin} />
        </>
      )}
    </div>
    
  );
}

export default App;

