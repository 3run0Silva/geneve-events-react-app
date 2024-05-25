import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './EventDetailPage.css';

const EventDetailPage = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const event = location.state?.event;

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="event-detail-container">
      <div
        className="event-detail-background"
        style={{ backgroundImage: `url(${event.img})` }}
      ></div>
      <div className="event-detail-info">
        <h1 className="event-detail-title">{event.title}</h1>
        <p className="event-detail-description">{event.description}</p>
        <p className="event-detail-date">{event.date}</p>
      </div>
    </div>
  );
};

export default EventDetailPage;

