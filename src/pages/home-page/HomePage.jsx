import React, { useEffect, useState } from 'react';
import data from './data/static-data.json'; 
import './HomePage.css'

const HomePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(data.categories);
  }, []);

  return (
    <>
      <h1 className='home-title'>Categories</h1>
      <div className="event-cards">
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <img className='event-img' src={event.img} alt={event.tag} />
            <div className="corner-tag" style={{ background: event.cornerColor }}></div>
            <h2 style={{ color: getColorFromGradient(event.cornerColor) }}>{event.tag}</h2>
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

