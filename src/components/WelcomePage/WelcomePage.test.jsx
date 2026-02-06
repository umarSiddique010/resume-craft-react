import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import WelcomePage from './WelcomePage';

describe('WelcomePage', () => {
  it('renders the main heading and features list', () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>,
    );

    // Check Heading
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /Craft Your Perfect Resume/i,
    );

    // Check Description
    expect(
      screen.getByText(/A simple yet powerful resume builder/i),
    ).toBeInTheDocument();

    // Check Feature List Items
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(4);
    expect(screen.getByText(/ATS-friendly resume format/i)).toBeInTheDocument();
  });

  it('renders the "Let\'s Craft" button linking to /home', () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>,
    );

    const startBtn = screen.getByRole('link', { name: /Let's Craft/i });
    expect(startBtn).toBeInTheDocument();
    expect(startBtn).toHaveAttribute('href', '/home');
  });

  it('renders the GitHub footer link correctly', () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>,
    );

    const githubLink = screen.getByRole('link', { name: /Md Umar Siddique/i });

    expect(githubLink).toBeInTheDocument();

    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/umarSiddique010',
    );
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
