import commonStyles from '../Styles/CommonInputStyles.module.css';
import {
  ADD_WORK_EXPERIENCE_FIELD,
  UPDATE_WORK_EXPERIENCE_FIELD,
  REMOVE_WORK_EXPERIENCE_FIELD,
  REMOVE_ALL_WORK_EXPERIENCE_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';
import { useContext } from 'react';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';

const WorkExperiences = () => {
  const [stateField, dispatchField] = useContext(InputFieldContext);

  const handleChange = (id, name, value) => {
    dispatchField({
      type: UPDATE_WORK_EXPERIENCE_FIELD,
      payload: {
        id,
        [name]: value,
      },
    });
  };

  const handleAddWorkExperience = () => {
    dispatchField({
      type: ADD_WORK_EXPERIENCE_FIELD,
      payload: {
        jobTitle: '',
        companyName: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrentlyWorking: false,
        achievements: '',
      },
    });
  };

  const handleRemoveWorkExperience = (id) => {
    dispatchField({ type: REMOVE_WORK_EXPERIENCE_FIELD, payload: id });
  };

  const handleRemoveAllWorkExperiences = () => {
    dispatchField({ type: REMOVE_ALL_WORK_EXPERIENCE_FIELD });
  };

  return (
    <section className={commonStyles.componentSection}>
      <h2 className={commonStyles.componentHeading}>
        {stateField.workExperienceFields.length > 1
          ? 'Work Experiences'
          : 'Work Experience'}
      </h2>

      {stateField.workExperienceFields.map((field) => (
        <div key={field.id} className={commonStyles.renderBox}>
          <h3 className={commonStyles.itemNumberHeading}>
            Experience #{field.itemNumber}
          </h3>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`jobTitle-${field.id}`}
            >
              Enter Job Title:{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="text"
              placeholder="Job Title"
              id={`jobTitle-${field.id}`}
              name="jobTitle"
              value={field.jobTitle}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`jobType-${field.id}`}
            >
              Enter Job Type{' '}
              <i className={commonStyles.inputLabel}>
                (e.g. Full-time, Part-time, Contract, Internship)
              </i>{' '}
              :
            </label>
            <input
              className={commonStyles.inputField}
              type="text"
              placeholder="Job Type"
              id={`jobType-${field.id}`}
              name="jobType"
              value={field.jobType}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`companyName-${field.id}`}
            >
              Enter Company Name:{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="text"
              placeholder="Company Name"
              id={`companyName-${field.id}`}
              name="companyName"
              value={field.companyName}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`location-${field.id}`}
            >
              Enter Location:
            </label>
            <input
              className={commonStyles.inputField}
              type="text"
              placeholder="Location (City, Country)"
              id={`location-${field.id}`}
              name="location"
              value={field.location}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`startDate-${field.id}`}
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
          {field.isCurrentlyWorking !== true && (
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
              id={`isCurrentlyWorking-${field.id}`}
              name="isCurrentlyWorking"
              checked={field.isCurrentlyWorking}
              onChange={(e) =>
                handleChange(field.id, 'isCurrentlyWorking', e.target.checked)
              }
            />
            <label
              className={commonStyles.inputLabel}
              htmlFor={`isCurrentlyWorking-${field.id}`}
            >
              Currently working here.
            </label>
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`achievements-${field.id}`}
            >
              Enter Responsibilities & Achievements (Bullet points or
              description) <br /> under 100 words:{' '}
            </label>
            <textarea
              className={commonStyles.inputTextarea}
              placeholder="Responsibilities & Achievements"
              maxLength="600"
              id={`achievements-${field.id}`}
              name="achievements"
              value={field.achievements}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          {stateField.workExperienceFields.length > 1 && (
            <div className={commonStyles.removeBtnBox}>
              {' '}
              <button
                className={commonStyles.removeFieldBtn}
                type="button"
                onClick={() => handleRemoveWorkExperience(field.id)}
              >
                Remove Experience
              </button>
            </div>
          )}
        </div>
      ))}

      <div className={commonStyles.btnWrapper}>
        <button
          className={commonStyles.addFieldBtn}
          type="button"
          onClick={handleAddWorkExperience}
        >
          Add Experience
        </button>

        {stateField.workExperienceFields.length > 2 && (
          <button
            className={commonStyles.removeAllFieldsBtn}
            type="button"
            onClick={handleRemoveAllWorkExperiences}
          >
            Remove all Experiences
          </button>
        )}
      </div>
    </section>
  );
};

export default WorkExperiences;
