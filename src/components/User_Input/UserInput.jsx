import { useState } from 'react';
import Styles from './UserInput.module.css';
import ProfileSummary from './User_Profile_Summary/ProfileSummary';
import BasicInformation from './User_Information/BasicInformation';
import Websites from './User_Website/Websites';
import Address from './User_address/Address';
import WorkExperience from './User_Work_Experience/WorkExperience';
import Education from './User_Education/Education';
import Skills from './User_Skills/Skills';
import Projects from './User_Projects/Projects';
import Certifications from './User_Certifications/Certifications';
import AwardsAchievements from './User_Awards_Achievements/AwardsAchievements';
import Languages from './User_Languages/Languages';
import InterestsHobbies from './User_Interests_Hobbies/InterestsHobbies';
import classNames from 'classnames';
import CompletedInputMessage from './User_Completed_Input_Message/CompletedInputMessage';

const UserInput = ({
  basicInfoField,
  setBasicInfoField,
  addressField,
  setAddressField,
  websitesField,
  setWebsitesField,
  careerSummaryInput,
  setCareerSummaryInput,
  workExperiencesField,
  setWorkExperiencesField,
  educationField,
  setEducationField,
  skillField,
  setSkillField,
  projectField,
  setProjectField,
  certificationField,
  setCertificationField,
  awardsAchievementsField,
  setAwardsAchievementsField,
  languagesField,
  setLanguagesField,
  interestsHobbiesField,
  setInterestsHobbiesField,
  isHiddenInput,
  setIsHiddenInput,
  skipField,
  setSkipField,
}) => {
  const [componentsIndex, setComponentsIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const inputComponents = [
    <BasicInformation
      basicInfoField={basicInfoField}
      setBasicInfoField={setBasicInfoField}
    />,

    <Address addressField={addressField} setAddressField={setAddressField} />,

    <Websites
      websitesField={websitesField}
      setWebsitesField={setWebsitesField}
    />,

    <ProfileSummary
      careerSummaryInput={careerSummaryInput}
      setCareerSummaryInput={setCareerSummaryInput}
    />,

    <WorkExperience
      workExperiencesField={workExperiencesField}
      setWorkExperiencesField={setWorkExperiencesField}
    />,

    <Education
      educationField={educationField}
      setEducationField={setEducationField}
    />,

    <Skills skillField={skillField} setSkillField={setSkillField} />,
    <Projects projectField={projectField} setProjectField={setProjectField} />,
    <Certifications
      certificationField={certificationField}
      setCertificationField={setCertificationField}
    />,
    <AwardsAchievements
      awardsAchievementsField={awardsAchievementsField}
      setAwardsAchievementsField={setAwardsAchievementsField}
    />,
    <Languages
      languagesField={languagesField}
      setLanguagesField={setLanguagesField}
    />,
    <InterestsHobbies
      interestsHobbiesField={interestsHobbiesField}
      setInterestsHobbiesField={setInterestsHobbiesField}
    />,
    <CompletedInputMessage />
  ];

  const skippingKeys = {
    2: 'Websites',
    4: 'WorkExperience',
    5: 'Education',
    6: 'Skills',
    7: 'Projects',
    8: 'Certifications',
    9: 'AwardsAchievements',
    10: 'Languages',
    11: 'InterestsHobbies',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsHiddenInput(true);
  };

  const handleSkip = () => {
    const currentIndexKey = skippingKeys[componentsIndex];

    if (currentIndexKey) {
      setSkipField({ ...skipField, [currentIndexKey]: true });
    }

    setComponentsIndex(componentsIndex + 1);
    handleSubmit();
  };

  const hoveredClass =
    isHovered === true ? Styles.hovering_on_submitButton : '';

  if (isHiddenInput) return null;

  return (
    <section className={classNames(Styles.user_input, hoveredClass)}>
      <form onSubmit={handleSubmit}>
        {inputComponents[componentsIndex]}

        {componentsIndex === inputComponents.length - 1 && (
          <div className={Styles.submit_btn_wrapper}>
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={Styles.submit_btn}
              type='submit'
            >
              Submit
            </button>
          </div>
        )}
      </form>

      <div className={Styles.btn_wrapper}>
        {componentsIndex !== 0 && (
          <button
            className={Styles.prev_btn}
            onClick={() => setComponentsIndex(componentsIndex - 1)}
          >
            Previous
          </button>
        )}

        {componentsIndex > 0 &&
          componentsIndex < inputComponents.length - 1 &&
          ![0, 1, 3].includes(componentsIndex) && (
            <button className={Styles.skip_btn} onClick={handleSkip}>
              Skip
            </button>
          )}

        {componentsIndex !== inputComponents.length - 1 && (
          <button
            className={Styles.next_btn}
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
