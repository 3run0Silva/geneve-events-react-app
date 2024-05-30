// React imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Component imports
import { fetchEventsByTag } from '../../services/api/api';
// Context imports
import { useNotification } from '../../context/NotificationContext';
// CSS imports
import './EventCard.css'; 

const EventCard = ({ tag, cornerColor, handleCardClick }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Function to load events by tag
  //   const loadEvents = async () => {
  //     try {
  //       const data = await fetchEventsByTag(tag);
  //       setEvents(data);
  //     } catch (error) {
  //       setError('Failed to load events. Please try again later.');
  //       showNotification('Failed to load events. Please try again later.', 'error');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadEvents();
  // }, [tag, showNotification]);

  const handleBack = () => {
    navigate(-1); 
  };

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
        <button onClick={handleBack}>Go Back</button>
      </div>
    );
  }

  return (
    <>
      {events.length === 0 ? (
        <p className="no-events-message">There are currently no events available in this category. Please try again later.</p>
      ) : (
        <div className="event-cards">
          {events.map((event, index) => (
            <div
              key={index}
              className="event-card"
              style={{ '--corner-color': getColorFromGradient(cornerColor) }}
              onClick={() => handleCardClick(event)}
            >
              <img className='event-img' src={event.img} alt={event.title} />
              <div className="corner-tag" style={{ background: cornerColor }}></div>
              <h2>{event.title}</h2>
              <p className="event-date">{event.date}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const getColorFromGradient = (gradient) => {
  // Extract the first color from the gradient string (Corner color)
  const colors = gradient.match(/#([0-9a-f]{6}|[0-9a-f]{3})/gi);
  return colors ? colors[0] : '#fff';
};

export default EventCard;
