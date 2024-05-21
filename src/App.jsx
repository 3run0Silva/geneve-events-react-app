import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
    console.log('User logged in: ', user);
  };

  const handleLogout = () => {
    setUser(null);
    console.log('User logged out');
  };

  return (
    <div className="App">
      <Navbar isLoggedIn={!!user} onLogin={handleLogin} onLogout={handleLogout} />
      {user ? <p>Welcome, {user.displayName}</p> : <p>Please log in to access more features</p>}
    </div>
  );
}

export default App;


