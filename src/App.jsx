import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/home-page/HomePage';
import CategoryPage from './pages/category-page/CategoryPage';
import EventDetailPage from './pages/event-detail-page/EventDetailPage';
import './App.css';

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
    <Router>
      <div className="App">
        <Navbar isLoggedIn={!!user} user={user} onLogin={handleLogin} onLogout={handleLogout} />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:tag" element={<CategoryPage />} />
            <Route path="/event/:eventId" element={<EventDetailPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

