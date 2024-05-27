import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import DropdownMenu from '../DropdownMenu';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { AuthProvider } from '../../../../context/AuthContext';

test('displays error message on Google sign-in failure', async () => {
  render(
    <MemoryRouter>
      <AuthProvider>
        <DropdownMenu />
      </AuthProvider>
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText(/Login/i));

  await waitFor(() => {
    const errorMessages = screen.getAllByText((content, element) => {
      return element.textContent.match(/Google sign-in error. Please try again./i);
    });
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});

