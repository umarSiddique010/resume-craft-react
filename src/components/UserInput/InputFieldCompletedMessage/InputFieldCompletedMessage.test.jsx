import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InputFieldCompletedMessage from './InputFieldCompletedMessage';

describe('InputFieldCompletedMessage Component', () => {
  it('renders the completion message correctly', () => {
    render(<InputFieldCompletedMessage />);

    // Check Main Heading
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent("You're All Set!");

    // Check Description Text
    expect(screen.getByText(/Congratulations!/i)).toBeInTheDocument();
    expect(screen.getByText(/You've crafted your Resume/i)).toBeInTheDocument();

    // Check Instruction Text
    expect(screen.getByText(/Click the/i)).toBeInTheDocument();
    expect(screen.getByText(/"Submit"/i)).toBeInTheDocument();
  });
});
