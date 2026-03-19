import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

vi.mock('./components/WelcomePage/WelcomePage', () => ({
  default: () => <div>Welcome Screen</div>,
}));
vi.mock('./components/HomePage/HomePage', () => ({
  default: () => <div>Builder Screen</div>,
}));
vi.mock('./components/DisplayTemplate/DisplayTemplate', () => ({
  default: () => <div>Resume Screen</div>,
}));

describe('App Routing', () => {
  it('renders the Welcome Page at root path "/"', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText('Welcome Screen')).toBeInTheDocument();
    });
  });

  it('renders the builder Page at path "/builder"', async () => {
    render(
      <MemoryRouter initialEntries={['/builder']}>
        <App />
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText('Builder Screen')).toBeInTheDocument();
    });
  });

  it('renders the Display Template at path "/resume"', async () => {
    render(
      <MemoryRouter initialEntries={['/resume']}>
        <App />
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText('Resume Screen')).toBeInTheDocument();
    });
  });
});
