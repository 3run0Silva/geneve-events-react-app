const API_URL = 'http://127.0.0.1:5000';

// Fetch all events
const fetchEvents = async () => {
  try {
    console.log(`Fetching from ${API_URL}/events`);
    const response = await fetch(`${API_URL}/events`);
    console.log('Response status:', response.status);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with fetch operation:', error);
    throw error;
  }
};

// Fetch events by tag
const fetchEventsByTag = async (tag) => {
  try {
    console.log(`Fetching from ${API_URL}/events/tag/${tag}`);
    const response = await fetch(`${API_URL}/events/tag/${tag}`);
    console.log('Response status:', response.status);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with fetch operation:', error);
    throw error;
  }
};

// Fetch events by date
const fetchEventsByDate = async (day, month, year) => {
  try {
    console.log(`Fetching from ${API_URL}/events/date?day=${day}&month=${month}&year=${year}`);
    const response = await fetch(`${API_URL}/events/date?day=${day}&month=${month}&year=${year}`);
    console.log('Response status:', response.status);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with fetch operation:', error);
    throw error;
  }
};

export { fetchEvents, fetchEventsByTag, fetchEventsByDate };
