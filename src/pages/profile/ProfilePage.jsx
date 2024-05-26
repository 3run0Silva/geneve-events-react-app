import React from 'react';
import './ProfilePage.css';

const ProfilePage = ({ user }) => {
  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-avatar">
        <img src={user.photoURL} alt="Avatar" />
      </div>
      <div className="profile-details">
        <h1>{user.displayName}</h1>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;

