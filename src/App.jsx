import React, { useState } from 'react';
import LoginBtn from './components/login/LoginBtn';
import SignUpBtn from './components/signup/SignUpBtn';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
    console.log('User logged in: ', user);
  };

  return (
    <div className="App">
      <h1>My App</h1>
      {user ? (
        <h1>Logged in</h1>
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
