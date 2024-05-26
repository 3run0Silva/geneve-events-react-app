import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
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

