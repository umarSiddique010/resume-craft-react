import { Country, State, City } from 'country-state-city';
import { useEffect, useState } from 'react';
import '../Styles/ComponentsSimilarStyles.css';

const Address = ({ addressField, setAddressField }) => {
  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const address = addressField.address;
  const { selectedCountryISO } = addressField;
  const { selectedStateISO } = addressField;
  const { selectedCity } = addressField;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'selectedCountryISO') {
      const countryCode = countries.find((cc) => cc.isoCode === value);

      setAddressField((af) => ({
        ...af,
        selectedCountryISO: value,
        selectedCountryName: countryCode ? countryCode.name : '',
      }));
    } else if (name === 'selectedStateISO') {
      const stateCode = states.find((s) => s.isoCode === value);

      setAddressField((af) => ({
        ...af,
        selectedStateISO: value,
        selectedStateName: stateCode ? stateCode.name : '',
      }));
    } else {
      setAddressField((af) => ({ ...af, [name]: value }));
    }
  };

  useEffect(() => {
    if (!selectedCountryISO) return;

    const countryStates = State.getStatesOfCountry(selectedCountryISO);
    setStates(countryStates);

    setAddressField((af) => ({
      ...af,
      selectedStateISO: 'Select your state',
      selectedStateName: '',
      selectedCity: '',
    }));
  }, [selectedCountryISO]);

  useEffect(() => {
    if (!selectedCountryISO || !selectedStateISO) return;

    const stateCities = City.getCitiesOfState(
      selectedCountryISO,
      selectedStateISO
    );
    setCities(stateCities);

    setAddressField((af) => ({
      ...af,
      selectedCity: '',
    }));
  }, [selectedCountryISO, selectedStateISO]);

  return (
    <section className='component-section'>
      <h2>Address</h2>

      <div className='input-box'>
        <label htmlFor="address">Enter your address: </label>
        <input
          type='text'
          placeholder='address'
          name='address'
          id='address'
          value={address}
          onChange={handleChange}
        />
      </div>

      <div className='input-box'>
        <label htmlFor="country">Select your country: </label>
        <select
          id='country'
          name='selectedCountryISO'
          value={selectedCountryISO}
          onChange={handleChange}
        >
          <option value='Select your country'>Select your country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className='input-box'>
        <label htmlFor="state">Select your state: </label>
        <select
          id='state'
          name='selectedStateISO'
          value={selectedStateISO}
          onChange={handleChange}
        >
          <option value='Select your state'>Select your state</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div className='input-box'>
        <label htmlFor="city">Select your city: </label>
        <select
          id='city'
          name='selectedCity'
          value={selectedCity}
          onChange={handleChange}
        >
          <option value='Select your city'>Select your city</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default Address;
