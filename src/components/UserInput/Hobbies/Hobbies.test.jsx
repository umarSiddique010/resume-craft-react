import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useReducer } from 'react';
import Hobbies from './Hobbies';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import {
  ADD_HOBBY_FIELD,
  UPDATE_HOBBY_FIELD,
  REMOVE_HOBBY_FIELD,
  REMOVE_ALL_HOBBY_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';

// --- MOCK REDUCER & INITIAL STATE ---
const initialHobby = {
  id: '1',
  itemNumber: 1,
  hobby: '',
};

const initialState = {
  hobbyFields: [initialHobby],
};

const mockReducer = (state, action) => {
  switch (action.type) {
    case ADD_HOBBY_FIELD:
      return {
        ...state,
        hobbyFields: [
          ...state.hobbyFields,
          {
            id: String(Date.now()),
            itemNumber: state.hobbyFields.length + 1,
            hobby: '',
          },
        ],
      };
    case UPDATE_HOBBY_FIELD:
      return {
        ...state,
        hobbyFields: state.hobbyFields.map((field) =>
          field.id === action.payload.id
            ? { ...field, ...action.payload }
            : field,
        ),
      };
    case REMOVE_HOBBY_FIELD:
      return {
        ...state,
        hobbyFields: state.hobbyFields.filter(
          (field) => field.id !== action.payload,
        ),
      };
    case REMOVE_ALL_HOBBY_FIELD:
      return {
        ...state,
        hobbyFields: [initialHobby],
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

describe('Hobbies Component', () => {
  it('renders the initial hobby form correctly', () => {
    render(
      <MockInputProvider>
        <Hobbies />
      </MockInputProvider>,
    );

    // Check Singular Heading
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /^Hobby$/,
    );

    // Check Input
    expect(screen.getByPlaceholderText('hobby')).toBeInTheDocument();

    // Check Buttons (Hidden initially)
    expect(screen.queryByText('Remove Hobby')).not.toBeInTheDocument();
    expect(screen.queryByText('Remove All Hobbies')).not.toBeInTheDocument();
  });

  it('updates the hobby input when typing', () => {
    render(
      <MockInputProvider>
        <Hobbies />
      </MockInputProvider>,
    );

    const input = screen.getByPlaceholderText('hobby');
    fireEvent.change(input, { target: { value: 'Photography' } });

    expect(input).toHaveValue('Photography');
  });

  it('adds a new hobby field when "Add Hobby" is clicked', () => {
    render(
      <MockInputProvider>
        <Hobbies />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Hobby');
    fireEvent.click(addButton);

    // Heading changes to Plural
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Hobbies',
    );

    // Two inputs exist
    const inputs = screen.getAllByPlaceholderText('hobby');
    expect(inputs).toHaveLength(2);
  });

  it('shows "Remove Hobby" button only when more than 1 item exists', () => {
    render(
      <MockInputProvider>
        <Hobbies />
      </MockInputProvider>,
    );

    // 1 Item: Hidden
    expect(screen.queryByText('Remove Hobby')).not.toBeInTheDocument();

    // 2 Items: Visible
    fireEvent.click(screen.getByText('Add Hobby'));
    const removeButtons = screen.getAllByText('Remove Hobby');
    expect(removeButtons).toHaveLength(2);
  });

  it('removes a specific hobby when clicked', () => {
    render(
      <MockInputProvider>
        <Hobbies />
      </MockInputProvider>,
    );

    // Add a second hobby
    fireEvent.click(screen.getByText('Add Hobby'));

    // Distinguish them
    const inputs = screen.getAllByPlaceholderText('hobby');
    fireEvent.change(inputs[0], { target: { value: 'Reading' } });
    fireEvent.change(inputs[1], { target: { value: 'Gaming' } });

    // Remove the first one ("Reading")
    const removeButtons = screen.getAllByText('Remove Hobby');
    fireEvent.click(removeButtons[0]);

    // Verify Reading is gone, Gaming remains
    expect(screen.queryByDisplayValue('Reading')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('Gaming')).toBeInTheDocument();
  });

  it('shows "Remove All Hobbies" button only when more than 2 items exist', () => {
    render(
      <MockInputProvider>
        <Hobbies />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Hobby');

    // 1 Item
    expect(screen.queryByText('Remove All Hobbies')).not.toBeInTheDocument();

    // 2 Items
    fireEvent.click(addButton);
    expect(screen.queryByText('Remove All Hobbies')).not.toBeInTheDocument();

    // 3 Items -> Visible
    fireEvent.click(addButton);
    expect(screen.getByText('Remove All Hobbies')).toBeInTheDocument();
  });

  it('removes all hobbies and resets to initial state', () => {
    render(
      <MockInputProvider>
        <Hobbies />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Hobby');

    // Add up to 3 items
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getAllByPlaceholderText('hobby')).toHaveLength(3);

    // Click Remove All
    fireEvent.click(screen.getByText('Remove All Hobbies'));

    // Verify reset to 1 item
    expect(screen.getAllByPlaceholderText('hobby')).toHaveLength(1);
    expect(screen.queryByText('Remove All Hobbies')).not.toBeInTheDocument();
  });
});
