import { fetchEvents, fetchEventsByTag, fetchEventsByDate } from './api';

// Mocking the global fetch function
global.fetch = jest.fn();

describe('API functions', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches all events successfully', async () => {
    const mockData = [
      { id: 1, name: 'Event 1', description: 'Description 1' },
      { id: 2, name: 'Event 2', description: 'Description 2' },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await fetchEvents();

    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:5000/events');
  });

  it('fetches events by tag successfully', async () => {
    const mockData = [
      { id: 3, name: 'Dance Event 1', description: 'Description 1' },
      { id: 4, name: 'Dance Event 2', description: 'Description 2' },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await fetchEventsByTag('Dance');

    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:5000/events/tag/Dance');
  });

  it('fetches events by date successfully', async () => {
    const mockData = [
      { id: 5, name: 'Event on 12-04-2024', description: 'Description 1' },
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await fetchEventsByDate(12, 4, 2024);

    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:5000/events/date?day=12&month=4&year=2024');
  });

  it('handles fetch error for all events', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchEvents()).rejects.toThrow('Network response was not ok');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:5000/events');
  });

  it('handles fetch error for events by tag', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchEventsByTag('Dance')).rejects.toThrow('Network response was not ok');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:5000/events/tag/Dance');
  });

  it('handles fetch error for events by date', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchEventsByDate(12, 4, 2024)).rejects.toThrow('Network response was not ok');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://127.0.0.1:5000/events/date?day=12&month=4&year=2024');
  });
});