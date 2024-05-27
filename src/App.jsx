import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import HomePage from './pages/home-page/HomePage';
import CategoryPage from './pages/category-page/CategoryPage';
import EventDetailPage from './pages/event-detail-page/EventDetailPage';
import ProfilePage from './pages/profile-page/ProfilePage';
import Footer from './components/footer/Footer';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import ErrorBoundary from './components/error-handle/ErrorBoundary';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="App">
            <ErrorBoundary>
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
            </ErrorBoundary>
          </div>
        </Router>
      </NotificationProvider>

    </AuthProvider>
  );
}

export default App;



