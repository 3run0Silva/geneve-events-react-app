import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { getDatabase, ref, update } from 'firebase/database';
import AuthModal from '../../components/authentication/auth-modal/AuthModal';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const { showNotification } = useNotification();
  const [displayName, setDisplayName] = useState(user ? user.displayName : '');
  const [photoURL, setPhotoURL] = useState(user ? user.photoURL : '');
  const [isEditing, setIsEditing] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleSaveClick = () => {
    setModalData({
      message: 'Are you sure you want to save changes?',
      onConfirm: updateProfile,
      onCancel: closeModal,
      confirmText: 'Save',
      cancelText: 'Cancel',
    });
  };

  const closeModal = () => {
    setModalData(null);
  };

  const updateProfile = async () => {
    try {
      const db = getDatabase();
      const userRef = ref(db, 'users/' + user.uid);
      await update(userRef, {
        displayName,
        photoURL,
      });
      const updatedUser = { ...user, displayName, photoURL };
      setUser(updatedUser); // Update the user context
      showNotification('Profile updated successfully', 'success');
      setIsEditing(false);
      closeModal();
    } catch (error) {
      console.error('Failed to update profile:', error);
      showNotification('Failed to update profile. Please try again later.', 'error');
    }
  };

  if (!user) {
    showNotification('Please log in to view your profile.', 'error');
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile-page-container">
      <div className="profile-page-content">
        <h1>Profile</h1>
        <div className="profile-picture">
          <label htmlFor="fileInput">
            <img src={photoURL} alt="User Avatar" className="editable-avatar" />
          </label>
          {isEditing && (
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          )}
        </div>
        <div className="profile-details">
          <h2>{displayName}</h2>
          {isEditing && (
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="New display name"
            />
          )}
        </div>
        {isEditing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
        {modalData && (
          <AuthModal
            message={modalData.message}
            onConfirm={modalData.onConfirm}
            onCancel={modalData.onCancel}
            confirmText={modalData.confirmText}
            cancelText={modalData.cancelText}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
