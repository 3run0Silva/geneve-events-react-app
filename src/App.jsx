import React, { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/home-page/HomePage';
// import EventCard from './components/event-card/EventCard';
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
        <HomePage />
        {/* <EventCard /> */}
      </div>
    </div>
  );
}

export default App;
