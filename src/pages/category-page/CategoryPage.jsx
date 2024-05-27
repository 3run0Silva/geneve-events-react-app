import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { fetchEventsByTag } from '../../services/api/api';
import { useNotification } from '../../context/NotificationContext';
import './CategoryPage.css';

const CategoryPage = () => {
  const { tag } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();
  const displayTag = location.state?.displayTag || tag;
  const cornerColor = location.state?.cornerColor || 'rgba(255, 0, 0, 0.5)';

  useEffect(() => {
    const getEvents = async () => {
      if (location.state && location.state.events) {
        setEvents(location.state.events);
      } else {
        try {
          const eventsData = await fetchEventsByTag(tag);
          setEvents(eventsData);
        } catch (error) {
          console.error('Failed to fetch events:', error);
          setError('Failed to load events. Please try again later.');
          showNotification('Failed to load events. Please try again later.', 'error');
        } finally {
          setLoading(false);
        }
      }
    };

    getEvents();
  }, [tag, location.state, showNotification]);

  const handleCardClick = (event) => {
    navigate(`/event/${event.id}`, { state: { event } });
  };

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
    <>
      <h1 className='category-title'>{displayTag} Events</h1>
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
  // Extract the first color from the gradient string
  const colors = gradient.match(/#([0-9a-f]{6}|[0-9a-f]{3})/gi);
  return colors ? colors[0] : '#fff';
};

export default CategoryPage;
