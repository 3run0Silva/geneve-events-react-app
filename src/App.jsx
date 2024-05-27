import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/home-page/HomePage';
import CategoryPage from './pages/category-page/CategoryPage';
import EventDetailPage from './pages/event-detail-page/EventDetailPage';
import ProfilePage from './pages/profile-page/ProfilePage';
import Footer from './components/footer/Footer';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:tag" element={<CategoryPage />} />
              <Route path="/event/:eventId" element={<EventDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes> 
          </div>
         <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;



