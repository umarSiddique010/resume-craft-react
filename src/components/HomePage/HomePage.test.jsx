import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePage from './HomePage';

// --- MOCK CHILD COMPONENTS ---
vi.mock('../UserInput/UserInput', () => ({
  default: () => <div data-testid="user-input">User Input Section</div>,
}));
vi.mock('../DisplayTemplate/DisplayTemplate', () => ({
  default: () => <div data-testid="display-template">Display Section</div>,
}));

describe('HomePage', () => {
  it('renders both UserInput and DisplayTemplate sections', () => {
    render(<HomePage />);

    expect(screen.getByTestId('user-input')).toBeInTheDocument();
    expect(screen.getByText('User Input Section')).toBeInTheDocument();

    expect(screen.getByTestId('display-template')).toBeInTheDocument();
    expect(screen.getByText('Display Section')).toBeInTheDocument();
  });
});
