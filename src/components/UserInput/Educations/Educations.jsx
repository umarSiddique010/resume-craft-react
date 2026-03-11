import commonStyles from '../Styles/CommonInputStyles.module.css';
import styles from './Educations.module.css';
import {
  ADD_EDUCATION_FIELD,
  UPDATE_EDUCATION_FIELD,
  REMOVE_EDUCATION_FIELD,
  REMOVE_ALL_EDUCATION_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';
import { useContext } from 'react';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';

const Educations = () => {
  const [stateField, dispatchField] = useContext(InputFieldContext);

  const handleChange = (id, name, value) => {
    dispatchField({
      type: UPDATE_EDUCATION_FIELD,
      payload: {
        id: id,
        [name]: value,
      },
    });
  };

  const handleAddEducation = () => {
    dispatchField({
      type: ADD_EDUCATION_FIELD,
      payload: {
        degreeName: '',
        universityCollege: '',
        startDate: '',
        endDate: '',
        isCurrentlyStudying: false,
        coursework: '',
        gpa: '',
      },
    });
  };

  const handleRemoveEducation = (id) => {
    dispatchField({
      type: REMOVE_EDUCATION_FIELD,
      payload: id,
    });
  };

  const handleRemoveAllEducations = () => {
    dispatchField({ type: REMOVE_ALL_EDUCATION_FIELD });
  };

  return (
    <section className={commonStyles.componentSection}>
      <h2 className={commonStyles.componentHeading}>
        {stateField.educationFields.length > 1 ? 'Educations' : 'Education'}
      </h2>
      {stateField.educationFields.map((field) => (
        <div key={field.id} className={commonStyles.renderBox}>
          <h3 className={commonStyles.itemNumberHeading}>
            Education #{field.itemNumber}
          </h3>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`degreeName-${field.id}`}
            >
              Enter Degree Name{' '}
              <i className={commonStyles.inputLabel}>
                (e.g., “BSc in Computer Science”)
              </i>{' '}
              :
            </label>
            <input
              className={commonStyles.inputField}
              type="text"
              placeholder="Degree Name"
              id={`degreeName-${field.id}`}
              name="degreeName"
              value={field.degreeName}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`universityCollege-${field.id}`}
            >
              Enter University/College Name:{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="text"
              placeholder="University/College Name"
              id={`universityCollege-${field.id}`}
              name="universityCollege"
              value={field.universityCollege}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={styles.dateWrapper}>
            <div className={commonStyles.inputBox}>
              <label
                htmlFor={`startDate-${field.id}`}
                className={commonStyles.inputLabel}
              >
                Enter Start Date:{' '}
              </label>
              <input
                className={commonStyles.inputField}
                type="date"
                id={`startDate-${field.id}`}
                name="startDate"
                value={field.startDate}
                onChange={(e) =>
                  handleChange(field.id, e.target.name, e.target.value)
                }
              />
            </div>

            {field.isCurrentlyStudying !== true && (
              <div className={commonStyles.inputBox}>
                <label
                  className={commonStyles.inputLabel}
                  htmlFor={`endDate-${field.id}`}
                >
                  Enter End Date:{' '}
                </label>
                <input
                  className={commonStyles.inputField}
                  type="date"
                  id={`endDate-${field.id}`}
                  name="endDate"
                  value={field.endDate}
                  onChange={(e) =>
                    handleChange(field.id, e.target.name, e.target.value)
                  }
                />
              </div>
            )}

            <div className={commonStyles.checkboxBox}>
              <input
                className={`${commonStyles.inputField} ${commonStyles.checkboxField}`}
                type="checkbox"
                id={`isCurrentlyStudying-${field.id}`}
                name="isCurrentlyStudying"
                checked={field.isCurrentlyStudying}
                onChange={(e) =>
                  handleChange(field.id, e.target.name, e.target.checked)
                }
              />
              <label
                className={commonStyles.inputLabel}
                htmlFor={`isCurrentlyStudying-${field.id}`}
              >
                Currently studying here.
              </label>
            </div>
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`coursework-${field.id}`}
            >
              Enter Relevant Coursework (optional):{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="text"
              placeholder="Relevant Coursework"
              id={`coursework-${field.id}`}
              name="coursework"
              value={field.coursework}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.inputBox}>
            <label
              htmlFor={`gpa-${field.id}`}
              className={commonStyles.inputLabel}
            >
              Enter GPA (if applicable):{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="text"
              placeholder="GPA"
              id={`gpa-${field.id}`}
              name="gpa"
              value={field.gpa}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          {stateField.educationFields.length > 1 && (
            <div className={commonStyles.removeBtnBox}>
              <button
                className={commonStyles.removeFieldBtn}
                type="button"
                onClick={() => handleRemoveEducation(field.id)}
              >
                Remove Education
              </button>
            </div>
          )}
        </div>
      ))}

      <div className={commonStyles.btnWrapper}>
        <button
          className={commonStyles.addFieldBtn}
          type="button"
          onClick={handleAddEducation}
        >
          Add Education
        </button>

        {stateField.educationFields.length > 2 && (
          <button
            className={commonStyles.removeAllFieldsBtn}
            type="button"
            onClick={handleRemoveAllEducations}
          >
            Remove all educations
          </button>
        )}
      </div>
    </section>
  );
};

export default Educations;
