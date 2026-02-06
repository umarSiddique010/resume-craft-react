import commonStyles from '../Styles/CommonInputStyles.module.css';
import {
  ADD_PROJECT_FIELD,
  UPDATE_PROJECT_FIELD,
  REMOVE_PROJECT_FIELD,
  REMOVE_ALL_PROJECT_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';
import { useContext } from 'react';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';

const Projects = () => {
  const [stateField, dispatchField] = useContext(InputFieldContext);

  const handleChange = (id, name, value) => {
    dispatchField({
      type: UPDATE_PROJECT_FIELD,
      payload: {
        id,
        [name]: value,
      },
    });
  };

  const handleAddProject = () => {
    dispatchField({
      type: ADD_PROJECT_FIELD,
      payload: {
        projectName: '',
        description: '',
        technologiesUsed: '',
        projectLink: '',
        liveDemoLink: '',
      },
    });
  };

  const handleRemoveProject = (id) => {
    dispatchField({
      type: REMOVE_PROJECT_FIELD,
      payload: id,
    });
  };

  const handleRemoveAllProjects = () => {
    dispatchField({ type: REMOVE_ALL_PROJECT_FIELD });
  };

  return (
    <section className={commonStyles.componentSection}>
      <h2 className={commonStyles.componentHeading}>
        {stateField.projectFields.length > 1 ? 'Projects' : 'Project'}{' '}
      </h2>
      {stateField.projectFields.map((field) => (
        <div key={field.id} className={commonStyles.renderBox}>
          <h3 className={commonStyles.itemNumberHeading}>
            Project #{field.itemNumber}
          </h3>
          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`projectName-${field.id}`}
            >
              Enter Project Name:{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="text"
              placeholder="Project Name"
              id={`projectName-${field.id}`}
              name="projectName"
              value={field.projectName}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`description-${field.id}`}
            >
              Write a Description under 100 words:{' '}
            </label>
            <textarea
              className={commonStyles.inputTextarea}
              placeholder="Description"
              id={`description-${field.id}`}
              name="description"
              maxLength="600"
              value={field.description}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`technologiesUsed-${field.id}`}
            >
              Enter Technologies Used:{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="text"
              placeholder="Technologies"
              id={`technologiesUsed-${field.id}`}
              name="technologiesUsed"
              value={field.technologiesUsed}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`projectLink-${field.id}`}
            >
              Enter Portfolio Link (if applicable):{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="url"
              placeholder="Portfolio Link"
              id={`projectLink-${field.id}`}
              name="projectLink"
              value={field.projectLink}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`liveDemoLink-${field.id}`}
            >
              Enter Live Demo Link:{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="url"
              placeholder="Live Demo Link"
              id={`liveDemoLink-${field.id}`}
              name="liveDemoLink"
              value={field.liveDemoLink}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          {stateField.projectFields.length > 1 && (
            <div className={commonStyles.removeBtnBox}>
              <button
                className={commonStyles.removeFieldBtn}
                type="button"
                onClick={() => handleRemoveProject(field.id)}
              >
                Remove Project
              </button>
            </div>
          )}
        </div>
      ))}

      <div className={commonStyles.btnWrapper}>
        <button
          className={commonStyles.addFieldBtn}
          type="button"
          onClick={handleAddProject}
        >
          Add Project
        </button>

        {stateField.projectFields.length > 2 && (
          <button
            className={commonStyles.removeAllFieldsBtn}
            type="button"
            onClick={handleRemoveAllProjects}
          >
            Remove all Projects
          </button>
        )}
      </div>
    </section>
  );
};

export default Projects;
