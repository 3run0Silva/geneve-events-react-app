// react imports
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Static data imports
import data from '../home-page/data/static-data.json';
// Service imports
import { fetchEvents } from '../../services/api/api';
// Context imports
import { useNotification } from '../../context/NotificationContext';
// CSS imports
import './HomePage.css';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    setEvents(data.categories);
    setLoading(false);
  }, []);

  // function to handle the "sort" by using the Tag given in the json and passing it as URL param
  const handleCardClick = async (apiTag, displayTag, cornerColor) => {
    if (apiTag === 'all') {
      setLoading(true);
      try {
        const allEvents = await fetchEvents();
        if (allEvents.length === 0) {
          showNotification('There are currently no events available. Please try again later.', 'error');
        } else {
          navigate(`/category/${apiTag}`, { state: { events: allEvents, displayTag, cornerColor } });
        }
      } catch (error) {
        console.error('Failed to fetch all events:', error);
        setError('Failed to load events. Please try again later.');
        showNotification('Failed to load events. Please try again later.', 'error');
      } finally {
        setLoading(false);
      }
    } else {
      navigate(`/category/${apiTag}`, { state: { displayTag, cornerColor } });
    }
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
      <h1 className='home-title'>Categories</h1>
      <div className="event-cards">
        {events.map((event, index) => (
          <div key={index} className="event-card" onClick={() => handleCardClick(event.apiTag, event.displayTag, event.cornerColor)}>
            <img className='event-img' src={event.img} alt={event.displayTag} />
            <div className="corner-tag" style={{ background: event.cornerColor }}></div>
            <h2 style={{ color: getColorFromGradient(event.cornerColor) }}>{event.displayTag}</h2>
          </div>
        ))}
      </div>
    </>
  );
};

const getColorFromGradient = (gradient) => {
  // Extract the first color from the gradient string
  const colors = gradient.match(/#([0-9a-f]{6}|[0-9a-f]{3})/gi);
  return colors ? colors[0] : '#fff';
};

export default HomePage;
