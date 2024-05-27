import React from 'react';
import { render, screen } from '@testing-library/react';
import EventDetailPage from './EventDetailPage';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationProvider } from '../../context/NotificationContext';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  })
);

describe('EventDetailPage', () => {
  test('displays error message when event is not found', () => {
    render(
      <Router>
        <NotificationProvider>
          <EventDetailPage />
        </NotificationProvider>
      </Router>
    );

    expect(screen.getByText(/Event not found./i)).toBeInTheDocument();
  });
});
