import commonStyles from '../Styles/CommonInputStyles.module.css';
import {
  ADD_LANGUAGE_FIELD,
  UPDATE_LANGUAGE_FIELD,
  REMOVE_LANGUAGE_FIELD,
  REMOVE_ALL_LANGUAGE_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';
import { useContext } from 'react';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';

const Languages = () => {
  const [stateField, dispatchField] = useContext(InputFieldContext);

  const handleChange = (id, name, value) => {
    dispatchField({
      type: UPDATE_LANGUAGE_FIELD,
      payload: {
        id,
        [name]: value,
      },
    });
  };

  const handleAddLanguage = () => {
    dispatchField({
      type: ADD_LANGUAGE_FIELD,
      payload: {
        language: '',
        proficiencyLevel: '',
      },
    });
  };

  const handleRemoveLanguage = (id) => {
    dispatchField({
      type: REMOVE_LANGUAGE_FIELD,
      payload: id,
    });
  };

  const handleRemoveAllLanguages = () => {
    dispatchField({ type: REMOVE_ALL_LANGUAGE_FIELD });
  };

  return (
    <section className={commonStyles.componentSection}>
      <h2 className={commonStyles.componentHeading}>
        {stateField.languageFields.length > 1 ? 'Languages' : 'Language'}
      </h2>

      {stateField.languageFields.map((field) => (
        <div key={field.id} className={commonStyles.renderBox}>
          <h3 className={commonStyles.itemNumberHeading}>
            Language #{field.itemNumber}
          </h3>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`language-${field.id}`}
            >
              Enter Language:{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="text"
              placeholder="Language"
              id={`language-${field.id}`}
              name="language"
              value={field.language}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`proficiencyLevel-${field.id}`}
            >
              Proficiency Level:{' '}
            </label>
            <select
              className={commonStyles.inputSelect}
              id={`proficiencyLevel-${field.id}`}
              name="proficiencyLevel"
              value={field.proficiencyLevel}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            >
              <option value="Proficiency Level">--Proficiency Level--</option>
              <optgroup>
                <option value="Basic">Basic</option>
                <option value="Conversational">Conversational</option>
                <option value="Fluent">Fluent</option>
                <option value="Proficient">Proficient</option>
                <option value="Native">Native</option>
              </optgroup>
            </select>
          </div>

          {stateField.languageFields.length > 1 && (
            <div className={commonStyles.removeBtnBox}>
              <button
                className={commonStyles.removeFieldBtn}
                type="button"
                onClick={() => handleRemoveLanguage(field.id)}
              >
                Remove Language
              </button>
            </div>
          )}
        </div>
      ))}

      <div className={commonStyles.btnWrapper}>
        <button
          className={commonStyles.addFieldBtn}
          type="button"
          onClick={handleAddLanguage}
        >
          Add Language
        </button>

        {stateField.languageFields.length > 2 && (
          <button
            className={commonStyles.removeAllFieldsBtn}
            type="button"
            onClick={handleRemoveAllLanguages}
          >
            Remove All Languages
          </button>
        )}
      </div>
    </section>
  );
};

export default Languages;
