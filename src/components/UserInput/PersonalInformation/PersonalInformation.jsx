import { useRef } from 'react';
import commonStyles from '../Styles/CommonInputStyles.module.css';
import styles from './PersonalInformation.module.css';
import { SET_PERSONAL_INFO_INPUT } from '../../../context/UserInputContext/reducer/resumeTypes';
import { useContext } from 'react';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import { AiOutlineUpload } from 'react-icons/ai';

const PersonalInformation = () => {
  const [stateField, dispatchField] = useContext(InputFieldContext);
  const fileInputRef = useRef(null);

  const { fullName, profession, email, phoneNumber, isNotProfilePic } =
    stateField.personalInfoInput;

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value, files, checked } = e.target;

    if (name === 'profilePic') {
      const file = files[0];
      const imageURL = URL.createObjectURL(file);
      dispatchField({
        type: SET_PERSONAL_INFO_INPUT,
        payload: {
          profilePic: imageURL,
        },
      });
    } else if (name === 'isNotProfilePic') {
      dispatchField({
        type: SET_PERSONAL_INFO_INPUT,
        payload: {
          isNotProfilePic: checked,
        },
      });
    } else {
      dispatchField({
        type: SET_PERSONAL_INFO_INPUT,
        payload: {
          [name]: value,
        },
      });
    }
  };

  return (
    <section className={commonStyles.componentSection}>
      <h2 className={commonStyles.componentHeading}>Personal Information</h2>

      {!isNotProfilePic && (
        <div className={commonStyles.renderBox}>
          <button
            type="button"
            onClick={handleDivClick}
            className={styles.profilePicBtn}
          >
            <div className={styles.fileWrapper}>
              <input
                className={commonStyles.inputField}
                type="file"
                id="profilePic"
                name="profilePic"
                ref={fileInputRef}
                onChange={handleChange}
              />
              <AiOutlineUpload className={styles.uploadIcon} />
            </div>

            <label className={commonStyles.inputLabel} htmlFor="profilePic">
              Select a Profile Picture
            </label>
          </button>
        </div>
      )}

      <div className={commonStyles.inputBox}>
        <label className={commonStyles.inputLabel} htmlFor="fullName">
          Enter full name:{' '}
        </label>
        <input
          className={commonStyles.inputField}
          type="text"
          placeholder="Full Name"
          id="fullName"
          name="fullName"
          autoComplete="name"
          value={fullName}
          onChange={handleChange}
        />
      </div>

      <div className={commonStyles.inputBox}>
        <label className={commonStyles.inputLabel} htmlFor="profession">
          Enter your Profession:{' '}
        </label>
        <input
          className={commonStyles.inputField}
          type="text"
          placeholder="Profession"
          id="profession"
          name="profession"
          value={profession}
          onChange={handleChange}
        />
      </div>

      <div className={commonStyles.inputBox}>
        <label className={commonStyles.inputLabel} htmlFor="email">
          Enter your Email:{' '}
        </label>
        <input
          className={commonStyles.inputField}
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className={commonStyles.inputBox}>
        <label className={commonStyles.inputLabel} htmlFor="phoneNumber">
          Enter your phone number:{' '}
        </label>
        <input
          className={commonStyles.inputField}
          type="tel"
          placeholder="Phone number"
          id="phoneNumber"
          name="phoneNumber"
          autoComplete="tel"
          value={phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className={commonStyles.checkboxBox}>
        <input
          className={`${commonStyles.inputField} ${commonStyles.checkboxField}`}
          type="checkbox"
          id="isNotProfilePic"
          name="isNotProfilePic"
          checked={isNotProfilePic}
          onChange={handleChange}
        />
        <label className={commonStyles.inputLabel} htmlFor="isNotProfilePic">
          I don't want to add Profile Picture.
        </label>
      </div>
    </section>
  );
};

export default PersonalInformation;
