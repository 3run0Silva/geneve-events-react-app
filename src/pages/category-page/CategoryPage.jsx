import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchEventsByTag } from '../../services/api/api';
import './CategoryPage.css';

const CategoryPage = () => {
  const { tag } = useParams();
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const displayTag = location.state?.displayTag || tag;

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
        }
      }
    };

    getEvents();
  }, [tag, location.state]);

  return (
    <>
      <h1 className='category-title'>{displayTag} Events</h1>
      {events.length === 0 ? (
        <p className="no-events-message">There are currently no events available in this category. Please try again later.</p>
      ) : (
        <div className="event-cards">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <img className='event-img' src={event.img} alt={event.title} />
              <div className="corner-tag" style={{ background: 'rgba(255, 0, 0, 0.5)' }}></div>
              <h2 style={{ background: 'rgba(255, 0, 0, 0.5)' }}>{event.title}</h2>
              <p className="event-date">{event.date}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoryPage;
