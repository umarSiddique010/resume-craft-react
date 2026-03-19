import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HomePage from './HomePage';

vi.mock('../UserInput/UserInput', () => ({
  default: () => <div data-testid="user-input">User Input Section</div>,
}));
vi.mock('../DisplayTemplate/DisplayTemplate', () => ({
  default: () => <div data-testid="display-template">Display Section</div>,
}));

describe('HomePage', () => {
  it('renders both UserInput and DisplayTemplate sections', async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByTestId('user-input')).toBeInTheDocument();
      expect(screen.getByText('User Input Section')).toBeInTheDocument();

      expect(screen.getByTestId('display-template')).toBeInTheDocument();
      expect(screen.getByText('Display Section')).toBeInTheDocument();
    });
  });
});
