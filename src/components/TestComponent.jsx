import React, { useEffect, useState } from 'react';
import fetchEvents from '../services/api/api';

const TestComponent = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getEvents();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Events</h1>
      {events.length === 0 && <p>No events found</p>}
      {events.map(event => (
        <div key={event.id}>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TestComponent;
