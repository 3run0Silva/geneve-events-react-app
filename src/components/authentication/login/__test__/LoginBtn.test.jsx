import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import LoginBtn from '../LoginBtn';
import React from 'react';


test('displays error message on sign-up failure', async () => {
  render(<LoginBtn />);
  fireEvent.click(screen.getByText(/Register/i));
  await waitFor(() => {
    const errorMessages = screen.getAllByText(/Authentication failed. Please try again./i);
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});

