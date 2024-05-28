const API_URL = 'https://geneva-events-api.onrender.com';
// const API_URL = 'http://192.168.1.15:8080'

// Fetch all events
const fetchEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/events`);
    if (!response.ok) {
      throw new Error(`Error fetching events: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching events failed:', error);
    throw error;
  }
};

// Fetch events by tag
const fetchEventsByTag = async (tag) => {
  try {
    const response = await fetch(`${API_URL}/events/tag/${tag}`);
    if (!response.ok) {
      throw new Error(`Error fetching events by tag: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching events by TAG failed:', error);
    throw error;
  }
};

// Fetch events by date
const fetchEventsByDate = async (day, month, year) => {
  try {
    const response = await fetch(`${API_URL}/events/date?day=${day}&month=${month}&year=${year}`);
    if (!response.ok) {
      throw new Error(`Error fetching events by date: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching events by DATE failed:', error);
    throw error;
  }
};

export { fetchEvents, fetchEventsByTag, fetchEventsByDate };
