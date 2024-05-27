import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../../services/api/api';
import { useNotification } from '../../context/NotificationContext';
import './EventCard.css'; 

const EventCard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        setError('Failed to load events. Please try again later.');
        showNotification('Failed to load events. Please try again later.', 'error');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [showNotification]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        {error}
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="event-cards">
      {events.map((event) => (
        <div key={event.id} className="event-card">
          <img className='event-img' src={event.img} alt="" />
          <div>
            <h2>{event.name}</h2>
            <p className="event-date">{event.date}</p>
            <p className="event-location">{event.location}</p>
            <p className="event-description">{event.description}</p>
              {console.log(event)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventCard;