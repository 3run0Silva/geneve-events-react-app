import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CategoryPage from '../CategoryPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationProvider } from '../../../context/NotificationContext';
import * as api from '../../../services/api/api';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  })
);

jest.mock('../../services/api/api');

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});


describe('CategoryPage', () => {
  test('displays error message when failing to fetch events', async () => {
    api.fetchEventsByTag.mockRejectedValue(new Error('Failed to fetch events'));

    render(
      <Router>
        <NotificationProvider>
          <CategoryPage />
        </NotificationProvider>
      </Router>
    );

    await waitFor(() => {
      const errorMessages = screen.getAllByText(/Failed to load events. Please try again later./i);
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  });
});
