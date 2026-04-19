import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App routing', () => {
  it('renders TicketLogin component on default route', () => {
    // Ticket Login page always contains 'Ticket Access' text.
    render(<App />);
    expect(screen.getByText('Ticket Access')).toBeDefined();
  });
});
