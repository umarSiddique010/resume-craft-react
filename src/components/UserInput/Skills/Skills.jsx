import commonStyles from '../Styles/CommonInputStyles.module.css';
import {
  ADD_SKILL_FIELD,
  UPDATE_SKILL_FIELD,
  REMOVE_SKILL_FIELD,
  REMOVE_ALL_SKILL_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';
import { useContext } from 'react';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';

const Skills = () => {
  const [stateField, dispatchField] = useContext(InputFieldContext);

  const handleSkillChange = (id, name, value) => {
    dispatchField({
      type: UPDATE_SKILL_FIELD,
      payload: {
        id,
        [name]: value,
      },
    });
  };

  const handleAddSkill = () => {
    dispatchField({
      type: ADD_SKILL_FIELD,
      payload: {
        skill: '',
        skillLevel: '',
      },
    });
  };

  const handleRemoveSkill = (id) => {
    dispatchField({ type: REMOVE_SKILL_FIELD, payload: id });
  };

  const handleRemoveAllSkill = () => {
    dispatchField({ type: REMOVE_ALL_SKILL_FIELD });
  };

  return (
    <section className={commonStyles.componentSection}>
      <h2 className={commonStyles.componentHeading}>
        {stateField.skillFields.length > 1 ? 'Skills' : 'Skill'}
      </h2>
      {stateField.skillFields.map((field) => (
        <div key={field.id} className={commonStyles.renderBox}>
          <h3 className={commonStyles.itemNumberHeading}>
            Skills #{field.itemNumber}
          </h3>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`skill-${field.id}`}
            >
              Enter Skills <i>(e.g., JavaScript, React, Problem solving)</i>:
            </label>

            <input
              className={commonStyles.inputField}
              type="text"
              placeholder="Skill"
              id={`skill-${field.id}`}
              name="skill"
              value={field.skill}
              onChange={(e) =>
                handleSkillChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`skillLevel-${field.id}`}
            >
              Select Your Level:{' '}
            </label>
            <select
              className={commonStyles.inputSelect}
              id={`skillLevel-${field.id}`}
              name="skillLevel"
              value={field.skillLevel}
              onChange={(e) =>
                handleSkillChange(field.id, e.target.name, e.target.value)
              }
            >
              <option value="Select Your Level">--Select Your Level---</option>
              <optgroup>
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </optgroup>
            </select>
          </div>

          {stateField.skillFields.length > 1 && (
            <div className={commonStyles.removeBtnBox}>
              <button
                className={commonStyles.removeFieldBtn}
                type="button"
                onClick={() => handleRemoveSkill(field.id)}
              >
                Remove Skill
              </button>
            </div>
          )}
        </div>
      ))}

      <div className={commonStyles.btnWrapper}>
        <button
          className={commonStyles.addFieldBtn}
          type="button"
          onClick={handleAddSkill}
        >
          Add Skill
        </button>

        {stateField.skillFields.length > 2 && (
          <button
            className={commonStyles.removeAllFieldsBtn}
            type="button"
            onClick={handleRemoveAllSkill}
          >
            Remove all Skills
          </button>
        )}
      </div>
    </section>
  );
};

export default Skills;
