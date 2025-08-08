import { useRef } from 'react';
import '../Styles/ComponentsSimilarStyles.css';
import Styles from './BasicInformation.module.css';

const BasicInformation = ({ basicInfoField, setBasicInfoField }) => {
  const { fullName, profession, email, phoneNumber } = basicInfoField;
  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'profilePic') {
      const file = files[0];
      const imageURL = URL.createObjectURL(file);
      setBasicInfoField((bif) => ({ ...bif, profilePic: imageURL }));
    } else {
      setBasicInfoField((bif) => ({ ...bif, [name]: value }));
    }
  };

  return (
    <section className="component-section">
      <h2>Personal Information</h2>

      <div className="input-box">
        <button
          type="button"
          onClick={handleDivClick}
          className={Styles.profilePic_btn}
        >
          <div className={Styles.file_wrapper}>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              ref={fileInputRef}
              onChange={handleChange}
            />
          </div>

          <label htmlFor="profilePic">Select a Profile Picture</label>
        </button>
      </div>

      <div className="input-box">
        <label htmlFor="fullName">Enter full name: </label>
        <input
          type="text"
          placeholder="Full Name"
          id="fullName"
          name="fullName"
          autoComplete="name"
          value={fullName}
          onChange={handleChange}
        />
      </div>

      <div className="input-box">
        <label htmlFor="profession">Enter your Profession: </label>
        <input
          type="text"
          placeholder="Profession"
          id="profession"
          name="profession"
          value={profession}
          onChange={handleChange}
        />
      </div>

      <div className="input-box">
        <label htmlFor="email">Enter your Email: </label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="input-box">
        <label htmlFor="phoneNumber">Enter your phone number: </label>
        <input
          type="tel"
          placeholder="Phone number"
          id="phoneNumber"
          name="phoneNumber"
          autoComplete="tel"
          value={phoneNumber}
          onChange={handleChange}
        />
      </div>
    </section>
  );
};

export default BasicInformation;
