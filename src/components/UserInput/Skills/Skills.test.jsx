import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useReducer } from 'react';
import Skills from './Skills';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import {
  ADD_SKILL_FIELD,
  UPDATE_SKILL_FIELD,
  REMOVE_SKILL_FIELD,
  REMOVE_ALL_SKILL_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';

// --- MOCK REDUCER & INITIAL STATE ---
const initialSkill = {
  id: '1',
  itemNumber: 1,
  skill: '',
  skillLevel: '',
};

const initialState = {
  skillFields: [initialSkill],
};

const mockReducer = (state, action) => {
  switch (action.type) {
    case ADD_SKILL_FIELD:
      return {
        ...state,
        skillFields: [
          ...state.skillFields,
          {
            id: String(Date.now()),
            itemNumber: state.skillFields.length + 1,
            skill: '',
            skillLevel: '',
          },
        ],
      };
    case UPDATE_SKILL_FIELD:
      return {
        ...state,
        skillFields: state.skillFields.map((field) =>
          field.id === action.payload.id
            ? { ...field, ...action.payload }
            : field,
        ),
      };
    case REMOVE_SKILL_FIELD:
      return {
        ...state,
        skillFields: state.skillFields.filter(
          (field) => field.id !== action.payload,
        ),
      };
    case REMOVE_ALL_SKILL_FIELD:
      return {
        ...state,
        skillFields: [initialSkill],
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

describe('Skills Component', () => {
  it('renders the initial skill form correctly', () => {
    render(
      <MockInputProvider>
        <Skills />
      </MockInputProvider>,
    );

    // Check Singular Heading
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /^Skill$/,
    );

    // Check Text Input
    expect(screen.getByPlaceholderText('Skill')).toBeInTheDocument();

    // Check Dropdown
    const select = screen.getByLabelText(/Select Your Level/i);
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue('Select Your Level');

    // Check Buttons (Hidden initially)
    expect(screen.queryByText('Remove Skill')).not.toBeInTheDocument();
    expect(screen.queryByText('Remove all Skills')).not.toBeInTheDocument();
  });

  it('updates skill name and level when changed', () => {
    render(
      <MockInputProvider>
        <Skills />
      </MockInputProvider>,
    );

    const skillInput = screen.getByPlaceholderText('Skill');
    const levelSelect = screen.getByLabelText(/Select Your Level/i);

    // Type Skill
    fireEvent.change(skillInput, { target: { value: 'React Native' } });

    // Select Level
    fireEvent.change(levelSelect, { target: { value: 'Advanced' } });

    expect(skillInput).toHaveValue('React Native');
    expect(levelSelect).toHaveValue('Advanced');
  });

  it('adds a new skill field when "Add Skill" is clicked', () => {
    render(
      <MockInputProvider>
        <Skills />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Skill');
    fireEvent.click(addButton);

    // Heading changes to Plural
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Skills',
    );

    // Two inputs exist
    const inputs = screen.getAllByPlaceholderText('Skill');
    expect(inputs).toHaveLength(2);
  });

  it('shows "Remove Skill" button only when more than 1 item exists', () => {
    render(
      <MockInputProvider>
        <Skills />
      </MockInputProvider>,
    );

    // 1 Item: Hidden
    expect(screen.queryByText('Remove Skill')).not.toBeInTheDocument();

    // 2 Items: Visible
    fireEvent.click(screen.getByText('Add Skill'));
    const removeButtons = screen.getAllByText('Remove Skill');
    expect(removeButtons).toHaveLength(2);
  });

  it('removes a specific skill when clicked', () => {
    render(
      <MockInputProvider>
        <Skills />
      </MockInputProvider>,
    );

    // Add a second skill
    fireEvent.click(screen.getByText('Add Skill'));

    // Distinguish them
    const inputs = screen.getAllByPlaceholderText('Skill');
    fireEvent.change(inputs[0], { target: { value: 'JavaScript' } });
    fireEvent.change(inputs[1], { target: { value: 'Python' } });

    // Remove the first one ("JavaScript")
    const removeButtons = screen.getAllByText('Remove Skill');
    fireEvent.click(removeButtons[0]);

    // Verify JS is gone, Python remains
    expect(screen.queryByDisplayValue('JavaScript')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('Python')).toBeInTheDocument();
  });

  it('shows "Remove all Skills" button only when more than 2 items exist', () => {
    render(
      <MockInputProvider>
        <Skills />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Skill');

    // 1 Item
    expect(screen.queryByText('Remove all Skills')).not.toBeInTheDocument();

    // 2 Items
    fireEvent.click(addButton);
    expect(screen.queryByText('Remove all Skills')).not.toBeInTheDocument();

    // 3 Items -> Visible
    fireEvent.click(addButton);
    expect(screen.getByText('Remove all Skills')).toBeInTheDocument();
  });

  it('removes all skills and resets to initial state', () => {
    render(
      <MockInputProvider>
        <Skills />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Skill');

    // Add up to 3 items
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getAllByPlaceholderText('Skill')).toHaveLength(3);

    // Click Remove All
    fireEvent.click(screen.getByText('Remove all Skills'));

    // Verify reset to 1 item
    expect(screen.getAllByPlaceholderText('Skill')).toHaveLength(1);
    expect(screen.queryByText('Remove all Skills')).not.toBeInTheDocument();
  });
});
