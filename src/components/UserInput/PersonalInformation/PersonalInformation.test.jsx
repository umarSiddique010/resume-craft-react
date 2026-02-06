import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { useReducer } from 'react';
import PersonalInformation from './PersonalInformation';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import { SET_PERSONAL_INFO_INPUT } from '../../../context/UserInputContext/reducer/resumeTypes';

// --- MOCK URL.createObjectURL ---
beforeEach(() => {
  window.URL.createObjectURL = vi.fn(
    () => 'blob:http://localhost/mock-image-url',
  );
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

// --- MOCK REDUCER & INITIAL STATE ---
const initialState = {
  personalInfoInput: {
    fullName: '',
    profession: '',
    email: '',
    phoneNumber: '',
    profilePic: '',
    isNotProfilePic: false,
  },
};

const mockReducer = (state, action) => {
  switch (action.type) {
    case SET_PERSONAL_INFO_INPUT:
      return {
        ...state,
        personalInfoInput: {
          ...state.personalInfoInput,
          ...action.payload,
        },
      };
    default:
      return state;
  }
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

describe('PersonalInformation Component', () => {
  it('renders all input fields correctly', () => {
    render(
      <MockInputProvider>
        <PersonalInformation />
      </MockInputProvider>,
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Personal Information',
    );
    expect(
      screen.getByLabelText(/Select a Profile Picture/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter your Profession/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter your Email/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Enter your phone number/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/I don't want to add Profile Picture/i),
    ).toBeInTheDocument();
  });

  it('updates text inputs when typing', () => {
    render(
      <MockInputProvider>
        <PersonalInformation />
      </MockInputProvider>,
    );

    const nameInput = screen.getByLabelText(/Enter full name/i);
    const professionInput = screen.getByLabelText(/Enter your Profession/i);
    const emailInput = screen.getByLabelText(/Enter your Email/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(professionInput, {
      target: { value: 'Software Engineer' },
    });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    expect(nameInput).toHaveValue('John Doe');
    expect(professionInput).toHaveValue('Software Engineer');
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('handles profile picture upload', () => {
    render(
      <MockInputProvider>
        <PersonalInformation />
      </MockInputProvider>,
    );

    const file = new window.File(['(⌐□_□)'], 'chucknorris.png', {
      type: 'image/png',
    });
    const fileInput = screen.getByLabelText(/Select a Profile Picture/i);

    // Simulate uploading a file
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Verify URL.createObjectURL was called
    expect(window.URL.createObjectURL).toHaveBeenCalledWith(file);
  });

  it('hides profile picture upload when checkbox is checked', () => {
    render(
      <MockInputProvider>
        <PersonalInformation />
      </MockInputProvider>,
    );

    const checkbox = screen.getByLabelText(
      /I don't want to add Profile Picture/i,
    );
    const uploadLabel = screen.queryByLabelText(/Select a Profile Picture/i);

    // 1. Initially visible
    expect(uploadLabel).toBeInTheDocument();

    // 2. Click Checkbox to hide
    fireEvent.click(checkbox);

    // 3. Verify it is gone
    expect(
      screen.queryByLabelText(/Select a Profile Picture/i),
    ).not.toBeInTheDocument();

    // 4. Click Checkbox to show again
    fireEvent.click(checkbox);

    // 5. Verify it is back
    expect(
      screen.getByLabelText(/Select a Profile Picture/i),
    ).toBeInTheDocument();
  });
});
