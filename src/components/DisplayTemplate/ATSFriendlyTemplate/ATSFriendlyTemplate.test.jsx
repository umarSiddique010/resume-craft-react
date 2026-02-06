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
  // Make create return the styles object passed to it, so 'styles.page' exists
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

    // Verify Name & Profession
    expect(screen.getByText('John ATS')).toBeInTheDocument();
    expect(screen.getByText('Backend Engineer')).toBeInTheDocument();

    // Verify Contact Composition
    expect(screen.getByText(/john@ats.com/)).toBeInTheDocument();
    expect(screen.getByText(/555-0199/)).toBeInTheDocument();

    // Verify Address Composition
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
      skipField: { workExperienceFields: false },
      workExperienceFields: [
        {
          id: '1',
          jobTitle: 'Senior Dev',
          companyName: 'Startup Inc',
          location: 'Remote',
          startDate: '2020',
          isCurrentlyWorking: true, // Should show 'Present'
          achievements: 'Scaled DB',
        },
        {
          id: '2',
          jobTitle: 'Junior Dev',
          companyName: 'Big Corp',
          location: 'Office',
          startDate: '2018',
          endDate: '2020', // Should show date
          isCurrentlyWorking: false,
          achievements: 'Fixed bugs',
        },
      ],
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText('Work Experience')).toBeInTheDocument();

    // Check first job (Present)
    expect(screen.getByText(/Senior Dev – Startup Inc/)).toBeInTheDocument();
    expect(screen.getByText(/2020 – Present/)).toBeInTheDocument();

    // Check second job (Past)
    expect(screen.getByText(/Junior Dev – Big Corp/)).toBeInTheDocument();
    expect(screen.getByText(/2018 – 2020/)).toBeInTheDocument();
  });

  // --- Education ---
  it('renders education section', () => {
    const customData = {
      ...resumeInitialState,
      skipField: { educationFields: false },
      educationFields: [
        {
          id: '1',
          degreeName: 'BSc CS',
          universityCollege: 'State Univ',
          startDate: '2015',
          endDate: '2019',
          isCurrentlyStudying: false,
          gpa: '3.9',
        },
      ],
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText('Education')).toBeInTheDocument();
    expect(screen.getByText(/BSc CS – State Univ/)).toBeInTheDocument();
    expect(screen.getByText(/2015 – 2019/)).toBeInTheDocument();
    expect(screen.getByText(/GPA: 3.9/)).toBeInTheDocument();
  });

  // --- Skill ---
  it('renders skills as a comma-separated list', () => {
    const customData = {
      ...resumeInitialState,
      skipField: { skillFields: false },
      skillFields: [
        { id: '1', skill: 'Python' },
        { id: '2', skill: 'Django' },
        { id: '3', skill: 'PostgreSQL' },
      ],
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText('Skills')).toBeInTheDocument();

    expect(screen.getByText(/Python, Django, PostgreSQL/)).toBeInTheDocument();
  });

  // --- Projects ---
  it('renders projects and handles optional links', () => {
    const customData = {
      ...resumeInitialState,
      skipField: { projectFields: false },
      projectFields: [
        {
          id: '1',
          projectName: 'My App',
          technologiesUsed: 'React',
          description: 'Cool app',
          projectLink: 'github.com/app',
          liveDemoLink: '', // No live link
        },
        {
          id: '2',
          projectName: 'My Site',
          technologiesUsed: 'HTML',
          description: 'Web',
          projectLink: '',
          liveDemoLink: 'mysite.com', // Has live link
        },
      ],
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText('Projects')).toBeInTheDocument();

    // Project 1
    expect(screen.getByText('My App')).toBeInTheDocument();
    expect(screen.getByText('Link: github.com/app')).toBeInTheDocument();

    // Project 2
    expect(screen.getByText('Live: mysite.com')).toBeInTheDocument();

    // checking that it appears EXACTLY ONCE. This implies Project 1 didn't render it.
    expect(screen.getAllByText(/Live:/)).toHaveLength(1);
  });

  // --- Certifications ---
  it('renders certifications with dates only if noDates is false', () => {
    const customData = {
      ...resumeInitialState,
      skipField: { certificationFields: false },
      certificationFields: [
        {
          id: '1',
          certificationName: 'AWS',
          issuingOrganization: 'Amazon',
          issueDate: '2021',
          expiryDate: '2024',
          noDates: false,
          credential: '123',
        },
        {
          id: '2',
          certificationName: 'Linux',
          issuingOrganization: 'FOSS',
          noDates: true, // Should hide dates
          credential: '456',
        },
      ],
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText('Certifications')).toBeInTheDocument();

    // Cert 1 (With Dates)
    expect(screen.getByText(/AWS – Amazon/)).toBeInTheDocument();
    expect(screen.getByText(/2021 – 2024/)).toBeInTheDocument();
    expect(screen.getByText(/Credential ID: 123/)).toBeInTheDocument();

    // Cert 2 (No Dates)
    expect(screen.getByText(/Linux – FOSS/)).toBeInTheDocument();
    expect(screen.queryByText(/FOSS –/)).not.toBeInTheDocument(); // Ensure no partial renders
    expect(screen.getByText(/Credential ID: 456/)).toBeInTheDocument();
  });

  // --- Awards---
  it('renders awards section', () => {
    const customData = {
      ...resumeInitialState,
      skipField: { awardFields: false },
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

    expect(screen.getByText('Awards')).toBeInTheDocument();
    expect(screen.getByText(/Hackathon Winner \(2023\)/)).toBeInTheDocument();
    expect(screen.getByText('First Place')).toBeInTheDocument();
  });

  // --- Languages ---
  it('renders languages section', () => {
    const customData = {
      ...resumeInitialState,
      skipField: { languageFields: false },
      languageFields: [
        { id: '1', language: 'Spanish', proficiencyLevel: 'Fluent' },
      ],
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText(/Spanish – Fluent/)).toBeInTheDocument();
  });

  // --- Hobbies ---
  it('renders hobbies as a comma-separated list', () => {
    const customData = {
      ...resumeInitialState,
      skipField: { hobbyFields: false },
      hobbyFields: [
        { id: '1', hobby: 'Reading' },
        { id: '2', hobby: 'Chess' },
      ],
    };

    render(<ATSFriendly data={customData} />);

    expect(screen.getByText('Hobbies')).toBeInTheDocument();
    expect(screen.getByText(/Reading, Chess/)).toBeInTheDocument();
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
      screen.getByText(/LinkedIn: linkedin.com\/in\/me/),
    ).toBeInTheDocument();
    expect(screen.getByText(/GitHub: github.com\/me/)).toBeInTheDocument();
    expect(screen.getByText(/Portfolio: me.com/)).toBeInTheDocument();
    expect(screen.getByText('blog.com')).toBeInTheDocument(); // Standard text for extra links
  });

  // --- SKIP LOGIC ---
  it('skips rendering sections when configured in skipField', () => {
    const customData = {
      ...resumeInitialState,
      profileSummaryInput: '', // Clear summary
      skipField: {
        workExperienceFields: true,
        educationFields: true,
        skillFields: true,
        projectFields: true,
        certificationFields: true,
        awardFields: true,
        languageFields: true,
        hobbyFields: true,
      },
      // Data exists but should not be shown
      skillFields: [{ id: '1', skill: 'Hidden' }],
    };

    render(<ATSFriendly data={customData} />);

    // Titles should be absent
    expect(screen.queryByText('Work Experience')).not.toBeInTheDocument();
    expect(screen.queryByText('Education')).not.toBeInTheDocument();
    expect(screen.queryByText('Skills')).not.toBeInTheDocument();
    expect(screen.queryByText('Projects')).not.toBeInTheDocument();
    expect(screen.queryByText('Certifications')).not.toBeInTheDocument();
    expect(screen.queryByText('Awards')).not.toBeInTheDocument();
    expect(screen.queryByText('Languages')).not.toBeInTheDocument();
    expect(screen.queryByText('Hobbies')).not.toBeInTheDocument();
  });
});
