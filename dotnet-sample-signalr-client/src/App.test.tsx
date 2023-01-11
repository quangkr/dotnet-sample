import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders user input field', () => {
  render(<App />);
  const linkElement = screen.getByText(/user/i);
  expect(linkElement).toBeInTheDocument();
});
