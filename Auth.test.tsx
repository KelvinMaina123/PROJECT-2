import { describe, it, expect } from 'vitest'; 
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Auth from './Auth'; 
describe('Auth Page Component', () => {
  it('should render the login form structure', () => {
    render(<Auth />);
    const headingElement = screen.getByText(/Login/i); 
    expect(headingElement).toBeInTheDocument();
  });
});