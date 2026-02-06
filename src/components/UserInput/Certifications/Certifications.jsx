import commonStyles from '../Styles/CommonInputStyles.module.css';
import styles from './Certifications.module.css';
import {
  ADD_CERTIFICATION_FIELD,
  UPDATE_CERTIFICATION_FIELD,
  REMOVE_CERTIFICATION_FIELD,
  REMOVE_ALL_CERTIFICATION_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';
import { useContext } from 'react';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';

const Certifications = () => {
  const [stateField, dispatchField] = useContext(InputFieldContext);

  const handleChange = (id, name, value) => {
    dispatchField({
      type: UPDATE_CERTIFICATION_FIELD,
      payload: {
        id: id,
        [name]: value,
      },
    });
  };

  const handleAddCertification = () => {
    dispatchField({
      type: ADD_CERTIFICATION_FIELD,
      payload: {
        certificationName: '',
        issuingOrganization: '',
        issueDate: '',
        expiryDate: '',
        credential: '',
      },
    });
  };

  const handleRemoveCertification = (id) => {
    dispatchField({
      type: REMOVE_CERTIFICATION_FIELD,
      payload: id,
    });
  };

  const handleRemoveAllCertifications = () => {
    dispatchField({ type: REMOVE_ALL_CERTIFICATION_FIELD });
  };

  return (
    <section className={commonStyles.componentSections}>
      <h2 className={`${styles.heading} ${commonStyles.componentHeading}`}>
        {stateField.certificationFields.length > 1
          ? 'Certifications'
          : 'Certification'}
      </h2>
      {stateField.certificationFields.map((field) => (
        <div key={field.id} className={commonStyles.renderBox}>
          <h3 className={commonStyles.itemNumberHeading}>
            Certification #{field.itemNumber}
          </h3>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`certificationName-${field.id}`}
            >
              Enter Certification Name:{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="text"
              placeholder="Certification Name"
              id={`certificationName-${field.id}`}
              name="certificationName"
              value={field.certificationName}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`issuingOrganization-${field.id}`}
            >
              Enter Issuing Organization:{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="text"
              placeholder="Issuing Organization"
              id={`issuingOrganization-${field.id}`}
              name="issuingOrganization"
              value={field.issuingOrganization}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`issueDate-${field.id}`}
            >
              Enter Issue Date:{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="date"
              id={`issueDate-${field.id}`}
              name="issueDate"
              value={field.issueDate}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`expiryDate-${field.id}`}
            >
              Enter Expiry Date:{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="date"
              id={`expiryDate-${field.id}`}
              name="expiryDate"
              value={field.expiryDate}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={commonStyles.checkboxBox}>
            <input
              className={`${commonStyles.inputField} ${commonStyles.checkboxField}`}
              type="checkbox"
              id={`noDates-${field.id}`}
              name="noDates"
              checked={field.noDates}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.checked)
              }
            />
            <label
              className={commonStyles.inputLabel}
              htmlFor={`noDates-${field.id}`}
            >
              No Dates.
            </label>
          </div>

          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`credential-${field.id}`}
            >
              Enter Credential ID or Link:{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="text"
              placeholder="Credential ID or Link"
              id={`credential-${field.id}`}
              name="credential"
              value={field.credential}
              onChange={(e) =>
                handleChange(field.id, e.target.name, e.target.value)
              }
            />
          </div>

          {stateField.certificationFields.length > 1 && (
            <div className={commonStyles.removeBtnBox}>
              <button
                className={commonStyles.removeFieldBtn}
                type="button"
                onClick={() => handleRemoveCertification(field.id)}
              >
                Remove Certification
              </button>
            </div>
          )}
        </div>
      ))}

      <div className={commonStyles.btnWrapper}>
        <button
          className={commonStyles.addFieldBtn}
          type="button"
          onClick={handleAddCertification}
        >
          Add Certification
        </button>

        {stateField.certificationFields.length > 2 && (
          <button
            className={commonStyles.removeAllFieldsBtn}
            type="button"
            onClick={handleRemoveAllCertifications}
          >
            Remove all Certification
          </button>
        )}
      </div>
    </section>
  );
};

export default Certifications;
