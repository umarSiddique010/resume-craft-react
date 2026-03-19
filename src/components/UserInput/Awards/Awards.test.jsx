import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useReducer } from 'react';
import Awards from './Awards';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import {
  ADD_AWARD_FIELD,
  UPDATE_AWARD_FIELD,
  REMOVE_AWARD_FIELD,
  REMOVE_ALL_AWARD_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';

// --- MOCK REDUCER & INITIAL STATE ---

const initialAward = {
  id: '1',
  itemNumber: 1,
  awardName: '',
  year: '',
  details: '',
};

const initialState = {
  awardFields: [initialAward],
};

const mockReducer = (state, action) => {
  switch (action.type) {
    case ADD_AWARD_FIELD:
      return {
        ...state,
        awardFields: [
          ...state.awardFields,
          {
            id: String(Date.now()), // unique fake ID
            itemNumber: state.awardFields.length + 1,
            awardName: '',
            year: '',
            details: '',
          },
        ],
      };
    case UPDATE_AWARD_FIELD:
      return {
        ...state,
        awardFields: state.awardFields.map((field) =>
          field.id === action.payload.id
            ? { ...field, ...action.payload }
            : field,
        ),
      };
    case REMOVE_AWARD_FIELD:
      return {
        ...state,
        awardFields: state.awardFields.filter(
          (field) => field.id !== action.payload,
        ),
      };
    case REMOVE_ALL_AWARD_FIELD:
      return {
        ...state,
        awardFields: [initialAward],
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

describe('Awards Component', () => {
  it('renders the initial award form correctly', () => {
    render(
      <MockInputProvider>
        <Awards />
      </MockInputProvider>,
    );

    // Check Heading
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /^Award$/,
    );

    // Check Inputs
    expect(screen.getByPlaceholderText('Award Name')).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter Year/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Details')).toBeInTheDocument();

    // "Remove Award" button should NOT be visible initially (length = 1)
    expect(screen.queryByText('Remove Award')).not.toBeInTheDocument();
  });

  it('updates input values when typing', () => {
    render(
      <MockInputProvider>
        <Awards />
      </MockInputProvider>,
    );

    const nameInput = screen.getByPlaceholderText('Award Name');
    const detailsInput = screen.getByPlaceholderText('Details');

    fireEvent.change(nameInput, { target: { value: 'Best Developer' } });
    fireEvent.change(detailsInput, {
      target: { value: 'Awarded for clean code' },
    });

    expect(nameInput).toHaveValue('Best Developer');
    expect(detailsInput).toHaveValue('Awarded for clean code');
  });

  it('adds a new award field when "Add Award" is clicked', () => {
    render(
      <MockInputProvider>
        <Awards />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Award');
    fireEvent.click(addButton);

    // Now there should be 2 headings saying "Award #..."
    const awardItems = screen.getAllByText(/Award #/i);
    expect(awardItems).toHaveLength(2);

    // The main heading should change from "Award" to "Awards"
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Awards',
    );
  });

  it('shows "Remove Award" button only when more than 1 item exists', () => {
    render(
      <MockInputProvider>
        <Awards />
      </MockInputProvider>,
    );

    // Initially hidden
    expect(screen.queryByText('Remove Award')).not.toBeInTheDocument();

    // Add one
    fireEvent.click(screen.getByText('Add Award'));

    // Now visible (should be 2 remove buttons, one for each card)
    const removeButtons = screen.getAllByText('Remove Award');
    expect(removeButtons).toHaveLength(2);
  });

  it('removes a specific award when "Remove Award" is clicked', () => {
    render(
      <MockInputProvider>
        <Awards />
      </MockInputProvider>,
    );

    // Add a second award so that it can test removal
    fireEvent.click(screen.getByText('Add Award'));

    // Type into the first one so we can distinguish it
    const inputs = screen.getAllByPlaceholderText('Award Name');
    fireEvent.change(inputs[0], { target: { value: 'First Award' } });
    fireEvent.change(inputs[1], { target: { value: 'Second Award' } });

    // Find the remove button for the FIRST award and click it
    const removeButtons = screen.getAllByText('Remove Award');
    fireEvent.click(removeButtons[0]);

    // Now only "Second Award" should remain
    expect(screen.queryByDisplayValue('First Award')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('Second Award')).toBeInTheDocument();
  });

  it('shows "Remove all Awards" button only when more than 2 items exist', () => {
    render(
      <MockInputProvider>
        <Awards />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Award');

    // 1 Item: Hidden
    expect(screen.queryByText('Remove all Awards')).not.toBeInTheDocument();

    // 2 Items: Hidden
    fireEvent.click(addButton);
    expect(screen.queryByText('Remove all Awards')).not.toBeInTheDocument();

    // 3 Items: Visible
    fireEvent.click(addButton);
    expect(screen.getByText('Remove all Awards')).toBeInTheDocument();
  });

  it('removes all awards and resets to initial state', () => {
    render(
      <MockInputProvider>
        <Awards />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Award');

    // Add up to 3 items
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    expect(screen.getAllByText(/Award #/i)).toHaveLength(3);

    fireEvent.click(screen.getByText('Remove all Awards'));

    expect(screen.getAllByText(/Award #/i)).toHaveLength(1);
    expect(screen.queryByText('Remove all Awards')).not.toBeInTheDocument();
  });
});
