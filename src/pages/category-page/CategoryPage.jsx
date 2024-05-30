// React imports
import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
// Service imports
import { fetchEventsByTag } from '../../services/api/api';
// Context imports
import { useNotification } from '../../context/NotificationContext';
// CSS imports
import './CategoryPage.css';

const CategoryPage = () => {
  const { tag } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const displayTag = location.state?.displayTag || tag;
  const cornerColor = location.state?.cornerColor || 'rgba(255, 0, 0, 0.5)';
  const { showNotification } = useNotification();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEventsByTag(tag);
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        showNotification('Failed to load events. Please try again later.', 'error');
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

  const handleCardClick = (event) => {
    navigate(`/event/${event.id}`, { state: { event } });
  };

  return (
    <div className="category-page-container">
      <div className="content">
        <h1 className="category-title">{displayTag} Events</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search events"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {filteredEvents.length === 0 ? (
          <p className="no-events-message">There are currently no events available in this category. Please try again later.</p>
        ) : (
          <div className="event-cards">
            {filteredEvents.map((event, index) => (
              <div
                key={index}
                className="event-card"
                style={{ '--corner-color': cornerColor }}
                onClick={() => handleCardClick(event)}
              >
                <img className="event-img" src={event.img} alt={event.title} />
                <div className="corner-tag" style={{ background: cornerColor }}></div>
                <h2 style={{ color: getColorFromGradient(cornerColor) }}>{event.title}</h2>
                <p className="event-date">{event.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const getColorFromGradient = (gradient) => {
  const colors = gradient.match(/#([0-9a-f]{6}|[0-9a-f]{3})/gi);
  return colors ? colors[0] : '#fff';
};

export default CategoryPage;
