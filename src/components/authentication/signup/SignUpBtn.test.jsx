import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SignUpBtn from './SignUpBtn';
import React from 'react';

test('displays error message on sign-up failure', async () => {
  render(<SignUpBtn />);
  fireEvent.click(screen.getByText(/Register/i));
  await waitFor(() => {
    const errorMessages = screen.getAllByText(/Authentication failed. Please try again./i);
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});
