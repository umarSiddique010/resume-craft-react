import { useContext } from 'react';
import commonStyles from '../Styles/CommonInputStyles.module.css';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import {
  ADD_AWARD_FIELD,
  UPDATE_AWARD_FIELD,
  REMOVE_AWARD_FIELD,
  REMOVE_ALL_AWARD_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';

const Awards = () => {
  const [stateField, dispatchField] = useContext(InputFieldContext);

  const handleChange = (id, name, value) => {
    dispatchField({
      type: UPDATE_AWARD_FIELD,
      payload: {
        id: id,
        [name]: value,
      },
    });
  };

  const handleAddAwards = () => {
    dispatchField({
      type: ADD_AWARD_FIELD,
      payload: { awardName: '', year: '', details: '' },
    });
  };

  const handleRemoveAwards = (id) => {
    dispatchField({ type: REMOVE_AWARD_FIELD, payload: id });
  };

  const HandleRemoveAllAwards = () => {
    dispatchField({ type: REMOVE_ALL_AWARD_FIELD });
  };

  return (
    <section className={commonStyles.componentSection}>
      <h2 className={commonStyles.componentHeading}>
        {stateField.awardFields.length > 1 ? 'Awards' : 'Award'}
      </h2>

      {stateField.awardFields.map((field) => (
        <div key={field.id} className={commonStyles.renderBox}>
          <h3 className={commonStyles.itemNumberHeading}>
            Award #{field.itemNumber}
          </h3>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`awardName-${field.id}`}
            >
              Enter Award Name:{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="text"
              placeholder="Award Name"
              name="awardName"
              id={`awardName-${field.id}`}
              value={field.awardName}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`year-${field.id}`}
            >
              Enter Year:{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="date"
              id={`year-${field.id}`}
              name="year"
              value={field.year}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`details-${field.id}`}
            >
              Write Details under 30 words:{' '}
            </label>
            <textarea
              className={commonStyles.inputTextarea}
              placeholder="Details"
              id={`details-${field.id}`}
              name="details"
              maxLength="130"
              value={field.details}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          {stateField.awardFields.length > 1 && (
            <div className={commonStyles.removeBtnBox}>
              <button
                className={commonStyles.removeFieldBtn}
                type="button"
                onClick={() => handleRemoveAwards(field.id)}
              >
                Remove Award
              </button>
            </div>
          )}
        </div>
      ))}

      <div className={commonStyles.btnWrapper}>
        <button
          className={commonStyles.addFieldBtn}
          type="button"
          onClick={handleAddAwards}
        >
          Add Award
        </button>

        {stateField.awardFields.length > 2 && (
          <button
            className={commonStyles.removeAllFieldsBtn}
            type="button"
            onClick={HandleRemoveAllAwards}
          >
            Remove all Awards
          </button>
        )}
      </div>
    </section>
  );
};

export default Awards;
