import { describe, expect, it, test } from 'vitest';
import FallbackUI from './FallbackUI';
import { render, screen } from '@testing-library/react';

describe('FallbackUI', () => {
  it('renders FallbackUI component', () => {
    render(<FallbackUI />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/favicon.ico');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'logo');
  });
});
