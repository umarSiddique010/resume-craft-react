import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useReducer } from 'react';
import Websites from './Websites';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import {
  SET_WEBSITE_INPUT,
  ADD_MORE_LINK_FIELD,
  UPDATE_MORE_LINK_FIELD,
  REMOVE_MORE_LINK_FIELD,
  REMOVE_ALL_MORE_LINK_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';

// --- MOCK REDUCER & INITIAL STATE ---
const initialMoreLink = {
  id: '1',
  itemNumber: 1,
  link: '',
};

const initialState = {
  websiteInput: {
    linkedIn: '',
    gitHub: '',
    portfolio: '',
  },
  moreLinkFields: [initialMoreLink],
};

const mockReducer = (state, action) => {
  switch (action.type) {
    case SET_WEBSITE_INPUT:
      return {
        ...state,
        websiteInput: {
          ...state.websiteInput,
          ...action.payload,
        },
      };
    case ADD_MORE_LINK_FIELD:
      return {
        ...state,
        moreLinkFields: [
          ...state.moreLinkFields,
          {
            id: String(Date.now()),
            itemNumber: state.moreLinkFields.length + 1,
            link: '',
          },
        ],
      };
    case UPDATE_MORE_LINK_FIELD:
      return {
        ...state,
        moreLinkFields: state.moreLinkFields.map((field) =>
          field.id === action.payload.id
            ? { ...field, ...action.payload }
            : field,
        ),
      };
    case REMOVE_MORE_LINK_FIELD:
      return {
        ...state,
        moreLinkFields: state.moreLinkFields.filter(
          (field) => field.id !== action.payload,
        ),
      };
    case REMOVE_ALL_MORE_LINK_FIELD:
      return {
        ...state,
        moreLinkFields: [initialMoreLink],
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

describe('Websites Component', () => {
  it('renders the initial static and dynamic inputs', () => {
    render(
      <MockInputProvider>
        <Websites />
      </MockInputProvider>,
    );

    // Main Heading
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Website links',
    );

    // Static Inputs
    expect(
      screen.getByPlaceholderText('LinkedIn profile URL'),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('GitHub URL')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Portfolio Website URL'),
    ).toBeInTheDocument();

    // Dynamic Input (Initial 1)
    expect(screen.getByText('URL #1')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Website URL')).toBeInTheDocument();

    // Buttons (Hidden initially)
    expect(screen.queryByText('Remove Extra URL')).not.toBeInTheDocument();
    expect(screen.queryByText('Remove all Extra URL')).not.toBeInTheDocument();
  });

  it('updates static inputs (LinkedIn, GitHub) when typing', () => {
    render(
      <MockInputProvider>
        <Websites />
      </MockInputProvider>,
    );

    const linkedIn = screen.getByPlaceholderText('LinkedIn profile URL');
    const github = screen.getByPlaceholderText('GitHub URL');

    fireEvent.change(linkedIn, { target: { value: 'linkedin.com/in/me' } });
    fireEvent.change(github, { target: { value: 'github.com/me' } });

    expect(linkedIn).toHaveValue('linkedin.com/in/me');
    expect(github).toHaveValue('github.com/me');
  });

  it('updates dynamic "More Link" inputs when typing', () => {
    render(
      <MockInputProvider>
        <Websites />
      </MockInputProvider>,
    );

    const extraLink = screen.getByPlaceholderText('Website URL');
    fireEvent.change(extraLink, { target: { value: 'mysite.com' } });

    expect(extraLink).toHaveValue('mysite.com');
  });

  it('adds a new "More Link" field when "Add URL" is clicked', () => {
    render(
      <MockInputProvider>
        <Websites />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add URL');
    fireEvent.click(addButton);

    // Should see URL #1 and URL #2
    expect(screen.getByText('URL #1')).toBeInTheDocument();
    expect(screen.getByText('URL #2')).toBeInTheDocument();

    // Should have 2 inputs with placeholder "Website URL"
    expect(screen.getAllByPlaceholderText('Website URL')).toHaveLength(2);
  });

  it('shows "Remove Extra URL" button only when more than 1 dynamic item exists', () => {
    render(
      <MockInputProvider>
        <Websites />
      </MockInputProvider>,
    );

    // 1 Item: Hidden
    expect(screen.queryByText('Remove Extra URL')).not.toBeInTheDocument();

    // 2 Items: Visible
    fireEvent.click(screen.getByText('Add URL'));
    const removeButtons = screen.getAllByText('Remove Extra URL');
    expect(removeButtons).toHaveLength(2);
  });

  it('removes a specific extra URL when clicked', () => {
    render(
      <MockInputProvider>
        <Websites />
      </MockInputProvider>,
    );

    // Add second link
    fireEvent.click(screen.getByText('Add URL'));

    // Distinguish them
    const inputs = screen.getAllByPlaceholderText('Website URL');
    fireEvent.change(inputs[0], { target: { value: 'First Link' } });
    fireEvent.change(inputs[1], { target: { value: 'Second Link' } });

    // Remove the first one
    const removeButtons = screen.getAllByText('Remove Extra URL');
    fireEvent.click(removeButtons[0]);

    // Verify First is gone, Second remains
    expect(screen.queryByDisplayValue('First Link')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('Second Link')).toBeInTheDocument();
  });

  it('removes all extra URLs and resets to initial state', () => {
    render(
      <MockInputProvider>
        <Websites />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add URL');

    // Add up to 3 items
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getAllByText(/URL #/i)).toHaveLength(3);

    // Click Remove All
    fireEvent.click(screen.getByText('Remove all Extra URL'));

    // Verify reset to 1 item
    expect(screen.getAllByText(/URL #/i)).toHaveLength(1);
    expect(screen.queryByText('Remove all Extra URL')).not.toBeInTheDocument();
  });
});
