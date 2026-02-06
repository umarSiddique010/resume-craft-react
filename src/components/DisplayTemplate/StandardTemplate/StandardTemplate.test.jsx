import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StandardTemplate from './StandardTemplate';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import resumeInitialState from '../../../context/UserInputContext/reducer/resumeInitialState';
import { MemoryRouter } from 'react-router-dom';

// --- MOCK CSS MODULES ---

vi.mock('./StandardTemplate.module.css', () => ({
  default: {
    templateSection: 'templateSection',
    dotsColorGreen: 'dots-green-active',
    profilePic: 'profilePic',
  },
}));

// --- HELPER TO RENDER WITH CONTEXT ---
const renderWithState = (customState, fontStyle = 'default') => {
  const state = { ...resumeInitialState, ...customState };
  return render(
    <InputFieldContext.Provider value={[state, vi.fn()]}>
      <MemoryRouter>
        <StandardTemplate fontStyle={fontStyle} />
      </MemoryRouter>
    </InputFieldContext.Provider>,
  );
};

describe('StandardTemplate Component', () => {
  // --- Personal Info and Profile picture ---
  it('renders profile picture when enabled', () => {
    const customState = {
      personalInfoInput: {
        ...resumeInitialState.personalInfoInput,
        profilePic: 'http://test.com/me.jpg',
        isNotProfilePic: false,
      },
    };

    renderWithState(customState);

    const img = screen.getByAltText('Profile Picture');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'http://test.com/me.jpg');
  });

  it('hides profile picture when disabled', () => {
    const customState = {
      personalInfoInput: {
        isNotProfilePic: true,
      },
    };

    renderWithState(customState);
    expect(screen.queryByAltText('Profile Picture')).not.toBeInTheDocument();
  });

  // --- Skills (Visual Dots Logic) ---
  it('renders Skill dots correctly based on level', () => {
    const customState = {
      skipField: { skillFields: false },
      skillFields: [{ id: '1', skill: 'React', skillLevel: 'Intermediate' }],
    };

    const { container } = renderWithState(customState);
    const skillItem = screen.getByText('React').closest('li');
    const activeDots = skillItem.getElementsByClassName('dots-green-active');

    // Basic (2) + Intermediate (2) = 4 active dots
    expect(activeDots.length).toBe(4);
  });

  // --- Languages (Visual Proficiency Logic) ---
  it('renders Language proficiency dots correctly', () => {
    const customState = {
      skipField: { languageFields: false },
      languageFields: [
        { id: '1', language: 'French', proficiencyLevel: 'Fluent' },
      ],
    };

    const { container } = renderWithState(customState);
    const langItem = screen.getByText('French').closest('li');
    const activeDots = langItem.getElementsByClassName('dots-green-active');

    // Basic (2) + Conversational (1) + Fluent (1) = 4 active dots
    expect(activeDots.length).toBe(4);
  });

  // --- Icon and Website ---
  it('renders correct icons for LinkedIn, GitHub, and Portfolio', () => {
    const customState = {
      skipField: { websiteFields: false },
      websiteInput: {
        linkedIn: 'https://linkedin.com/in/me',
        gitHub: 'https://github.com/me',
        portfolio: 'https://myfolio.com',
      },
      moreLinkFields: [],
    };

    renderWithState(customState);

    expect(
      screen.getByText(/https:\/\/linkedin.com\/in\/me/),
    ).toBeInTheDocument();
    expect(screen.getByText(/https:\/\/github.com\/me/)).toBeInTheDocument();
    expect(screen.getByText(/https:\/\/myfolio.com/)).toBeInTheDocument();
  });

  // --- Work Experience (Layout & Dates) ---
  it('renders work experience with "Present" logic', () => {
    const customState = {
      skipField: { workExperienceFields: false },
      workExperienceFields: [
        {
          id: '1',
          jobTitle: 'Senior Engineer',
          companyName: 'Google',
          location: 'NY',
          startDate: '2022',
          isCurrentlyWorking: true,
          achievements: 'Did things',
        },
      ],
    };

    renderWithState(customState);

    expect(screen.getByText(/Google - NY/)).toBeInTheDocument();
    expect(screen.getByText(/Senior Engineer/)).toBeInTheDocument();
    expect(screen.getByText(/2022 - Present/)).toBeInTheDocument();
  });

  // --- Education ---
  it('renders education section', () => {
    const customState = {
      skipField: { educationFields: false },
      educationFields: [
        {
          id: '1',
          degreeName: 'MBA',
          universityCollege: 'Harvard',
          startDate: '2010',
          endDate: '2012',
          isCurrentlyStudying: false,
          coursework: 'Business',
        },
      ],
    };

    renderWithState(customState);

    expect(screen.getByText('MBA')).toBeInTheDocument();
    expect(screen.getByText(/Harvard/)).toBeInTheDocument();
    expect(screen.getByText(/2010 - 2012/)).toBeInTheDocument();
  });

  // --- Certifications (Expiration) ---
  it('renders expired certifications correctly', () => {
    const customState = {
      skipField: { certificationFields: false },
      certificationFields: [
        {
          id: '1',
          certificationName: 'Old Cert',
          issueDate: '2000',
          expiryDate: '2005-01-01',
          noDates: false,
        },
      ],
    };

    renderWithState(customState);

    expect(screen.getByText('Old Cert')).toBeInTheDocument();
    expect(screen.getByText(/Expired/)).toBeInTheDocument();
  });

  // --- Projects (External Links) ---
  it('renders project links with icons', () => {
    const customState = {
      skipField: { projectFields: false },
      projectFields: [
        {
          id: '1',
          projectName: 'My Project',
          projectLink: 'github.com/proj',
          liveDemoLink: 'demo.com',
          technologiesUsed: 'React',
          description: 'Desc',
        },
      ],
    };

    renderWithState(customState);

    expect(screen.getByText('My Project')).toBeInTheDocument();

    expect(screen.getByText(/github.com\/proj/)).toBeInTheDocument();
    expect(screen.getByText(/demo.com/)).toBeInTheDocument();
  });

  // --- Hobbies & Awards ---
  it('renders Hobbies and Awards', () => {
    const customState = {
      skipField: { hobbyFields: false, awardFields: false },
      hobbyFields: [{ id: '1', hobby: 'Fishing' }],
      awardFields: [
        { id: '1', awardName: 'Winner', year: '2023', details: 'Gold' },
      ],
    };

    renderWithState(customState);

    expect(screen.getByText('Fishing')).toBeInTheDocument();
    expect(screen.getByText('Winner')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
  });

  // --- Conditional Skipping ---
  it('skips sections when configured', () => {
    const customState = {
      profileSummaryInput: '', // Clear summary to avoid regex collisions
      skipField: {
        skillFields: true,
        awardFields: true,
        languageFields: true,
        hobbyFields: true,
        workExperienceFields: true,
        educationFields: true,
        projectFields: true,
        certificationFields: true,
        websiteFields: true,
      },
      skillFields: [{ id: '1', skill: 'Hidden' }],
    };

    renderWithState(customState);

    expect(screen.queryByText('SKILLS')).not.toBeInTheDocument();
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
    expect(screen.queryByText('WORK EXPERIENCES')).not.toBeInTheDocument();
  });
});
