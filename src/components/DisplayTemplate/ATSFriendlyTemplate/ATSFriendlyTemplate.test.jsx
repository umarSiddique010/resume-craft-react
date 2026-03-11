import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ATSFriendly from './ATSFriendlyTemplate';
import resumeInitialState from '../../../context/UserInputContext/reducer/resumeInitialState';

// --- MOCK REACT-PDF ---
vi.mock('@react-pdf/renderer', () => ({
  Document: ({ children }) => <div data-testid="pdf-doc">{children}</div>,
  Page: ({ children }) => <div data-testid="pdf-page">{children}</div>,
  View: ({ children }) => <div data-testid="pdf-view">{children}</div>,
  Text: ({ children }) => <div data-testid="pdf-text">{children}</div>,
  StyleSheet: { create: (styles) => styles },
}));

describe('ATSFriendlyTemplate Component', () => {
  // --- Personal Information and Header ---
  it('renders personal information and address correctly', () => {
    const customData = {
      ...resumeInitialState,
      personalInfoInput: {
        fullName: 'John ATS',
        profession: 'Backend Engineer',
        email: 'john@ats.com',
        phoneNumber: '555-0199',
      },
      addressInput: {
        address: '101 Code Blvd',
        selectedCity: 'Tech City',
        selectedStateName: 'Texas',
        zipCode: '75001',
        selectedCountryName: 'USA',
      },
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText('John ATS')).toBeInTheDocument();
    expect(screen.getByText('Backend Engineer')).toBeInTheDocument();
    expect(screen.getByText(/john@ats.com \| 555-0199/)).toBeInTheDocument();
    expect(
      screen.getByText(/101 Code Blvd, Tech City, Texas, 75001, USA/),
    ).toBeInTheDocument();
  });

  // --- Professional Summary ---
  it('renders professional summary if present', () => {
    const customData = {
      ...resumeInitialState,
      profileSummaryInput: 'Experienced in optimizing PDFs.',
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText('Professional Summary')).toBeInTheDocument();
    expect(
      screen.getByText('Experienced in optimizing PDFs.'),
    ).toBeInTheDocument();
  });

  // --- Work Experience ---
  it('renders work experience with correct date logic (Present vs End Date)', () => {
    const customData = {
      ...resumeInitialState,
      skipField: {
        ...resumeInitialState.skipField,
        workExperienceFields: false,
      },
      workExperienceFields: [
        {
          id: '1',
          jobTitle: 'Senior Dev',
          companyName: 'Startup Inc',
          location: 'Remote',
          startDate: '2020',
          isCurrentlyWorking: true,
          endDate: '',
          jobType: '',
          achievements: 'Scaled DB',
        },
        {
          id: '2',
          jobTitle: 'Junior Dev',
          companyName: 'Big Corp',
          location: 'Office',
          startDate: '2018',
          endDate: '2020',
          isCurrentlyWorking: false,
          jobType: '',
          achievements: 'Fixed bugs',
        },
      ],
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText(/work experience/i)).toBeInTheDocument();
    expect(screen.getByText('Senior Dev – Startup Inc')).toBeInTheDocument();
    expect(screen.getByText(/Remote \| 2020 – Present/)).toBeInTheDocument();
    expect(screen.getByText('Junior Dev – Big Corp')).toBeInTheDocument();
    expect(screen.getByText(/Office \| 2018 – 2020/)).toBeInTheDocument();
  });

  // --- Education ---
  it('renders education section', () => {
    const customData = {
      ...resumeInitialState,
      skipField: { ...resumeInitialState.skipField, educationFields: false },
      educationFields: [
        {
          id: '1',
          degreeName: 'BSc CS',
          universityCollege: 'State Univ',
          startDate: '2015',
          endDate: '2019',
          isCurrentlyStudying: false,
          gpa: '3.9',
          coursework: '',
        },
      ],
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText('BSc CS – State Univ')).toBeInTheDocument();
    expect(screen.getByText(/2015 – 2019/)).toBeInTheDocument();
    expect(screen.getByText(/GPA: 3.9/)).toBeInTheDocument();
  });

  // --- Skills ---
  it('renders skills as a comma-separated list', () => {
    const customData = {
      ...resumeInitialState,
      skipField: { ...resumeInitialState.skipField, skillFields: false },
      skillFields: [
        { id: '1', skill: 'Python' },
        { id: '2', skill: 'Django' },
        { id: '3', skill: 'PostgreSQL' },
      ],
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Python, Django, PostgreSQL')).toBeInTheDocument();
  });

  // --- Projects ---
  it('renders projects and handles optional links', () => {
    const customData = {
      ...resumeInitialState,
      skipField: { ...resumeInitialState.skipField, projectFields: false },
      projectFields: [
        {
          id: '1',
          projectName: 'My App',
          technologiesUsed: 'React',
          description: 'Cool app',
          projectLink: 'github.com/app',
          liveDemoLink: '',
        },
        {
          id: '2',
          projectName: 'My Site',
          technologiesUsed: 'HTML',
          description: 'Web',
          projectLink: '',
          liveDemoLink: 'mysite.com',
        },
      ],
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('My App')).toBeInTheDocument();
    expect(screen.getByText('Link: github.com/app')).toBeInTheDocument();
    expect(screen.getByText('Live: mysite.com')).toBeInTheDocument();
    expect(screen.getAllByText(/Live:/)).toHaveLength(1);
  });

  // --- Certifications ---
  it('renders certifications with dates only if noDates is false', () => {
    const customData = {
      ...resumeInitialState,
      skipField: {
        ...resumeInitialState.skipField,
        certificationFields: false,
      },
      certificationFields: [
        {
          id: '1',
          certificationName: 'AWS',
          issuingOrganization: 'Amazon',
          issueDate: '2021',
          expiryDate: '2030-09-12',
          noDates: false,
          credential: '123',
        },
        {
          id: '2',
          certificationName: 'Linux',
          issuingOrganization: 'FOSS',
          issueDate: '',
          expiryDate: '',
          noDates: true,
          credential: '456',
        },
      ],
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText('Certifications')).toBeInTheDocument();
    expect(screen.getByText('AWS – Amazon')).toBeInTheDocument();
    expect(screen.getByText(/2021 – 2030-09-12/)).toBeInTheDocument();
    expect(screen.getByText('Credential ID: 123')).toBeInTheDocument();
    expect(screen.getByText('Linux – FOSS')).toBeInTheDocument();
    expect(screen.queryByText(/FOSS –/)).not.toBeInTheDocument();
    expect(screen.getByText('Credential ID: 456')).toBeInTheDocument();
  });

  // --- Awards ---
  it('renders awards section', () => {
    const customData = {
      ...resumeInitialState,
      skipField: { ...resumeInitialState.skipField, awardFields: false },
      awardFields: [
        {
          id: '1',
          awardName: 'Hackathon Winner',
          year: '2023',
          details: 'First Place',
        },
      ],
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText('Award')).toBeInTheDocument();
    expect(screen.getByText('Hackathon Winner (2023)')).toBeInTheDocument();
    expect(screen.getByText('First Place')).toBeInTheDocument();
  });

  // --- Languages ---
  it('renders languages section', () => {
    const customData = {
      ...resumeInitialState,
      skipField: { ...resumeInitialState.skipField, languageFields: false },
      languageFields: [
        { id: '1', language: 'Spanish', proficiencyLevel: 'Fluent' },
      ],
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('Spanish – Fluent')).toBeInTheDocument();
  });

  // --- Hobbies ---
  it('renders hobbies as a comma-separated list', () => {
    const customData = {
      ...resumeInitialState,
      skipField: { ...resumeInitialState.skipField, hobbyFields: false },
      hobbyFields: [
        { id: '1', hobby: 'Reading' },
        { id: '2', hobby: 'Chess' },
      ],
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText('Hobbies')).toBeInTheDocument();
    expect(screen.getByText('Reading, Chess')).toBeInTheDocument();
  });

  // --- Websites ---
  it('renders websites with correct labels', () => {
    const customData = {
      ...resumeInitialState,
      websiteInput: {
        linkedIn: 'linkedin.com/in/me',
        gitHub: 'github.com/me',
        portfolio: 'me.com',
      },
      moreLinkFields: [{ id: '1', link: 'blog.com' }],
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText('Websites')).toBeInTheDocument();
    expect(
      screen.getByText('LinkedIn: linkedin.com/in/me'),
    ).toBeInTheDocument();
    expect(screen.getByText('GitHub: github.com/me')).toBeInTheDocument();
    expect(screen.getByText('Portfolio: me.com')).toBeInTheDocument();
    expect(screen.getByText('blog.com')).toBeInTheDocument();
  });

  // --- SKIP LOGIC ---
  it('skips rendering sections when configured in skipField', () => {
    const customData = {
      ...resumeInitialState,
      profileSummaryInput: '',
      skipField: {
        ...resumeInitialState.skipField,
        workExperienceFields: true,
        educationFields: true,
        skillFields: true,
        projectFields: true,
        certificationFields: true,
        awardFields: true,
        languageFields: true,
        hobbyFields: true,
      },
      skillFields: [{ id: '1', skill: 'Hidden' }],
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.queryByText('Work Experience')).not.toBeInTheDocument();
    expect(screen.queryByText('Education')).not.toBeInTheDocument();
    expect(screen.queryByText('Skills')).not.toBeInTheDocument();
    expect(screen.queryByText('Projects')).not.toBeInTheDocument();
    expect(screen.queryByText('Certifications')).not.toBeInTheDocument();
    expect(screen.queryByText('Award')).not.toBeInTheDocument();
    expect(screen.queryByText('Languages')).not.toBeInTheDocument();
    expect(screen.queryByText('Hobbies')).not.toBeInTheDocument();
  });
});
