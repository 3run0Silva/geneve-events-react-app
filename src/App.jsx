import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Categories from './pages/categories-page/Categories';
import './App.css'


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
      <Navbar isLoggedIn={!!user} user={user} onLogin={handleLogin} onLogout={handleLogout} />
      <div className="content">
        <Categories />
      </div>
    </div>
  );
}

export default App;
