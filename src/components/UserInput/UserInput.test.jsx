import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserInput from './UserInput';
import { InputFieldContext } from '../../context/UserInputContext/InputFieldContext';
import { SET_SKIP_FIELD } from '../../context/UserInputContext/reducer/resumeTypes';
import { toast } from 'react-toastify';

// --- MOCK DEPENDENCIES ---
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
  },
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
    toast.success.mockClear(); // Clear previous toast calls
  });

  const renderWizard = () => {
    return render(
      <InputFieldContext.Provider value={[{}, mockDispatch]}>
        <UserInput />
      </InputFieldContext.Provider>,
    );
  };

  // --- Initial Render ---
  it('renders the first step (Personal Info) initially', () => {
    renderWizard();

    expect(screen.getByText('Page: Personal Info')).toBeInTheDocument();
    expect(screen.getByText('1/13')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
    expect(screen.queryByText('Skip')).not.toBeInTheDocument();
  });

  // --- Navigation (Next, Previous) ---
  it('navigates to next and previous steps correctly', () => {
    renderWizard();

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
    renderWizard();

    // Navigate to Step 3 (Websites - Index 2)
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));

    expect(screen.getByText('Page: Websites')).toBeInTheDocument();

    // Click Skip
    const skipBtn = screen.getByText('Skip');
    fireEvent.click(skipBtn);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: SET_SKIP_FIELD,
      payload: { websiteFields: true },
    });

    expect(screen.getByText('Page: Profile Summary')).toBeInTheDocument();
  });

  it('hides Skip button on non-skippable steps (0, 1, 3)', () => {
    renderWizard();
    // Step 1 (Personal Info - Index 0)
    expect(screen.queryByText('Skip')).not.toBeInTheDocument();

    // Step 2 (Address - Index 1)
    fireEvent.click(screen.getByText('Next'));
    expect(screen.queryByText('Skip')).not.toBeInTheDocument();

    // Step 3 (Websites - Index 2) -> Skip IS visible
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Skip')).toBeInTheDocument();

    // Step 4 (Profile Summary - Index 3) -> Skip IS NOT visible
    fireEvent.click(screen.getByText('Next'));
    expect(screen.queryByText('Skip')).not.toBeInTheDocument();
  });

  // --- UnSkip Logic (Previous Button) ---
  it('re-enables a field when going Previous from a future step', () => {
    renderWizard();

    // Go to Websites (Index 2)
    fireEvent.click(screen.getByText('Next'));
    fireEvent.click(screen.getByText('Next'));

    // Move to Profile Summary (Index 3)
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Page: Profile Summary')).toBeInTheDocument();

    // Click Previous to go back to Websites
    fireEvent.click(screen.getByText('Previous'));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: SET_SKIP_FIELD,
      payload: { websiteFields: false },
    });

    expect(screen.getByText('Page: Websites')).toBeInTheDocument();
  });

  // --- Submit and complete button ---
  it('handles final submission on the last step', () => {
    renderWizard();

    // Fast forward to last step (Index 12)
    for (let i = 0; i < 12; i++) {
      fireEvent.click(screen.getByText('Next'));
    }

    expect(screen.getByText('Page: Completed')).toBeInTheDocument();

    const submitBtn = screen.getByText('Submit');
    fireEvent.click(submitBtn);

    expect(mockNavigate).toHaveBeenCalledWith('/resumeCrafted');
    // Using imported toast
    expect(toast.success).toHaveBeenCalledWith('Resume crafted Successfully');
  });

  // --- Keyboard Navigation ---
  it('navigates with Enter key', () => {
    const { container } = renderWizard();

    const form = container.querySelector('form');

    // Press Enter on the form element
    fireEvent.keyDown(form, { key: 'Enter', code: 'Enter' });

    // Should move to Step 2
    expect(screen.getByText('Page: Address')).toBeInTheDocument();
  });

  // --- Hover Effect ---
  it('applies hover class to main section when submit button is hovered', () => {
    renderWizard();

    // Go to last page
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
