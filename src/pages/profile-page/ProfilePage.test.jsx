import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfilePage from './ProfilePage';
import { AuthProvider } from '../../context/AuthContext';
import { NotificationProvider } from '../../context/NotificationContext';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockData),
  })
);

describe('ProfilePage', () => {
  test('displays error message when user is not logged in', () => {
    render(
      <AuthProvider>
        <NotificationProvider>
          <ProfilePage />
        </NotificationProvider>
      </AuthProvider>
    );

    expect(screen.getByText(/Please log in to view your profile./i)).toBeInTheDocument();
  });
});
