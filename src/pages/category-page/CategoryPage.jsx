import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import EventCard from '../../components/event-card/EventCard';
import './CategoryPage.css';

const CategoryPage = () => {
  const { tag } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const displayTag = location.state?.displayTag || tag;
  const cornerColor = location.state?.cornerColor || 'rgba(255, 0, 0, 0.5)';

  const handleCardClick = (event) => {
    navigate(`/event/${event.id}`, { state: { event } });
  };

  return (
    <div className="category-page-container">
      <div className="content">
        <h1 className='category-title'>{displayTag} Events</h1>
        <EventCard tag={tag} cornerColor={cornerColor} handleCardClick={handleCardClick} />
      </div>
    </div>
  );
};

export default CategoryPage;
