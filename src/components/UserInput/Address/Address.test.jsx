import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Address from './Address';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import { SET_ADDRESS_INPUT } from '../../../context/UserInputContext/reducer/resumeTypes';
import { Country, State, City } from 'country-state-city';
import { useReducer } from 'react';

// --- MOCK THE EXTERNAL LIBRARY (country-state-city) ---
vi.mock('country-state-city', () => ({
  Country: {
    getAllCountries: vi.fn(),
  },
  State: {
    getStatesOfCountry: vi.fn(),
  },
  City: {
    getCitiesOfState: vi.fn(),
  },
}));

// --- SETUP MOCK DATA ---
const mockCountries = [
  { name: 'United States', isoCode: 'US' },
  { name: 'India', isoCode: 'IN' },
];

const mockStatesUS = [
  { name: 'New York', isoCode: 'NY' },
  { name: 'California', isoCode: 'CA' },
];

const mockCitiesNY = [{ name: 'New York City' }, { name: 'Buffalo' }];

// --- MOCK CONTEXT WRAPPER (The Integration Helper) ---

const initialState = {
  addressInput: {
    address: '',
    zipCode: '',
    selectedCountryISO: '',
    selectedStateISO: '',
    selectedCity: '',
    selectedCountryName: '',
    selectedStateName: '',
  },
};

// A simplified reducer that mimics the real application reducer
const mockReducer = (state, action) => {
  if (action.type === SET_ADDRESS_INPUT) {
    return {
      ...state,
      addressInput: {
        ...state.addressInput,
        ...action.payload,
      },
    };
  }
  return state;
};

// The Wrapper Component
const MockInputProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mockReducer, initialState);
  return (
    <InputFieldContext.Provider value={[state, dispatch]}>
      {children}
    </InputFieldContext.Provider>
  );
};

describe('Address Component', () => {
  // Reset mocks before every test
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock returns
    Country.getAllCountries.mockReturnValue(mockCountries);
    State.getStatesOfCountry.mockReturnValue([]);
    City.getCitiesOfState.mockReturnValue([]);
  });

  it('renders all input fields and initial default options', () => {
    render(
      <MockInputProvider>
        <Address />
      </MockInputProvider>,
    );

    // Check Inputs
    expect(screen.getByLabelText(/Enter your address/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Enter your Zip\/Pin Code/i),
    ).toBeInTheDocument();

    // Check Selects
    expect(screen.getByLabelText(/Select your country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select your state/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select your city/i)).toBeInTheDocument();

    // Verify Country Dropdown is populated
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('India')).toBeInTheDocument();
  });

  it('updates Address and Zip Code when user types', () => {
    render(
      <MockInputProvider>
        <Address />
      </MockInputProvider>,
    );

    const addressInput = screen.getByLabelText(/Enter your address/i);
    const zipInput = screen.getByLabelText(/Enter your Zip\/Pin Code/i);

    fireEvent.change(addressInput, { target: { value: '123 Main St' } });
    fireEvent.change(zipInput, { target: { value: '90210' } });

    expect(addressInput).toHaveValue('123 Main St');
    expect(zipInput).toHaveValue('90210');
  });

  it('loads States when a Country is selected (Integration Test)', async () => {
    // When US is selected, return US states
    State.getStatesOfCountry.mockImplementation((iso) => {
      return iso === 'US' ? mockStatesUS : [];
    });

    render(
      <MockInputProvider>
        <Address />
      </MockInputProvider>,
    );

    const countrySelect = screen.getByLabelText(/Select your country/i);

    //  Initially, state dropdown should be empty (or just have default)
    expect(screen.queryByText('New York')).not.toBeInTheDocument();

    //  Select 'United States'
    fireEvent.change(countrySelect, { target: { value: 'US' } });

    // Wait for the useEffect to fire and update the State dropdown
    await waitFor(() => {
      expect(screen.getByText('New York')).toBeInTheDocument();
      expect(screen.getByText('California')).toBeInTheDocument();
    });

    // Check if the mock library was called with correct ISO
    expect(State.getStatesOfCountry).toHaveBeenCalledWith('US');
  });

  it('loads Cities when a State is selected', async () => {
    // Setup mocks for this specific flow
    State.getStatesOfCountry.mockReturnValue(mockStatesUS);
    City.getCitiesOfState.mockReturnValue(mockCitiesNY);

    render(
      <MockInputProvider>
        <Address />
      </MockInputProvider>,
    );

    // simulating the sequence: Select Country -> Select State
    const countrySelect = screen.getByLabelText(/Select your country/i);
    fireEvent.change(countrySelect, { target: { value: 'US' } });

    // Wait for states to appear
    await waitFor(() => screen.getByText('New York'));

    // Now select the State
    const stateSelect = screen.getByLabelText(/Select your state/i);
    fireEvent.change(stateSelect, { target: { value: 'NY' } });

    // Wait for cities to appear (useEffect trigger)
    await waitFor(() => {
      expect(screen.getByText('New York City')).toBeInTheDocument();
      expect(screen.getByText('Buffalo')).toBeInTheDocument();
    });

    // Verify library call
    expect(City.getCitiesOfState).toHaveBeenCalledWith('US', 'NY');
  });

  it('resets State and City when Country is changed', async () => {
    State.getStatesOfCountry.mockReturnValue(mockStatesUS);
    City.getCitiesOfState.mockReturnValue(mockCitiesNY);

    render(
      <MockInputProvider>
        <Address />
      </MockInputProvider>,
    );

    // Select US -> NY -> New York City
    fireEvent.change(screen.getByLabelText(/Select your country/i), {
      target: { value: 'US' },
    });
    await waitFor(() => screen.getByText('New York'));

    fireEvent.change(screen.getByLabelText(/Select your state/i), {
      target: { value: 'NY' },
    });
    await waitFor(() => screen.getByText('New York City'));

    const citySelect = screen.getByLabelText(/Select your city/i);
    fireEvent.change(citySelect, { target: { value: 'New York City' } });
    expect(citySelect).toHaveValue('New York City');

    // Change Country to 'India' (trigger reset)
    fireEvent.change(screen.getByLabelText(/Select your country/i), {
      target: { value: 'IN' },
    });

    // Verify resets happen
    await waitFor(() => {
      const stateSelect = screen.getByLabelText(/Select your state/i);
      expect(stateSelect).toHaveValue('Select your state');

      const citySelectRef = screen.getByLabelText(/Select your city/i);
      expect(citySelectRef).toHaveValue('Select your city');
    });
  });
});
