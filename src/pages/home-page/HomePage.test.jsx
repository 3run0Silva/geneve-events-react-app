import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { NotificationProvider } from '../../context/NotificationContext';

test('displays error message when failing to fetch all events', async () => {
  render(
    <MemoryRouter>
      <NotificationProvider>
        <HomePage />
      </NotificationProvider>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText(/All Events/i));

  await waitFor(() => {
    const errorMessages = screen.getAllByText((content, element) => {
      return element.textContent.match(/Failed to load events. Please try again later./i);
    });
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});
