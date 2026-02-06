import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ClassicTemplate from './ClassicTemplate';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import resumeInitialState from '../../../context/UserInputContext/reducer/resumeInitialState';
import { MemoryRouter } from 'react-router-dom';

// Helper function to render component with specific Context State
const renderWithState = (customState, fontStyle = 'default') => {
  const state = { ...resumeInitialState, ...customState };
  return render(
    <InputFieldContext.Provider value={[state, vi.fn()]}>
      <MemoryRouter>
        <ClassicTemplate fontStyle={fontStyle} />
      </MemoryRouter>
    </InputFieldContext.Provider>,
  );
};

describe('ClassicTemplate Component', () => {
  // --- personal information and address ---
  it('renders personal information and address correctly', () => {
    const customState = {
      personalInfoInput: {
        fullName: 'Jane Doe',
        profession: 'Software Engineer',
        email: 'jane@test.com',
        phoneNumber: '123-456-7890',
      },
      addressInput: {
        address: '123 Tech Lane',
        selectedCity: 'Silicon Valley',
        selectedStateName: 'California',
        zipCode: '90210',
        selectedCountryName: 'USA',
      },
    };

    renderWithState(customState);

    // Verify Name and Profession
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Jane Doe',
    );
    expect(
      screen.getByRole('heading', { level: 2, name: /Software Engineer/i }),
    ).toBeInTheDocument();

    // Verify Contact Info concatenation
    expect(screen.getByText(/jane@test.com/i)).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
    expect(
      screen.getByText(
        /123 Tech Lane, Silicon Valley, California, 90210, USA/i,
      ),
    ).toBeInTheDocument();
  });

  // --- Professional Summary ---
  it('renders professional summary', () => {
    const customState = {
      profileSummaryInput: 'Experienced developer with 5 years of React...',
    };

    renderWithState(customState);

    expect(screen.getByText('PROFESSIONAL SUMMARY')).toBeInTheDocument();
    expect(
      screen.getByText('Experienced developer with 5 years of React...'),
    ).toBeInTheDocument();
  });

  // --- Work Experience (Logic & Pluralization) ---
  it('renders work experience and handles "Present" date logic', () => {
    const customState = {
      skipField: {
        ...resumeInitialState.skipField,
        workExperienceFields: false,
      },
      workExperienceFields: [
        {
          id: '1',
          jobTitle: 'Frontend Dev',
          companyName: 'Tech Corp',
          location: 'Remote',
          startDate: '2020-01-01',
          isCurrentlyWorking: true, // Should show 'Present'
          achievements: 'Built UI',
        },
      ],
    };

    renderWithState(customState);

    // Check Header (Singular)
    expect(
      screen.getByRole('heading', { name: 'WORK EXPERIENCE' }),
    ).toBeInTheDocument();

    // Check Data
    expect(screen.getByText('Frontend Dev')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText(/Present/i)).toBeInTheDocument();
  });

  it('pluralizes "WORK EXPERIENCES" header when multiple items exist', () => {
    const customState = {
      skipField: { workExperienceFields: false },
      workExperienceFields: [
        { id: '1', jobTitle: 'Job A' },
        { id: '2', jobTitle: 'Job B' },
      ],
    };

    renderWithState(customState);
    expect(
      screen.getByRole('heading', { name: 'WORK EXPERIENCES' }),
    ).toBeInTheDocument();
  });

  // --- Educations ---
  it('renders education details', () => {
    const customState = {
      skipField: { educationFields: false },
      educationFields: [
        {
          id: '1',
          degreeName: 'B.Sc CS',
          universityCollege: 'MIT',
          gpa: '3.8',
          startDate: '2015',
          endDate: '2019',
          isCurrentlyStudying: false,
          coursework: 'Algorithms',
        },
      ],
    };

    renderWithState(customState);

    expect(screen.getByText('EDUCATION')).toBeInTheDocument();
    expect(screen.getByText('B.Sc CS')).toBeInTheDocument();
    expect(screen.getByText('MIT')).toBeInTheDocument();
    expect(screen.getByText('GPA: 3.8')).toBeInTheDocument();
    expect(screen.getByText(/2015 - 2019/)).toBeInTheDocument();
  });

  // --- Projects ---
  it('renders projects with links', () => {
    const customState = {
      skipField: { projectFields: false },
      projectFields: [
        {
          id: '1',
          projectName: 'Super App',
          technologiesUsed: 'React, Node',
          projectLink: 'http://github.com/app',
          liveDemoLink: 'http://app.com',
          description: 'A great app',
        },
      ],
    };

    renderWithState(customState);

    expect(screen.getByText('PROJECT')).toBeInTheDocument(); // Singular check
    expect(screen.getByText('Super App')).toBeInTheDocument();
    expect(screen.getByText('React, Node')).toBeInTheDocument();

    // Check Links
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', 'http://github.com/app');
    expect(links[1]).toHaveAttribute('href', 'http://app.com');
  });

  // --- Certifications (Expiration Logic) ---
  it('renders certifications and correctly identifies expired certs', () => {
    const customState = {
      skipField: { certificationFields: false },
      certificationFields: [
        {
          id: '1',
          certificationName: 'AWS Cloud',
          expiryDate: '2010-01-01', // Past date
          issueDate: '2005-01-01',
          noDates: false,
        },
        {
          id: '2',
          certificationName: 'Azure',
          expiryDate: '2099-01-01', // Future date
          issueDate: '2024-01-01',
          noDates: false,
        },
      ],
    };

    renderWithState(customState);

    expect(screen.getByText('CERTIFICATIONS')).toBeInTheDocument();

    // Verify Expired Logic
    expect(screen.getByText('AWS Cloud')).toBeInTheDocument();
    expect(screen.getByText('Expired')).toBeInTheDocument();

    // Verify Active Logic
    expect(screen.getByText('Azure')).toBeInTheDocument();
    expect(screen.getByText(/2024-01-01 - 2099-01-01/)).toBeInTheDocument();
  });

  // --- Websites (Labeling Logic) ---
  it('renders website links with correct prefixes', () => {
    const customState = {
      skipField: { websiteFields: false },
      websiteInput: {
        linkedIn: 'https://linkedin.com/in/jane',
        gitHub: 'https://github.com/jane',
        portfolio: 'https://jane.com',
      },
      moreLinkFields: [{ id: '1', link: 'https://medium.com/@jane' }],
    };

    renderWithState(customState);

    expect(screen.getByText('WEBSITES')).toBeInTheDocument();

    // Check Content includes prefixes
    expect(screen.getByText(/LinkedIn:/i)).toBeInTheDocument();
    expect(screen.getByText(/Github:/i)).toBeInTheDocument();
    expect(screen.getByText(/Portfolio:/i)).toBeInTheDocument();

    // Check "More Link" field
    expect(
      screen.getByText(/Link: https:\/\/medium.com\/@jane/i),
    ).toBeInTheDocument();
  });

  // --- Skills, Awards, Languages, Hobbies ---
  it('renders lists for Skills, Awards, Languages, and Hobbies', () => {
    const customState = {
      skipField: {
        skillFields: false,
        awardFields: false,
        languageFields: false,
        hobbyFields: false,
      },
      skillFields: [{ id: '1', skill: 'React' }],
      awardFields: [
        {
          id: '1',
          awardName: 'Best Dev',
          year: '2023',
          details: 'Won 1st place',
        },
      ],
      languageFields: [
        { id: '1', language: 'English', proficiencyLevel: 'Native' },
      ],
      hobbyFields: [{ id: '1', hobby: 'Reading' }],
    };

    renderWithState(customState);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Best Dev')).toBeInTheDocument();
    expect(screen.getByText('English - Native')).toBeInTheDocument();
    expect(screen.getByText('Reading')).toBeInTheDocument();
  });

  // --- Conditional Rendering (SKIP FIELDS) ---
  it('does NOT render sections when skipField is true', () => {
    const customState = {
      profileSummaryInput: '',

      skipField: {
        workExperienceFields: true,
        educationFields: true,
        skillFields: true,
        projectFields: true,
        certificationFields: true,
        awardFields: true,
        websiteFields: true,
        languageFields: true,
        hobbyFields: true,
      },
      // Even with data present, they should hide
      workExperienceFields: [{ id: '1', jobTitle: 'CEO' }],
    };

    renderWithState(customState);

    // Headers should be missing
    expect(screen.queryByText(/WORK EXPERIENCE/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/EDUCATION/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/SKILL/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/PROJECT/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/WEBSITES/i)).not.toBeInTheDocument();
  });

  // --- Styling Props ---
  it('applies the passed fontStyle prop to the container', () => {
    // Render with 'serif-font' style
    const { container } = renderWithState({}, 'serif-font');

    // Check if the section element has the class
    const section = container.querySelector('section');
    expect(section).toHaveClass('serif-font');
  });
});
