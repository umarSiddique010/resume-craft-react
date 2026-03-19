import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserInput from './UserInput';
import { InputFieldContext } from '../../context/UserInputContext/InputFieldContext';
import { SET_SKIP_FIELD } from '../../context/UserInputContext/reducer/resumeTypes';

// --- MOCK DEPENDENCIES ---
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

// --- MOCK CHILD COMPONENTS ---
vi.mock('./PersonalInformation/PersonalInformation', () => ({
  default: () => <div>Page: Personal Info</div>,
}));
vi.mock('./Address/Address', () => ({
  default: () => <div>Page: Address</div>,
}));
vi.mock('./Websites/Websites', () => ({
  default: () => <div>Page: Websites</div>,
}));
vi.mock('./ProfileSummary/ProfileSummary', () => ({
  default: () => <div>Page: Profile Summary</div>,
}));
vi.mock('./WorkExperiences/WorkExperiences', () => ({
  default: () => <div>Page: Work Experiences</div>,
}));
vi.mock('./Educations/Educations', () => ({
  default: () => <div>Page: Educations</div>,
}));
vi.mock('./Skills/Skills', () => ({ default: () => <div>Page: Skills</div> }));
vi.mock('./Projects/Projects', () => ({
  default: () => <div>Page: Projects</div>,
}));
vi.mock('./Certifications/Certifications', () => ({
  default: () => <div>Page: Certifications</div>,
}));
vi.mock('./Awards/Awards', () => ({ default: () => <div>Page: Awards</div> }));
vi.mock('./Languages/Languages', () => ({
  default: () => <div>Page: Languages</div>,
}));
vi.mock('./Hobbies/Hobbies', () => ({
  default: () => <div>Page: Hobbies</div>,
}));
vi.mock('./InputFieldCompletedMessage/InputFieldCompletedMessage', () => ({
  default: () => <div>Page: Completed</div>,
}));

// --- CSS MODULE MOCK ---
vi.mock('./UserInput.module.css', () => ({
  default: {
    userInput: 'userInput',
    hoveringOnSubmitButton: 'hover-active',
    submitBtnWrapper: 'submitBtnWrapper',
    pagesNumberInfo: 'pagesNumberInfo',
    prevBtn: 'prevBtn',
    nextBtn: 'nextBtn',
    skipBtn: 'skipBtn',
  },
}));

describe('UserInput Component', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = vi.fn();
    mockNavigate.mockClear();
  });

  const setup = () => {
    return render(
      <InputFieldContext.Provider value={[{}, mockDispatch]}>
        <UserInput />
      </InputFieldContext.Provider>,
    );
  };

  // --- Initial Render ---
  it('renders the first step (Personal Info) initially', () => {
    setup();

    expect(screen.getByText('Page: Personal Info')).toBeInTheDocument();
    expect(screen.getByText('1/13')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
    expect(screen.queryByText('Skip')).not.toBeInTheDocument();
  });

  // --- Navigation (Next, Previous) ---
  it('navigates to next and previous steps correctly', () => {
    setup();

    // Step 1 -> Step 2
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Page: Address')).toBeInTheDocument();
    expect(screen.getByText('2/13')).toBeInTheDocument();

    // Step 2 -> Step 3
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Page: Websites')).toBeInTheDocument();
    expect(screen.getByText('3/13')).toBeInTheDocument();

    // Step 3 -> Step 2 (Previous)
    fireEvent.click(screen.getByText('Previous'));
    expect(screen.getByText('Page: Address')).toBeInTheDocument();
    expect(screen.getByText('2/13')).toBeInTheDocument();
  });

  // --- Skip Logic ---
  it('handles Skipping a field correctly', () => {
    setup();

    // Navigate to Step 3 (Websites - Index 2)
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Page: Websites')).toBeInTheDocument();

    const skipBtn = screen.getByText('Skip');
    fireEvent.click(skipBtn);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: SET_SKIP_FIELD,
      payload: { websiteFields: true },
    });

    expect(screen.getByText('Page: Profile Summary')).toBeInTheDocument();
  });

  // --- no skip button on personal info, address, profile summary except websites ---
  it('hides Skip button on non-skippable steps (0, 1, 3)', () => {
    setup();

    expect(screen.queryByText('Skip')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Next'));
    expect(screen.queryByText('Skip')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Skip')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Next'));
    expect(screen.queryByText('Skip')).not.toBeInTheDocument();
  });

  // --- UnSkip Logic on websites with Previous Button ---
  it('re-enables a field when going Previous from a future step', () => {
    setup();

    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));

    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Page: Profile Summary')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Previous'));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: SET_SKIP_FIELD,
      payload: { websiteFields: false },
    });

    expect(screen.getByText('Page: Websites')).toBeInTheDocument();
  });

  // --- Submit and complete button ---
  it('handles final submission on the last step', () => {
    setup();

    for (let i = 0; i < 12; i++) {
      fireEvent.click(screen.getByText('Next'));
    }

    expect(screen.getByText('Page: Completed')).toBeInTheDocument();

    const submitBtn = screen.getByText('Submit');
    fireEvent.click(submitBtn);

    expect(mockNavigate).toHaveBeenCalledWith('/resume');
  });

  // --- Keyboard Navigation ---
  it('navigates with Enter key', () => {
    const { container } = setup();

    const form = container.querySelector('form');

    fireEvent.keyDown(form, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('Page: Address')).toBeInTheDocument();
  });

  // --- Hover Effect ---
  it('applies hover class to main section when submit button is hovered', () => {
    setup();

    for (let i = 0; i < 12; i++) {
      fireEvent.click(screen.getByText('Next'));
    }

    const submitBtn = screen.getByText('Submit');
    const section = submitBtn.closest('section');

    expect(section).not.toHaveClass('hover-active');

    fireEvent.mouseEnter(submitBtn);
    expect(section).toHaveClass('hover-active');

    fireEvent.mouseLeave(submitBtn);
    expect(section).not.toHaveClass('hover-active');
  });
});
