import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useReducer } from 'react';
import Educations from './Educations';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import {
  ADD_EDUCATION_FIELD,
  UPDATE_EDUCATION_FIELD,
  REMOVE_EDUCATION_FIELD,
  REMOVE_ALL_EDUCATION_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';

// --- MOCK REDUCER & INITIAL STATE ---
const initialEducation = {
  id: '1',
  itemNumber: 1,
  degreeName: '',
  universityCollege: '',
  startDate: '',
  endDate: '',
  isCurrentlyStudying: false,
  coursework: '',
  gpa: '',
};

const initialState = {
  educationFields: [initialEducation],
};

const mockReducer = (state, action) => {
  switch (action.type) {
    case ADD_EDUCATION_FIELD:
      return {
        ...state,
        educationFields: [
          ...state.educationFields,
          {
            id: String(Date.now()),
            itemNumber: state.educationFields.length + 1,
            degreeName: '',
            universityCollege: '',
            startDate: '',
            endDate: '',
            isCurrentlyStudying: false,
            coursework: '',
            gpa: '',
          },
        ],
      };
    case UPDATE_EDUCATION_FIELD:
      return {
        ...state,
        educationFields: state.educationFields.map((field) =>
          field.id === action.payload.id
            ? { ...field, ...action.payload }
            : field,
        ),
      };
    case REMOVE_EDUCATION_FIELD:
      return {
        ...state,
        educationFields: state.educationFields.filter(
          (field) => field.id !== action.payload,
        ),
      };
    case REMOVE_ALL_EDUCATION_FIELD:
      return {
        ...state,
        educationFields: [initialEducation],
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

describe('Educations Component', () => {
  it('renders the initial education form correctly', () => {
    render(
      <MockInputProvider>
        <Educations />
      </MockInputProvider>,
    );

    // Headings
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /^Education$/,
    );

    // Inputs
    expect(screen.getByPlaceholderText('Degree Name')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('University/College Name'),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter Start Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter End Date/i)).toBeInTheDocument(); // Visible by default
    expect(
      screen.getByLabelText('Currently studying here.'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Relevant Coursework'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('GPA')).toBeInTheDocument();

    // Buttons (Hidden initially)
    expect(screen.queryByText('Remove Education')).not.toBeInTheDocument();
  });

  it('updates text inputs correctly', () => {
    render(
      <MockInputProvider>
        <Educations />
      </MockInputProvider>,
    );

    const degreeInput = screen.getByPlaceholderText('Degree Name');
    const uniInput = screen.getByPlaceholderText('University/College Name');
    const gpaInput = screen.getByPlaceholderText('GPA');

    fireEvent.change(degreeInput, { target: { value: 'B.Tech' } });
    fireEvent.change(uniInput, { target: { value: 'MIT' } });
    fireEvent.change(gpaInput, { target: { value: '3.8' } });

    expect(degreeInput).toHaveValue('B.Tech');
    expect(uniInput).toHaveValue('MIT');
    expect(gpaInput).toHaveValue('3.8');
  });

  it('hides "End Date" input when "Currently studying here" is checked', () => {
    render(
      <MockInputProvider>
        <Educations />
      </MockInputProvider>,
    );

    const checkbox = screen.getByLabelText('Currently studying here.');

    // 1. Initially End Date is visible
    expect(screen.getByLabelText(/Enter End Date/i)).toBeInTheDocument();

    // 2. Check the box
    fireEvent.click(checkbox);

    // 3. Verify End Date is REMOVED from DOM
    expect(screen.queryByLabelText(/Enter End Date/i)).not.toBeInTheDocument();

    // 4. Uncheck the box
    fireEvent.click(checkbox);

    // 5. Verify End Date is BACK
    expect(screen.getByLabelText(/Enter End Date/i)).toBeInTheDocument();
  });

  it('adds a new education field when "Add Education" is clicked', () => {
    render(
      <MockInputProvider>
        <Educations />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Education');
    fireEvent.click(addButton);

    // Heading changes to plural
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Educations',
    );

    // Two items present
    expect(screen.getAllByText(/Education #/i)).toHaveLength(2);
  });

  it('removes a specific education entry', () => {
    render(
      <MockInputProvider>
        <Educations />
      </MockInputProvider>,
    );

    // Add second item
    fireEvent.click(screen.getByText('Add Education'));

    // Name them to distinguish
    const inputs = screen.getAllByPlaceholderText('Degree Name');
    fireEvent.change(inputs[0], { target: { value: 'Degree A' } });
    fireEvent.change(inputs[1], { target: { value: 'Degree B' } });

    // Remove first one
    const removeButtons = screen.getAllByText('Remove Education');
    fireEvent.click(removeButtons[0]);

    // Verify Degree A is gone, Degree B remains
    expect(screen.queryByDisplayValue('Degree A')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('Degree B')).toBeInTheDocument();
  });

  it('shows "Remove all educations" button only when more than 2 items exist', () => {
    render(
      <MockInputProvider>
        <Educations />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Education');

    // 1 Item
    expect(screen.queryByText('Remove all educations')).not.toBeInTheDocument();

    // 2 Items
    fireEvent.click(addButton);
    expect(screen.queryByText('Remove all educations')).not.toBeInTheDocument();

    // 3 Items -> Visible
    fireEvent.click(addButton);
    expect(screen.getByText('Remove all educations')).toBeInTheDocument();
  });

  it('removes all educations and resets to initial state', () => {
    render(
      <MockInputProvider>
        <Educations />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Education');

    // Add multiple items
    fireEvent.click(addButton);
    fireEvent.click(addButton); // Total 3
    expect(screen.getAllByText(/Education #/i)).toHaveLength(3);

    // Click Remove All
    fireEvent.click(screen.getByText('Remove all educations'));

    // Check Reset
    expect(screen.getAllByText(/Education #/i)).toHaveLength(1);
    expect(screen.queryByText('Remove all educations')).not.toBeInTheDocument();
  });
});
