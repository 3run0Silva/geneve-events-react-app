import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();

  if (!user) {
    showNotification('Please log in to view your profile.', 'error');
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile-page">
      <h1>{user.displayName}</h1>
      <img src={user.photoURL} alt="User Avatar" className="profile-picture" />
    </div>
  );
};

export default ProfilePage;
