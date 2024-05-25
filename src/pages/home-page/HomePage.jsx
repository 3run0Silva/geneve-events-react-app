import React, { useEffect, useState } from 'react';
import data from '../home-page/data/static-data.json';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { fetchEvents } from '../../services/api/api';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setEvents(data.categories);
  }, []);

  const handleCardClick = async (apiTag, displayTag, cornerColor) => {
    if (apiTag === 'all') {
      try {
        const allEvents = await fetchEvents();
        if (allEvents.length === 0) {
          alert('There are currently no events available. Please try again later.');
        } else {
          navigate(`/category/${apiTag}`, { state: { events: allEvents, displayTag, cornerColor } });
        }
      } catch (error) {
        console.error('Failed to fetch all events:', error);
      }
    } else {
      navigate(`/category/${apiTag}`, { state: { displayTag, cornerColor } });
    }
  };

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
