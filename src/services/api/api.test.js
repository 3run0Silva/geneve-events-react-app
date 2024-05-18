import fetchEvents from './api';  // Note: default import

// Mocking the global fetch function
global.fetch = jest.fn();

describe('fetchEvents', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches successfully data from an API', async () => {
    const mockData = [{ id: 1, name: 'Event 1', description: 'Description 1' }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const data = await fetchEvents();

    expect(data).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/events');
  });

  it('fetches erroneously data from an API', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchEvents()).rejects.toThrow('Network response was not ok');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/events');
  });

  it('handles network errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchEvents()).rejects.toThrow('Network error');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/events');
  });
});
