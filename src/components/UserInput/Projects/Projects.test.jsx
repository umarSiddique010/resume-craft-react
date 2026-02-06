import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useReducer } from 'react';
import Projects from './Projects';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import {
  ADD_PROJECT_FIELD,
  UPDATE_PROJECT_FIELD,
  REMOVE_PROJECT_FIELD,
  REMOVE_ALL_PROJECT_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';

// --- MOCK REDUCER & INITIAL STATE ---
const initialProject = {
  id: '1',
  itemNumber: 1,
  projectName: '',
  description: '',
  technologiesUsed: '',
  projectLink: '',
  liveDemoLink: '',
};

const initialState = {
  projectFields: [initialProject],
};

const mockReducer = (state, action) => {
  switch (action.type) {
    case ADD_PROJECT_FIELD:
      return {
        ...state,
        projectFields: [
          ...state.projectFields,
          {
            ...initialProject, // copy structure
            id: String(Date.now()), // unique fake ID
            itemNumber: state.projectFields.length + 1,
          },
        ],
      };
    case UPDATE_PROJECT_FIELD:
      return {
        ...state,
        projectFields: state.projectFields.map((field) =>
          field.id === action.payload.id
            ? { ...field, ...action.payload }
            : field,
        ),
      };
    case REMOVE_PROJECT_FIELD:
      return {
        ...state,
        projectFields: state.projectFields.filter(
          (field) => field.id !== action.payload,
        ),
      };
    case REMOVE_ALL_PROJECT_FIELD:
      return {
        ...state,
        projectFields: [initialProject],
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

describe('Projects Component', () => {
  it('renders the initial project form correctly', () => {
    render(
      <MockInputProvider>
        <Projects />
      </MockInputProvider>,
    );

    // Check Singular Heading
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /^Project$/,
    );

    // Check Inputs by Placeholder
    expect(screen.getByPlaceholderText('Project Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Technologies')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Portfolio Link')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Live Demo Link')).toBeInTheDocument();

    // Buttons (Hidden initially)
    expect(screen.queryByText('Remove Project')).not.toBeInTheDocument();
    expect(screen.queryByText('Remove all Projects')).not.toBeInTheDocument();
  });

  it('updates input values when typing', () => {
    render(
      <MockInputProvider>
        <Projects />
      </MockInputProvider>,
    );

    const nameInput = screen.getByPlaceholderText('Project Name');
    const descInput = screen.getByPlaceholderText('Description');
    const techInput = screen.getByPlaceholderText('Technologies');

    fireEvent.change(nameInput, { target: { value: 'Portfolio App' } });
    fireEvent.change(descInput, { target: { value: 'A cool React app' } });
    fireEvent.change(techInput, { target: { value: 'React, Vitest' } });

    expect(nameInput).toHaveValue('Portfolio App');
    expect(descInput).toHaveValue('A cool React app');
    expect(techInput).toHaveValue('React, Vitest');
  });

  it('adds a new project field when "Add Project" is clicked', () => {
    render(
      <MockInputProvider>
        <Projects />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Project');
    fireEvent.click(addButton);

    // Heading changes to Plural
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /^Projects$/,
    );

    // Verify two project sections exist
    const items = screen.getAllByText(/Project #/i);
    expect(items).toHaveLength(2);
  });

  it('shows "Remove Project" button only when more than 1 item exists', () => {
    render(
      <MockInputProvider>
        <Projects />
      </MockInputProvider>,
    );

    // 1 Item: Hidden
    expect(screen.queryByText('Remove Project')).not.toBeInTheDocument();

    // 2 Items: Visible
    fireEvent.click(screen.getByText('Add Project'));
    const removeButtons = screen.getAllByText('Remove Project');
    expect(removeButtons).toHaveLength(2);
  });

  it('removes a specific project when clicked', () => {
    render(
      <MockInputProvider>
        <Projects />
      </MockInputProvider>,
    );

    // Add a second project
    fireEvent.click(screen.getByText('Add Project'));

    // Distinguish them
    const inputs = screen.getAllByPlaceholderText('Project Name');
    fireEvent.change(inputs[0], { target: { value: 'Project Alpha' } });
    fireEvent.change(inputs[1], { target: { value: 'Project Beta' } });

    // Remove the first one
    const removeButtons = screen.getAllByText('Remove Project');
    fireEvent.click(removeButtons[0]);

    // Verify Alpha is gone, Beta remains
    expect(screen.queryByDisplayValue('Project Alpha')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('Project Beta')).toBeInTheDocument();
  });

  it('shows "Remove all Projects" button only when more than 2 items exist', () => {
    render(
      <MockInputProvider>
        <Projects />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Project');

    // 1 Item
    expect(screen.queryByText('Remove all Projects')).not.toBeInTheDocument();

    // 2 Items
    fireEvent.click(addButton);
    expect(screen.queryByText('Remove all Projects')).not.toBeInTheDocument();

    // 3 Items -> Visible
    fireEvent.click(addButton);
    expect(screen.getByText('Remove all Projects')).toBeInTheDocument();
  });

  it('removes all projects and resets to initial state', () => {
    render(
      <MockInputProvider>
        <Projects />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Project');

    // Add up to 3 items
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getAllByText(/Project #/i)).toHaveLength(3);

    // Click Remove All
    fireEvent.click(screen.getByText('Remove all Projects'));

    // Verify reset to 1 item
    expect(screen.getAllByText(/Project #/i)).toHaveLength(1);
    expect(screen.queryByText('Remove all Projects')).not.toBeInTheDocument();
  });
});
