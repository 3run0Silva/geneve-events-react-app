import { fetchEvents, fetchEventsByTag, fetchEventsByDate } from '../api';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
    ok: true,
  })
);

describe('API functions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches all events successfully', async () => {
    const mockData = [{ id: 1, name: 'Event 1' }];
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
      ok: true,
    });

    const data = await fetchEvents();
    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://192.168.1.15:8080/events');
  });

  it('fetches events by tag successfully', async () => {
    const mockData = [{ id: 1, name: 'Event 1' }];
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
      ok: true,
    });

    const data = await fetchEventsByTag('Dance');
    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://192.168.1.15:8080/events/tag/Dance');
  });

  it('fetches events by date successfully', async () => {
    const mockData = [{ id: 1, name: 'Event 1' }];
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockData),
      ok: true,
    });

    const data = await fetchEventsByDate(12, 4, 2024);
    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://192.168.1.15:8080/events/date?day=12&month=4&year=2024');
  });

  it('handles fetch error for all events', async () => {
    fetch.mockRejectedValueOnce(new Error('Network response was not ok'));

    await expect(fetchEvents()).rejects.toThrow('Network response was not ok');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://192.168.1.15:8080/events');
  });

  it('handles fetch error for events by tag', async () => {
    fetch.mockRejectedValueOnce(new Error('Network response was not ok'));

    await expect(fetchEventsByTag('Dance')).rejects.toThrow('Network response was not ok');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://192.168.1.15:8080/events/tag/Dance');
  });

  it('handles fetch error for events by date', async () => {
    fetch.mockRejectedValueOnce(new Error('Network response was not ok'));

    await expect(fetchEventsByDate(12, 4, 2024)).rejects.toThrow('Network response was not ok');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://192.168.1.15:8080/events/date?day=12&month=4&year=2024');
  });
});
