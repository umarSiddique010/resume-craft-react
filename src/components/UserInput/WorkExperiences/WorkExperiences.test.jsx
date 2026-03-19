import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useReducer } from 'react';
import WorkExperiences from './WorkExperiences';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import {
  ADD_WORK_EXPERIENCE_FIELD,
  UPDATE_WORK_EXPERIENCE_FIELD,
  REMOVE_WORK_EXPERIENCE_FIELD,
  REMOVE_ALL_WORK_EXPERIENCE_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';

// --- MOCK REDUCER & INITIAL STATE ---
const initialWorkExp = {
  id: '1',
  itemNumber: 1,
  jobTitle: '',
  companyName: '',
  location: '',
  startDate: '',
  endDate: '',
  isCurrentlyWorking: false,
  achievements: '',
};

const initialState = {
  workExperienceFields: [initialWorkExp],
};

const mockReducer = (state, action) => {
  switch (action.type) {
    case ADD_WORK_EXPERIENCE_FIELD:
      return {
        ...state,
        workExperienceFields: [
          ...state.workExperienceFields,
          {
            ...initialWorkExp,
            id: String(Date.now()),
            itemNumber: state.workExperienceFields.length + 1,
          },
        ],
      };
    case UPDATE_WORK_EXPERIENCE_FIELD:
      return {
        ...state,
        workExperienceFields: state.workExperienceFields.map((field) =>
          field.id === action.payload.id
            ? { ...field, ...action.payload }
            : field,
        ),
      };
    case REMOVE_WORK_EXPERIENCE_FIELD:
      return {
        ...state,
        workExperienceFields: state.workExperienceFields.filter(
          (field) => field.id !== action.payload,
        ),
      };
    case REMOVE_ALL_WORK_EXPERIENCE_FIELD:
      return {
        ...state,
        workExperienceFields: [initialWorkExp],
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

describe('WorkExperiences Component', () => {
  it('renders the initial work experience form correctly', () => {
    render(
      <MockInputProvider>
        <WorkExperiences />
      </MockInputProvider>,
    );

    // Check Singular Heading
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /^Work Experience$/,
    );

    // Check Inputs
    expect(screen.getByPlaceholderText('Job Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Company Name')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Location (City, Country)'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter End Date/i)).toBeInTheDocument(); // Visible by default
    expect(
      screen.getByPlaceholderText('Responsibilities & Achievements'),
    ).toBeInTheDocument();

    // Check Checkbox
    expect(screen.getByLabelText('Currently working here.')).not.toBeChecked();

    // Buttons (Hidden initially)
    expect(screen.queryByText('Remove Experience')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Remove all Experiences'),
    ).not.toBeInTheDocument();
  });

  it('updates text inputs when typing', () => {
    render(
      <MockInputProvider>
        <WorkExperiences />
      </MockInputProvider>,
    );

    const titleInput = screen.getByPlaceholderText('Job Title');
    const companyInput = screen.getByPlaceholderText('Company Name');
    const achievementsInput = screen.getByPlaceholderText(
      'Responsibilities & Achievements',
    );

    fireEvent.change(titleInput, { target: { value: 'Frontend Developer' } });
    fireEvent.change(companyInput, { target: { value: 'Google' } });
    fireEvent.change(achievementsInput, {
      target: { value: 'Built amazing things' },
    });

    expect(titleInput).toHaveValue('Frontend Developer');
    expect(companyInput).toHaveValue('Google');
    expect(achievementsInput).toHaveValue('Built amazing things');
  });

  it('hides "End Date" input when "Currently working here" is checked', () => {
    render(
      <MockInputProvider>
        <WorkExperiences />
      </MockInputProvider>,
    );

    const checkbox = screen.getByLabelText('Currently working here.');

    // Initially visible
    expect(screen.getByLabelText(/Enter End Date/i)).toBeInTheDocument();

    // Click Checkbox
    fireEvent.click(checkbox);

    // Verify End Date is GONE
    expect(screen.queryByLabelText(/Enter End Date/i)).not.toBeInTheDocument();

    // Uncheck
    fireEvent.click(checkbox);

    // Verify End Date is BACK
    expect(screen.getByLabelText(/Enter End Date/i)).toBeInTheDocument();
  });

  it('adds a new work experience field when "Add Experience" is clicked', () => {
    render(
      <MockInputProvider>
        <WorkExperiences />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Experience');
    fireEvent.click(addButton);

    // Heading changes to Plural
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Work Experiences',
    );

    // Verify two items exist
    const items = screen.getAllByText(/Experience #/i);
    expect(items).toHaveLength(2);
  });

  it('shows "Remove Experience" button only when more than 1 item exists', () => {
    render(
      <MockInputProvider>
        <WorkExperiences />
      </MockInputProvider>,
    );

    // Item: Hidden
    expect(screen.queryByText('Remove Experience')).not.toBeInTheDocument();

    // Items: Visible
    fireEvent.click(screen.getByText('Add Experience'));
    const removeButtons = screen.getAllByText('Remove Experience');
    expect(removeButtons).toHaveLength(2);
  });

  it('removes a specific experience when clicked', () => {
    render(
      <MockInputProvider>
        <WorkExperiences />
      </MockInputProvider>,
    );

    // Add a second job
    fireEvent.click(screen.getByText('Add Experience'));

    // Distinguish them
    const inputs = screen.getAllByPlaceholderText('Job Title');
    fireEvent.change(inputs[0], { target: { value: 'Junior Dev' } });
    fireEvent.change(inputs[1], { target: { value: 'Senior Dev' } });

    // Remove the first one
    const removeButtons = screen.getAllByText('Remove Experience');
    fireEvent.click(removeButtons[0]);

    // Verify Junior is gone, Senior remains
    expect(screen.queryByDisplayValue('Junior Dev')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('Senior Dev')).toBeInTheDocument();
  });

  it('shows "Remove all Experiences" button only when more than 2 items exist', () => {
    render(
      <MockInputProvider>
        <WorkExperiences />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Experience');

    // 1 Item
    expect(
      screen.queryByText('Remove all Experiences'),
    ).not.toBeInTheDocument();

    // 2 Items
    fireEvent.click(addButton);
    expect(
      screen.queryByText('Remove all Experiences'),
    ).not.toBeInTheDocument();

    // 3 Items -> Visible
    fireEvent.click(addButton);
    expect(screen.getByText('Remove all Experiences')).toBeInTheDocument();
  });

  it('removes all experiences and resets to initial state', () => {
    render(
      <MockInputProvider>
        <WorkExperiences />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Experience');

    // Add up to 3 items
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getAllByText(/Experience #/i)).toHaveLength(3);

    // Click Remove All
    fireEvent.click(screen.getByText('Remove all Experiences'));

    // Verify reset to 1 item
    expect(screen.getAllByText(/Experience #/i)).toHaveLength(1);
    expect(
      screen.queryByText('Remove all Experiences'),
    ).not.toBeInTheDocument();
  });
});
