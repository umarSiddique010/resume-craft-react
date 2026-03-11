import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BoldAccentTemplate from './BoldAccentTemplate';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import resumeInitialState from '../../../context/UserInputContext/reducer/resumeInitialState';
import { MemoryRouter } from 'react-router-dom';

const renderWithState = (customState = {}, fontStyle = 'arialFont') => {
  const state = { ...resumeInitialState, ...customState };
  return render(
    <InputFieldContext.Provider value={[state, vi.fn()]}>
      <MemoryRouter>
        <BoldAccentTemplate fontStyle={fontStyle} />
      </MemoryRouter>
    </InputFieldContext.Provider>,
  );
};

describe('BoldAccentTemplate Component', () => {
  // ── HEADER ──────────────────────────────────────────────
  it('renders name, profession, phone, email and address', () => {
    renderWithState({
      personalInfoInput: {
        ...resumeInitialState.personalInfoInput,
        fullName: 'John Doe',
        profession: 'Full Stack Developer',
        phoneNumber: '555-1234',
        email: 'john@example.com',
      },
      addressInput: {
        address: '10 Main St',
        selectedCity: 'Patna',
        selectedStateName: 'Bihar',
        zipCode: '800001',
        selectedCountryName: 'India',
      },
    });

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'John Doe',
    );
    expect(
      screen.getByRole('heading', { level: 2, name: /Full Stack Developer/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('555-1234')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(
      screen.getByText('10 Main St, Patna, Bihar, 800001, India'),
    ).toBeInTheDocument();
  });

  it('renders partial address without extra commas', () => {
    renderWithState({
      addressInput: {
        address: '',
        selectedCity: 'Patna',
        selectedStateName: '',
        zipCode: '',
        selectedCountryName: 'India',
      },
    });

    expect(screen.getByText('Patna, India')).toBeInTheDocument();
  });

  it('shows/hides profile pic based on isNotProfilePic flag', () => {
    const { rerender } = renderWithState({
      personalInfoInput: {
        ...resumeInitialState.personalInfoInput,
        isNotProfilePic: false,
        profilePic: 'https://example.com/pic.jpg',
      },
    });

    expect(screen.getByRole('img', { name: /profile/i })).toBeInTheDocument();

    rerender(
      <InputFieldContext.Provider
        value={[
          {
            ...resumeInitialState,
            personalInfoInput: {
              ...resumeInitialState.personalInfoInput,
              isNotProfilePic: true,
              profilePic: 'https://example.com/pic.jpg',
            },
          },
          vi.fn(),
        ]}
      >
        <MemoryRouter>
          <BoldAccentTemplate fontStyle="default" />
        </MemoryRouter>
      </InputFieldContext.Provider>,
    );

    expect(
      screen.queryByRole('img', { name: /profile/i }),
    ).not.toBeInTheDocument();
  });

  // ── SKIP FIELDS ──────────────────────────────────────────
  it('does not render any skipped sections', () => {
    renderWithState({
      skipField: {
        workExperienceFields: true,
        educationFields: true,
        skillFields: true,
        projectFields: true,
        certificationFields: true,
        awardFields: true,
        languageFields: true,
        hobbyFields: true,
        websiteFields: true,
      },
    });

    expect(screen.queryByText('WORK EXPERIENCE')).not.toBeInTheDocument();
    expect(screen.queryByText('EDUCATION')).not.toBeInTheDocument();
    expect(screen.queryByText(/SKILL/)).not.toBeInTheDocument();
    expect(screen.queryByText('PROJECT')).not.toBeInTheDocument();
    expect(screen.queryByText('CERTIFICATION')).not.toBeInTheDocument();
    expect(screen.queryByText('AWARD')).not.toBeInTheDocument();
    expect(screen.queryByText(/LANGUAGE/)).not.toBeInTheDocument();
    expect(screen.queryByText(/HOBB/)).not.toBeInTheDocument();
    expect(screen.queryByText('WEBSITES')).not.toBeInTheDocument();
  });

  // ── DATE LOGIC ───────────────────────────────────────────
  it('shows Present for current work and currently studying', () => {
    renderWithState({
      skipField: {
        ...resumeInitialState.skipField,
        workExperienceFields: false,
        educationFields: false,
      },
      workExperienceFields: [
        {
          id: '1',
          jobTitle: 'Dev',
          companyName: '',
          location: '',
          startDate: '2021',
          endDate: '',
          isCurrentlyWorking: true,
          achievements: '',
        },
      ],
      educationFields: [
        {
          id: '1',
          degreeName: 'MCA',
          universityCollege: '',
          gpa: '',
          startDate: '2022',
          endDate: '',
          isCurrentlyStudying: true,
          coursework: '',
        },
      ],
    });

    expect(screen.getAllByText(/Present/).length).toBeGreaterThanOrEqual(2);
  });

  it('shows Expired for past certification expiry date', () => {
    renderWithState({
      skipField: {
        ...resumeInitialState.skipField,
        certificationFields: false,
      },
      certificationFields: [
        {
          id: '1',
          certificationName: 'Old Cert',
          issuingOrganization: '',
          issueDate: '2010-01-01',
          expiryDate: '2011-01-01',
          noDates: false,
          credential: '',
        },
      ],
    });

    expect(screen.getByText(/Expired/)).toBeInTheDocument();
  });

  // ── PLURALIZATION ────────────────────────────────────────
  it('pluralizes section headers with multiple entries', () => {
    renderWithState({
      skipField: {
        ...resumeInitialState.skipField,
        workExperienceFields: false,
        skillFields: false,
        projectFields: false,
      },
      workExperienceFields: [
        {
          id: '1',
          jobTitle: 'Dev A',
          companyName: '',
          location: '',
          startDate: '',
          isCurrentlyWorking: false,
          achievements: '',
        },
        {
          id: '2',
          jobTitle: 'Dev B',
          companyName: '',
          location: '',
          startDate: '',
          isCurrentlyWorking: false,
          achievements: '',
        },
      ],
      skillFields: [
        { id: '1', skill: 'React', skillLevel: '' },
        { id: '2', skill: 'Node', skillLevel: '' },
      ],
      projectFields: [
        {
          id: '1',
          projectName: 'A',
          technologiesUsed: '',
          projectLink: '',
          liveDemoLink: '',
          description: '',
        },
        {
          id: '2',
          projectName: 'B',
          technologiesUsed: '',
          projectLink: '',
          liveDemoLink: '',
          description: '',
        },
      ],
    });

    expect(screen.getByText('WORK EXPERIENCES')).toBeInTheDocument();
    expect(screen.getByText('SKILLS')).toBeInTheDocument();
    expect(screen.getByText('PROJECTS')).toBeInTheDocument();
  });

  // ── LINKS ────────────────────────────────────────────────
  it('renders project and website links correctly', () => {
    renderWithState({
      skipField: {
        ...resumeInitialState.skipField,
        projectFields: false,
        websiteFields: false,
      },
      projectFields: [
        {
          id: '1',
          projectName: 'App',
          technologiesUsed: '',
          projectLink: 'https://github.com/repo',
          liveDemoLink: 'https://demo.com',
          description: '',
        },
      ],
      websiteInput: {
        linkedIn: 'https://linkedin.com/in/umar',
        gitHub: 'https://github.com/umar',
        portfolio: '',
      },
      moreLinkFields: [{ id: '1', link: 'https://dev.to/umar' }],
    });

    const hrefs = screen
      .getAllByRole('link')
      .map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('https://github.com/repo');
    expect(hrefs).toContain('https://demo.com');
    expect(hrefs).toContain('https://linkedin.com/in/umar');
    expect(hrefs).toContain('https://dev.to/umar');
  });
});
