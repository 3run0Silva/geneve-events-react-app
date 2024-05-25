import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../../services/api/api';
import './EventCard.css'; 

const EventCard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
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