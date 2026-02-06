import commonStyles from '../Styles/CommonInputStyles.module.css';
import { SET_PROFILE_SUMMARY_INPUT } from '../../../context/UserInputContext/reducer/resumeTypes';
import { useContext } from 'react';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';

const ProfileSummary = () => {
  const [stateField, dispatchField] = useContext(InputFieldContext);

  const handleChange = (e) => {
    dispatchField({
      type: SET_PROFILE_SUMMARY_INPUT,
      payload: e.target.value,
    });
  };

  return (
    <section className={commonStyles.componentSection}>
      <h2 className={commonStyles.componentHeading}>
        A short bio or career summary
      </h2>

      <div className={commonStyles.renderBox}>
        <label className={commonStyles.inputLabel} htmlFor="SummaryProfile">
          Enter A short bio or career summary highlighting key skills and
          experience between 30 words to 100 words:{' '}
        </label>
        <textarea
          className={commonStyles.inputTextarea}
          placeholder="Summary/Bio"
          minLength="150"
          maxLength="600"
          id="SummaryProfile"
          name="SummaryProfile"
          value={stateField.profileSummaryInput}
          onChange={handleChange}
        />
      </div>
    </section>
  );
};

export default ProfileSummary;
