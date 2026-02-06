import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useReducer } from 'react';
import ProfileSummary from './ProfileSummary';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import { SET_PROFILE_SUMMARY_INPUT } from '../../../context/UserInputContext/reducer/resumeTypes';

// --- MOCK REDUCER & INITIAL STATE ---
const initialState = {
  profileSummaryInput: '',
};

const mockReducer = (state, action) => {
  if (action.type === SET_PROFILE_SUMMARY_INPUT) {
    return {
      ...state,
      profileSummaryInput: action.payload,
    };
  }
  return state;
};

// --- MOCK PROVIDER ---
const MockInputProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mockReducer, initialState);
  return (
    <InputFieldContext.Provider value={[state, dispatch]}>
      {children}
    </InputFieldContext.Provider>
  );
};

describe('ProfileSummary Component', () => {
  it('renders the summary input correctly', () => {
    render(
      <MockInputProvider>
        <ProfileSummary />
      </MockInputProvider>,
    );

    // Check Heading
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /A short bio or career summary/i,
    );

    // Check Label and Textarea
    const textarea = screen.getByLabelText(
      /Enter A short bio or career summary/i,
    );
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('placeholder', 'Summary/Bio');
  });

  it('updates summary text when typing', () => {
    render(
      <MockInputProvider>
        <ProfileSummary />
      </MockInputProvider>,
    );

    const textarea = screen.getByLabelText(
      /Enter A short bio or career summary/i,
    );
    const testText = 'Experienced software developer with a passion for React.';

    fireEvent.change(textarea, { target: { value: testText } });

    expect(textarea).toHaveValue(testText);
  });

  it('has correct length validation attributes', () => {
    render(
      <MockInputProvider>
        <ProfileSummary />
      </MockInputProvider>,
    );

    const textarea = screen.getByLabelText(
      /Enter A short bio or career summary/i,
    );

    // Verify the HTML constraints you set in the component
    expect(textarea).toHaveAttribute('minLength', '150');
    expect(textarea).toHaveAttribute('maxLength', '600');
  });
});
