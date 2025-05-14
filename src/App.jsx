import { useState } from 'react';
import UserInput from './components/User_Input/UserInput';
import Display from './components/Display/Display';
import johnDoePic from './assets/TemplateOneJohnDoeDP.jpg';
import Styles from './App.module.css';

const App = () => {
  // State hook of BasicInformation.jsx from User_Information folder which is inside component folder

  const [basicInfoField, setBasicInfoField] = useState({
    profilePic: `${johnDoePic}`,
    fullName: 'JOHN DOE',
    profession: 'Web developer',
    email: 'johndoe@example.com',
    phoneNumber: '+1 (555) 123-4567',
  });

  // State hook of UserAddress.jsx from User_Address folder which is inside component folder

  const [addressField, setAddressField] = useState({
    address: '123 Main Street',
    selectedCountryISO: 'Select your country',
    selectedCountryName: 'United States',
    selectedStateISO: 'Select your state',
    selectedStateName: 'California',
    selectedCity: 'San Francisco',
  });

  // State hook of WebsiteInformation.jsx from User_Website folder which is inside component folder

  const [websitesField, setWebsitesField] = useState({
    linkedIn: 'https://in.linkedin.com/',
    gitHub: 'https://github.com/',
    portfolio: 'https://www.behance.net/search/projects/',
  });

  // State hook of ProfileSummary.jsx from User_Profile_Summary folder which is inside component folder

  const [careerSummaryInput, setCareerSummaryInput] = useState(
    'I am a dedicated full stack developer with extensive experience in building end-to-end web applications. My expertise spans front-end technologies like React, Angular, and Vue.js, complemented by strong back-end skills with Node.js, Python, and various database systems. I approach development with a user-first mindset, ensuring applications are not only functionally robust but also deliver exceptional user experiences. My collaborative approach, combined with a commitment to clean, maintainable code, enables me to efficiently translate business requirements into scalable technical solutions that drive measurable results.'
  );

  // State hook of WorkExperience.jsx from User_Work_Experience folder which is inside component folder

  const [workExperiencesField, setWorkExperiencesField] = useState([
    {
      id: Date.now(),
      experienceFieldNo: 1,
      jobTitle: 'Full Stack Web Developer',
      companyName: 'Microsoft',
      location: 'San Francisco',
      startDate: '2017-10-29',
      endDate: '2011-05-17',
      currentlyWork: false,
      achievements:
        'Architected and developed a complete e-commerce platform that increased client conversion rates by 32% within three months of launch. Implemented CI/CD pipelines that reduced deployment time by 65% and minimized production bugs. Optimized database queries resulting in 40% faster application response times. Led the migration of legacy systems to modern technology stacks, improving maintainability and reducing operational costs by 25%. Mentored junior developers, establishing coding standards and best practices that improved team productivity by 30%. Created comprehensive API documentation that streamlined onboarding processes and improved cross-team collaboration.',
    },
  ]);

  // State hook of Education.jsx from User_Education folder which is inside component folder

  const [educationField, setEducationField] = useState([
    {
      id: Date.now(),
      educationFieldNo: 1,
      degreeName: 'Master of Computer Applications (MCA)',
      universityCollege: 'University of Oxford',
      startDate: '2006-04-11',
      endDate: '2008-05-27',
      currentlyStudy: false,
      coursework:
        'Advanced Algorithms, Database Systems, Software Engineering, Web Development, Computer Networks, Cloud Computing',
      GPA: '4.0 GPA',
    },
  ]);

  // State hook of Skills.jsx from User_Skills folder which is inside component folder

  const [skillField, setSkillField] = useState([
    {
      id: Date.now(),
      techSkillInputNo: 1,
      skillValue: 'Next.js & React',
      skillLevel: 'Intermediate',
    },
  ]);

  // State hook of Projects.jsx from User_Projects folder which is inside component folder

  const [projectField, setProjectField] = useState([
    {
      id: Date.now(),
      projectFieldNo: 1,
      projectName: 'E-Commerce Platform',
      description:
        'Developed a full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment processing. Implemented responsive design, search functionality, and admin dashboard for inventory management. Optimized performance with lazy loading and efficient database queries.',
      technologiesUsed: 'React, Node.js, MongoDB, AWS.',
      gitHubLink: 'https://github.com/',
      liveDemoLink: 'https://ecommerce.artoftesting.com/',
    },
  ]);

  // State hook of Certifications.jsx from User_Certifications folder which is inside component folder

  const [certificationField, setCertificationField] = useState([
    {
      id: Date.now(),
      certificationFieldNo: 1,
      certificationName: 'AWS Certified Solutions Architect',
      issuingOrganization: 'Amazon Web Services',
      issueDate: '2022-09-12',
      expiryDate: '2025-09-12',
      credential: 'AWS-CSA-12345',
    },
  ]);

  // State hook of AwardsAchievements.jsx from User_Awards_Achievements folder which is inside component folder

  const [awardsAchievementsField, setAwardsAchievementsField] = useState([
    {
      id: Date.now(),
      awardsAchievementsFieldNo: 1,
      awardName: 'Outstanding Developer of the Year',
      year: '2023-06-15',
      details:
        'Recognized for exceptional contributions to project success, innovative problem-solving, and leadership in implementing cutting-edge technologies that significantly improved company performance metrics.',
    },
  ]);

  // State hook of Languages.jsx from User_Languages folder which is inside component folder

  const [languagesField, setLanguagesField] = useState([
    {
      id: Date.now(),
      languagesFieldNo: 1,
      languageName: 'English',
      proficiencyLevel: 'Native',
    },
  ]);

  // State hook of InterestsHobbies.jsx from User_Interests_Hobbies folder which is inside component folder

  const [interestsHobbiesField, setInterestsHobbiesField] = useState([
    {
      id: Date.now(),
      interestsHobbiesFieldNo: 1,
      interestsHobbies: 'Singing',
    },
  ]);

  // skipping a field if user don't want in his resume

  const [skipField, setSkipField] = useState({
    Websites: false,
    WorkExperience: false,
    Education: false,
    Skills: false,
    Projects: false,
    Certifications: false,
    AwardsAchievements: false,
    Languages: false,
    InterestsHobbies: false,
  });

  // state hook and inline style for mobile responsive and submit button

  const [isHiddenInput, setIsHiddenInput] = useState(false);

  const [isWelcomePage, setIsWelcomePage] = useState(true);

  const displayStyle =
    isHiddenInput === true
      ? {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }
      : null;

  return !isWelcomePage ? (
    <main style={displayStyle}>
      <UserInput
        basicInfoField={basicInfoField}
        setBasicInfoField={setBasicInfoField}
        addressField={addressField}
        setAddressField={setAddressField}
        websitesField={websitesField}
        setWebsitesField={setWebsitesField}
        careerSummaryInput={careerSummaryInput}
        setCareerSummaryInput={setCareerSummaryInput}
        workExperiencesField={workExperiencesField}
        setWorkExperiencesField={setWorkExperiencesField}
        educationField={educationField}
        setEducationField={setEducationField}
        skillField={skillField}
        setSkillField={setSkillField}
        projectField={projectField}
        setProjectField={setProjectField}
        certificationField={certificationField}
        setCertificationField={setCertificationField}
        awardsAchievementsField={awardsAchievementsField}
        setAwardsAchievementsField={setAwardsAchievementsField}
        languagesField={languagesField}
        setLanguagesField={setLanguagesField}
        interestsHobbiesField={interestsHobbiesField}
        setInterestsHobbiesField={setInterestsHobbiesField}
        isHiddenInput={isHiddenInput}
        setIsHiddenInput={setIsHiddenInput}
        skipField={skipField}
        setSkipField={setSkipField}
      />

      <Display
        basicInfoField={basicInfoField}
        addressField={addressField}
        websitesField={websitesField}
        careerSummaryInput={careerSummaryInput}
        workExperiencesField={workExperiencesField}
        educationField={educationField}
        skillField={skillField}
        projectField={projectField}
        certificationField={certificationField}
        awardsAchievementsField={awardsAchievementsField}
        languagesField={languagesField}
        interestsHobbiesField={interestsHobbiesField}
        isHiddenInput={isHiddenInput}
        setIsHiddenInput={setIsHiddenInput}
        skipField={skipField}
      />
    </main>
  ) : (
     <main className={Styles.main_welcome_page}>
      <div className={Styles.overlay}></div>
      <section className={Styles.content}>
        <h1 className={Styles.heading}>Craft Your Perfect CV</h1>
        <p className={Styles.subheading}>
          A simple yet powerful resume builder to help you showcase your skills,
          experience, and achievements—all in one place.
        </p>
        <div className={Styles.features}>
          <p>Two professionally designed templates</p>
          <p>With or without profile picture support</p>
          <p>Download high-quality PDF with active layout</p>
          <p>Customize fonts, structure & styling</p>
        </div>
        <button
        onClick={() => setIsWelcomePage(!isWelcomePage)}
        className={Styles.cta_btn}>
          Get started and build your standout CV today.
        </button>
      </section>
    </main>
  );
};

export default App;
