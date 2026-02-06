import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useReducer } from 'react';
import Languages from './Languages';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import {
  ADD_LANGUAGE_FIELD,
  UPDATE_LANGUAGE_FIELD,
  REMOVE_LANGUAGE_FIELD,
  REMOVE_ALL_LANGUAGE_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';

// --- MOCK REDUCER & INITIAL STATE ---
const initialLanguage = {
  id: '1',
  itemNumber: 1,
  language: '',
  proficiencyLevel: '',
};

const initialState = {
  languageFields: [initialLanguage],
};

const mockReducer = (state, action) => {
  switch (action.type) {
    case ADD_LANGUAGE_FIELD:
      return {
        ...state,
        languageFields: [
          ...state.languageFields,
          {
            id: String(Date.now()),
            itemNumber: state.languageFields.length + 1,
            language: '',
            proficiencyLevel: '',
          },
        ],
      };
    case UPDATE_LANGUAGE_FIELD:
      return {
        ...state,
        languageFields: state.languageFields.map((field) =>
          field.id === action.payload.id
            ? { ...field, ...action.payload }
            : field,
        ),
      };
    case REMOVE_LANGUAGE_FIELD:
      return {
        ...state,
        languageFields: state.languageFields.filter(
          (field) => field.id !== action.payload,
        ),
      };
    case REMOVE_ALL_LANGUAGE_FIELD:
      return {
        ...state,
        languageFields: [initialLanguage],
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

describe('Languages Component', () => {
  it('renders the initial language form correctly', () => {
    render(
      <MockInputProvider>
        <Languages />
      </MockInputProvider>,
    );

    // Check Singular Heading
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /^Language$/,
    );

    // Check Text Input
    expect(screen.getByPlaceholderText('Language')).toBeInTheDocument();

    // Check Select Dropdown
    const selects = screen.getAllByRole('combobox');
    expect(selects[0]).toBeInTheDocument();
    expect(selects[0]).toHaveValue('Proficiency Level');

    // Check Buttons (Hidden initially)
    expect(screen.queryByText('Remove Language')).not.toBeInTheDocument();
    expect(screen.queryByText('Remove All Languages')).not.toBeInTheDocument();
  });

  it('updates language name and proficiency level when changed', () => {
    render(
      <MockInputProvider>
        <Languages />
      </MockInputProvider>,
    );

    const languageInput = screen.getByPlaceholderText('Language');
    const proficiencySelect = screen.getByRole('combobox');

    // Type Language
    fireEvent.change(languageInput, { target: { value: 'Spanish' } });

    // Select Proficiency
    fireEvent.change(proficiencySelect, { target: { value: 'Fluent' } });

    expect(languageInput).toHaveValue('Spanish');
    expect(proficiencySelect).toHaveValue('Fluent');
  });

  it('adds a new language field when "Add Language" is clicked', () => {
    render(
      <MockInputProvider>
        <Languages />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Language');
    fireEvent.click(addButton);

    // Heading changes to Plural
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Languages',
    );

    // Two inputs exist
    const inputs = screen.getAllByPlaceholderText('Language');
    expect(inputs).toHaveLength(2);
  });

  it('shows "Remove Language" button only when more than 1 item exists', () => {
    render(
      <MockInputProvider>
        <Languages />
      </MockInputProvider>,
    );

    // 1 Item: Hidden
    expect(screen.queryByText('Remove Language')).not.toBeInTheDocument();

    // 2 Items: Visible
    fireEvent.click(screen.getByText('Add Language'));
    const removeButtons = screen.getAllByText('Remove Language');
    expect(removeButtons).toHaveLength(2);
  });

  it('removes a specific language when clicked', () => {
    render(
      <MockInputProvider>
        <Languages />
      </MockInputProvider>,
    );

    // Add a second language
    fireEvent.click(screen.getByText('Add Language'));

    // Distinguish them
    const inputs = screen.getAllByPlaceholderText('Language');
    fireEvent.change(inputs[0], { target: { value: 'English' } });
    fireEvent.change(inputs[1], { target: { value: 'German' } });

    // Remove the first one ("English")
    const removeButtons = screen.getAllByText('Remove Language');
    fireEvent.click(removeButtons[0]);

    // Verify English is gone, German remains
    expect(screen.queryByDisplayValue('English')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('German')).toBeInTheDocument();
  });

  it('shows "Remove All Languages" button only when more than 2 items exist', () => {
    render(
      <MockInputProvider>
        <Languages />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Language');

    // 1 Item
    expect(screen.queryByText('Remove All Languages')).not.toBeInTheDocument();

    // 2 Items
    fireEvent.click(addButton);
    expect(screen.queryByText('Remove All Languages')).not.toBeInTheDocument();

    // 3 Items -> Visible
    fireEvent.click(addButton);
    expect(screen.getByText('Remove All Languages')).toBeInTheDocument();
  });

  it('removes all languages and resets to initial state', () => {
    render(
      <MockInputProvider>
        <Languages />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Language');

    // Add up to 3 items
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getAllByPlaceholderText('Language')).toHaveLength(3);

    // Click Remove All
    fireEvent.click(screen.getByText('Remove All Languages'));

    // Verify reset to 1 item
    expect(screen.getAllByPlaceholderText('Language')).toHaveLength(1);
    expect(screen.queryByText('Remove All Languages')).not.toBeInTheDocument();
  });
});
