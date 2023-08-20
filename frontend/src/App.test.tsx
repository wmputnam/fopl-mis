import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// TODO implement mock fetch on server side?

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/William/i);
  expect(linkElement).toBeInTheDocument();
});
