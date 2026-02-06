import commonStyles from '../Styles/CommonInputStyles.module.css';
import {
  ADD_HOBBY_FIELD,
  UPDATE_HOBBY_FIELD,
  REMOVE_HOBBY_FIELD,
  REMOVE_ALL_HOBBY_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';
import { useContext } from 'react';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';

const Hobbies = () => {
  const [stateField, dispatchField] = useContext(InputFieldContext);

  const handleChange = (id, name, value) => {
    dispatchField({
      type: UPDATE_HOBBY_FIELD,
      payload: {
        id: id,
        [name]: value,
      },
    });
  };

  const handleAddHobby = () => {
    dispatchField({
      type: ADD_HOBBY_FIELD,
      payload: {
        hobby: '',
      },
    });
  };

  const handleRemoveHobby = (id) => {
    dispatchField({ type: REMOVE_HOBBY_FIELD, payload: id });
  };

  const handleRemoveAllHobbies = () => {
    dispatchField({ type: REMOVE_ALL_HOBBY_FIELD });
  };

  return (
    <section className={commonStyles.componentSection}>
      <h2 className={commonStyles.componentHeading}>
        {stateField.hobbyFields.length > 1 ? 'Hobbies' : 'Hobby'}
      </h2>
      {stateField.hobbyFields.map((field) => (
        <div key={field.id} className={commonStyles.renderBox}>
          <h3 className={commonStyles.itemNumberHeading}>
            Hobby #{field.itemNumber}
          </h3>
          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`hobby-${field.id}`}
            >
              Write your hobby:{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="text"
              placeholder="hobby"
              id={`hobby-${field.id}`}
              name="hobby"
              value={field.hobby}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>
          {stateField.hobbyFields.length > 1 && (
            <div className={commonStyles.removeBtnBox}>
              <button
                className={commonStyles.removeFieldBtn}
                type="button"
                onClick={() => handleRemoveHobby(field.id)}
              >
                Remove Hobby
              </button>
            </div>
          )}
        </div>
      ))}

      <div className={commonStyles.btnWrapper}>
        <button
          className={commonStyles.addFieldBtn}
          type="button"
          onClick={handleAddHobby}
        >
          Add Hobby
        </button>

        {stateField.hobbyFields.length > 2 && (
          <button
            className={commonStyles.removeAllFieldsBtn}
            type="button"
            onClick={handleRemoveAllHobbies}
          >
            Remove All Hobbies
          </button>
        )}
      </div>
    </section>
  );
};

export default Hobbies;
