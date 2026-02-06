import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useReducer } from 'react';
import Certifications from './Certifications';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import {
  ADD_CERTIFICATION_FIELD,
  UPDATE_CERTIFICATION_FIELD,
  REMOVE_CERTIFICATION_FIELD,
  REMOVE_ALL_CERTIFICATION_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';

// --- MOCK REDUCER & INITIAL STATE ---
const initialCert = {
  id: '1',
  itemNumber: 1,
  certificationName: '',
  issuingOrganization: '',
  issueDate: '',
  expiryDate: '',
  credential: '',
  noDates: false,
};

const initialState = {
  certificationFields: [initialCert],
};

const mockReducer = (state, action) => {
  switch (action.type) {
    case ADD_CERTIFICATION_FIELD:
      return {
        ...state,
        certificationFields: [
          ...state.certificationFields,
          {
            id: String(Date.now()),
            itemNumber: state.certificationFields.length + 1,
            certificationName: '',
            issuingOrganization: '',
            issueDate: '',
            expiryDate: '',
            credential: '',
            noDates: false,
          },
        ],
      };
    case UPDATE_CERTIFICATION_FIELD:
      return {
        ...state,
        certificationFields: state.certificationFields.map((field) =>
          field.id === action.payload.id
            ? { ...field, ...action.payload }
            : field,
        ),
      };
    case REMOVE_CERTIFICATION_FIELD:
      return {
        ...state,
        certificationFields: state.certificationFields.filter(
          (field) => field.id !== action.payload,
        ),
      };
    case REMOVE_ALL_CERTIFICATION_FIELD:
      return {
        ...state,
        certificationFields: [initialCert],
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

describe('Certifications Component', () => {
  it('renders the initial certification form correctly', () => {
    render(
      <MockInputProvider>
        <Certifications />
      </MockInputProvider>,
    );

    // Check Heading (Singular)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /^Certification$/,
    );

    // Check Inputs
    expect(
      screen.getByPlaceholderText('Certification Name'),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('Issuing Organization'),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/Enter Issue Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter Expiry Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText('No Dates.')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Credential ID or Link'),
    ).toBeInTheDocument();

    // Remove buttons should be hidden initially
    expect(screen.queryByText('Remove Certification')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Remove all Certification'),
    ).not.toBeInTheDocument();
  });

  it('updates text inputs and checkbox correctly', () => {
    render(
      <MockInputProvider>
        <Certifications />
      </MockInputProvider>,
    );

    const nameInput = screen.getByPlaceholderText('Certification Name');
    const orgInput = screen.getByPlaceholderText('Issuing Organization');
    const noDatesCheckbox = screen.getByLabelText('No Dates.');

    // Simulate typing
    fireEvent.change(nameInput, { target: { value: 'React Certified' } });
    fireEvent.change(orgInput, { target: { value: 'Meta' } });

    // Simulate Checkbox click
    fireEvent.click(noDatesCheckbox);

    expect(nameInput).toHaveValue('React Certified');
    expect(orgInput).toHaveValue('Meta');
    expect(noDatesCheckbox).toBeChecked();
  });

  it('adds a new certification field when "Add Certification" is clicked', () => {
    render(
      <MockInputProvider>
        <Certifications />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Certification');
    fireEvent.click(addButton);

    // Check for plural heading
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Certifications',
    );

    // Check we have 2 forms now
    const items = screen.getAllByText(/Certification #/i);
    expect(items).toHaveLength(2);
  });

  it('shows "Remove Certification" button only when more than 1 item exists', () => {
    render(
      <MockInputProvider>
        <Certifications />
      </MockInputProvider>,
    );

    // 1 Item: Hidden
    expect(screen.queryByText('Remove Certification')).not.toBeInTheDocument();

    // 2 Items: Visible
    fireEvent.click(screen.getByText('Add Certification'));
    const removeButtons = screen.getAllByText('Remove Certification');
    expect(removeButtons).toHaveLength(2);
  });

  it('removes a specific certification when clicked', () => {
    render(
      <MockInputProvider>
        <Certifications />
      </MockInputProvider>,
    );

    // Add a second cert
    fireEvent.click(screen.getByText('Add Certification'));

    // Name them to distinguish
    const inputs = screen.getAllByPlaceholderText('Certification Name');
    fireEvent.change(inputs[0], { target: { value: 'Cert A' } });
    fireEvent.change(inputs[1], { target: { value: 'Cert B' } });

    // Remove the first one
    const removeButtons = screen.getAllByText('Remove Certification');
    fireEvent.click(removeButtons[0]);

    // Verify 'Cert A' is gone, 'Cert B' remains
    expect(screen.queryByDisplayValue('Cert A')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('Cert B')).toBeInTheDocument();
  });

  it('shows "Remove all Certification" button only when more than 2 items exist', () => {
    render(
      <MockInputProvider>
        <Certifications />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Certification');

    // 1 Item: Hidden
    expect(
      screen.queryByText('Remove all Certification'),
    ).not.toBeInTheDocument();

    // 2 Items: Hidden
    fireEvent.click(addButton);
    expect(
      screen.queryByText('Remove all Certification'),
    ).not.toBeInTheDocument();

    // 3 Items: Visible
    fireEvent.click(addButton);
    expect(screen.getByText('Remove all Certification')).toBeInTheDocument();
  });

  it('removes all certifications and resets to initial state', () => {
    render(
      <MockInputProvider>
        <Certifications />
      </MockInputProvider>,
    );

    const addButton = screen.getByText('Add Certification');

    // Add up to 3 items
    fireEvent.click(addButton);
    fireEvent.click(addButton);
    expect(screen.getAllByText(/Certification #/i)).toHaveLength(3);

    // Click Remove All
    fireEvent.click(screen.getByText('Remove all Certification'));

    // Verify reset to 1 item
    expect(screen.getAllByText(/Certification #/i)).toHaveLength(1);
    expect(
      screen.queryByText('Remove all Certification'),
    ).not.toBeInTheDocument();
  });
});
