import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// --- MOCK THE PAGES ---
vi.mock('./components/WelcomePage/WelcomePage', () => ({
  default: () => <div>Welcome Screen</div>,
}));
vi.mock('./components/HomePage/HomePage', () => ({
  default: () => <div>Home Screen</div>,
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

  it('renders the Home Page at path "/home"', async () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText('Home Screen')).toBeInTheDocument();
    });
  });

  it('renders the Display Template at path "/resumeCrafted"', async () => {
    render(
      <MemoryRouter initialEntries={['/resumeCrafted']}>
        <App />
      </MemoryRouter>,
    );
    await waitFor(() => {
      expect(screen.getByText('Resume Screen')).toBeInTheDocument();
    });
  });
});
