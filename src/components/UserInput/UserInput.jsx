import { useState } from 'react';
import styles from './UserInput.module.css';
import { SET_SKIP_FIELD } from '../../context/UserInputContext/reducer/resumeTypes';
import { InputFieldContext } from '../../context/UserInputContext/InputFieldContext';
import CompletedInputMessage from './InputFieldCompletedMessage/InputFieldCompletedMessage';
import PersonalInformation from './PersonalInformation/PersonalInformation';
import Address from './Address/Address';
import Websites from './Websites/Websites';
import ProfileSummary from './ProfileSummary/ProfileSummary';
import WorkExperiences from './WorkExperiences/WorkExperiences';
import Educations from './Educations/Educations';
import Skills from './Skills/Skills';
import Projects from './Projects/Projects';
import Certifications from './Certifications/Certifications';
import Awards from './Awards/Awards';
import Languages from './Languages/Languages';
import Hobbies from './Hobbies/Hobbies';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserInput = () => {
  const [stateField, dispatchField] = useContext(InputFieldContext);
  const Navigate = useNavigate();
  const [componentsIndex, setComponentsIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const inputComponents = [
    <PersonalInformation />,
    <Address />,
    <Websites />,
    <ProfileSummary />,
    <WorkExperiences />,
    <Educations />,
    <Skills />,
    <Projects />,
    <Certifications />,
    <Awards />,
    <Languages />,
    <Hobbies />,
    <CompletedInputMessage />,
  ];

  const skippingKeys = {
    2: 'websiteFields',
    4: 'workExperienceFields',
    5: 'educationFields',
    6: 'skillFields',
    7: 'projectFields',
    8: 'certificationFields',
    9: 'awardFields',
    10: 'languageFields',
    11: 'hobbyFields',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Navigate('/resume');
    toast.success('Resume crafted. Ready to share or download.');
  };

  const handleOnkeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (componentsIndex !== inputComponents.length - 1) {
        setComponentsIndex(componentsIndex + 1);
      } else {
        handleSubmit(e);
      }
    }
  };

  const handleSkip = () => {
    const currentIndexKey = skippingKeys[componentsIndex];

    dispatchField({
      type: SET_SKIP_FIELD,
      payload: { [currentIndexKey]: true },
    });

    setComponentsIndex(componentsIndex + 1);
  };

  const handlePrev = () => {
    const newIndex = componentsIndex - 1;
    const sectionToRemoveSkip = skippingKeys[newIndex];

    if (sectionToRemoveSkip) {
      dispatchField({
        type: SET_SKIP_FIELD,
        payload: { [sectionToRemoveSkip]: false },
      });
    }

    setComponentsIndex(newIndex);
  };

  const hoveredClass = isHovered === true ? styles.hoveringOnSubmitButton : '';

  return (
    <section className={`${styles.userInput} ${hoveredClass}`}>
      <form onSubmit={handleSubmit} onKeyDown={handleOnkeyDown}>
        {inputComponents[componentsIndex]}

        {componentsIndex === inputComponents.length - 1 && (
          <div className={styles.submitBtnWrapper}>
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={styles.submitBtn}
              type="submit"
            >
              Submit
            </button>
          </div>
        )}
      </form>

      <h3 className={styles.pagesNumberInfo}>
        {`${componentsIndex + 1}/${inputComponents.length}`}
      </h3>

      <div className={styles.btnWrapper}>
        {componentsIndex !== 0 && (
          <button className={styles.prevBtn} onClick={handlePrev}>
            Previous
          </button>
        )}

        {componentsIndex > 0 &&
          componentsIndex < inputComponents.length - 1 &&
          ![0, 1, 3].includes(componentsIndex) && (
            <button className={styles.skipBtn} onClick={handleSkip}>
              Skip
            </button>
          )}

        {componentsIndex !== inputComponents.length - 1 && (
          <button
            className={styles.nextBtn}
            onClick={() => setComponentsIndex(componentsIndex + 1)}
          >
            Next
          </button>
        )}
      </div>
    </section>
  );
};

export default UserInput;
