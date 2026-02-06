import { Country, State, City } from 'country-state-city';
import { useEffect, useState } from 'react';
import commonStyles from '../Styles/CommonInputStyles.module.css';
import { SET_ADDRESS_INPUT } from '../../../context/UserInputContext/reducer/resumeTypes';
import { useContext } from 'react';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';

const Address = () => {
  const [stateField, dispatchField] = useContext(InputFieldContext);

  const countries = Country.getAllCountries();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const { address } = stateField.addressInput;
  const { zipCode } = stateField.addressInput;
  const { selectedCountryISO } = stateField.addressInput;
  const { selectedStateISO } = stateField.addressInput;
  const { selectedCity } = stateField.addressInput;

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'selectedCountryISO') {
      const countryCode = countries.find((cc) => cc.isoCode === value);

      dispatchField({
        type: SET_ADDRESS_INPUT,
        payload: {
          selectedCountryISO: value,
          selectedCountryName: countryCode ? countryCode.name : '',
        },
      });
    } else if (name === 'selectedStateISO') {
      const stateCode = states.find((s) => s.isoCode === value);
      dispatchField({
        type: SET_ADDRESS_INPUT,
        payload: {
          selectedStateISO: value,
          selectedStateName: stateCode ? stateCode.name : '',
        },
      });
    } else {
      dispatchField({
        type: SET_ADDRESS_INPUT,
        payload: {
          [name]: value,
        },
      });
    }
  };

  useEffect(() => {
    if (!selectedCountryISO) return;

    const countryStates = State.getStatesOfCountry(selectedCountryISO);
    setStates(countryStates);

    dispatchField({
      type: SET_ADDRESS_INPUT,
      payload: {
        selectedStateISO: 'Select your state',
        selectedStateName: '',
        selectedCity: '',
      },
    });
  }, [selectedCountryISO]);

  useEffect(() => {
    if (!selectedCountryISO || !selectedStateISO) return;

    const stateCities = City.getCitiesOfState(
      selectedCountryISO,
      selectedStateISO,
    );
    setCities(stateCities);

    dispatchField({
      type: SET_ADDRESS_INPUT,
      payload: {
        selectedCity: '',
      },
    });
  }, [selectedCountryISO, selectedStateISO]);

  return (
    <section className={commonStyles.componentSection}>
      <h2 className={commonStyles.componentHeading}>Address</h2>

      <div className={commonStyles.inputBox}>
        <label className={commonStyles.inputLabel} htmlFor="address">
          Enter your address:{' '}
        </label>
        <input
          className={commonStyles.inputField}
          type="text"
          placeholder="address"
          name="address"
          id="address"
          value={address}
          onChange={handleChange}
        />
      </div>

      <div className={commonStyles.inputBox}>
        <label className={commonStyles.inputLabel} htmlFor="zipCode">
          Enter your Zip/Pin Code:{' '}
        </label>
        <input
          className={commonStyles.inputField}
          type="text"
          placeholder="Zip/Pin Code"
          name="zipCode"
          id="zipCode"
          value={zipCode}
          onChange={handleChange}
        />
      </div>

      <div className={commonStyles.inputBox}>
        <label className={commonStyles.inputLabel} htmlFor="country">
          Select your country:{' '}
        </label>
        <select
          className={commonStyles.inputSelect}
          id="country"
          name="selectedCountryISO"
          value={selectedCountryISO}
          onChange={handleChange}
        >
          <option value="Select your country">Select your country</option>
          {countries.map((country) => (
            <option key={country.isoCode} value={country.isoCode}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className={commonStyles.inputBox}>
        <label className={commonStyles.inputLabel} htmlFor="state">
          Select your state:
        </label>
        <select
          className={commonStyles.inputSelect}
          id="state"
          name="selectedStateISO"
          value={selectedStateISO}
          onChange={handleChange}
        >
          <option value="Select your state">Select your state</option>
          {states.map((state) => (
            <option key={state.isoCode} value={state.isoCode}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div className={commonStyles.inputBox}>
        <label className={commonStyles.inputLabel} htmlFor="city">
          Select your city:
        </label>
        <select
          className={commonStyles.inputSelect}
          id="city"
          name="selectedCity"
          value={selectedCity}
          onChange={handleChange}
        >
          <option value="Select your city">Select your city</option>
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
