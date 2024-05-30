// React imports
import React, { useEffect, useState } from 'react';
// Component imports
import { fetchEventsByTag, fetchEvents } from '../../services/api/api';
// Context imports
import { useNotification } from '../../context/NotificationContext';
// CSS imports
import './EventCard.css'; 

const EventCard = ({ tag, cornerColor, handleCardClick, searchQuery }) => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();
  const retryLimit = 3; 
  let retryCount = 0; 

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = tag === 'all' ? await fetchEvents() : await fetchEventsByTag(tag);
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        if (retryCount < retryLimit) {
          retryCount += 1;
          loadEvents(); 
        } else {
          setError('Failed to load events after multiple attempts. Please try again later.');
          // showNotification('Failed to load events after multiple attempts. Please try again later.', 'error');
        }
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [tag, showNotification]);

  useEffect(() => {
    setFilteredEvents(
      events.filter(event =>
        event.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, events]);

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
      </div>
    );
  }

  return (
    <>
      {filteredEvents.length === 0 ? (
        <p className="no-events-message">Il n'y a actuellement aucun événement disponible dans cette catégorie. Veuillez réessayer plus tard.</p>
      ) : (
        <div className="event-cards">
          {filteredEvents.map((event, index) => (
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
