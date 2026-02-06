import johnDoePic from '../../../assets/JohnDoeSampleDP.webp';

const resumeInitialState = {
  personalInfoInput: {
    profilePic: johnDoePic,
    fullName: 'JOHN DOE',
    profession: 'Web Developer',
    email: 'johndoe@example.com',
    phoneNumber: '+1 (555) 123-4567',
    isNotProfilePic: false,
  },

  websiteInput: {
    linkedIn: 'https://in.linkedin.com/',
    gitHub: 'https://github.com/',
    portfolio: 'https://www.behance.net/search/projects/',
  },

  moreLinkFields: [
    {
      id: crypto.randomUUID(),
      itemNumber: 1,
      link: 'https://dev.to/',
    },
  ],

  profileSummaryInput:
    'I am a dedicated full stack developer with strong expertise in building modern, scalable, and user-friendly web applications. My skills span across both frontend and backend technologies, enabling me to deliver complete end-to-end solutions. On the frontend, I excel in React, JavaScript (ES6+), and responsive UI design with Tailwind CSS. On the backend, I am proficient with Node.js and RESTful APIs, ensuring reliable server-side logic and smooth integrations. I follow clean code practices, SOLID principles, and efficient problem-solving techniques. Passionate about continuous learning, I enjoy contributing to impactful projects and creating solutions that add real value.',

  addressInput: {
    address: '123 Main Street',
    zipCode: '12345',
    selectedCountryISO: 'Select your country',
    selectedCountryName: 'United States',
    selectedStateISO: 'Select your state',
    selectedStateName: 'California',
    selectedCity: 'San Francisco',
  },

  workExperienceFields: [
    {
      id: crypto.randomUUID(),
      itemNumber: 1,
      jobTitle: 'Full Stack Web Developer',
      companyName: 'Microsoft',
      location: 'San Francisco',
      startDate: '2017-10-29',
      endDate: '2011-05-17',
      isCurrentlyWorking: false,
      achievements: 'Architected and developed...',
    },
  ],

  educationFields: [
    {
      id: crypto.randomUUID(),
      itemNumber: 1,
      degreeName: 'Master of Computer Applications (MCA)',
      universityCollege: 'University of Oxford',
      startDate: '2006-04-11',
      endDate: '2008-05-27',
      isCurrentlyStudying: false,
      coursework: 'Advanced Algorithms...',
      gpa: '4.0',
    },
  ],

  skillFields: [
    {
      id: crypto.randomUUID(),
      itemNumber: 1,
      skill: 'Next.js & React',
      skillLevel: 'Intermediate',
    },
  ],

  projectFields: [
    {
      id: crypto.randomUUID(),
      itemNumber: 1,
      projectName: 'E-Commerce Platform',
      description: 'Developed a full-stack e-commerce application...',
      technologiesUsed: 'React, Node.js, MongoDB, AWS.',
      projectLink: 'https://github.com/',
      liveDemoLink: 'https://ecommerce.artoftesting.com/',
    },
  ],

  certificationFields: [
    {
      id: crypto.randomUUID(),
      itemNumber: 1,
      certificationName: 'AWS Certified Solutions Architect',
      issuingOrganization: 'Amazon Web Services',
      issueDate: '2022-09-12',
      expiryDate: '2030-09-12',
      noDates: false,
      credential: 'AWS-CSA-12345',
    },
  ],

  awardFields: [
    {
      id: crypto.randomUUID(),
      itemNumber: 1,
      awardName: 'Outstanding Developer of the Year',
      year: '2023-06-15',
      details: 'Recognized for exceptional contributions...',
    },
  ],

  languageFields: [
    {
      id: crypto.randomUUID(),
      itemNumber: 1,
      language: 'English',
      proficiencyLevel: 'Native',
    },
  ],

  hobbyFields: [
    {
      id: crypto.randomUUID(),
      itemNumber: 1,
      hobby: 'Singing',
    },
  ],

  skipField: {
    websiteFields: false,
    workExperienceFields: false,
    educationFields: false,
    skillFields: false,
    projectFields: false,
    certificationFields: false,
    awardFields: false,
    languageFields: false,
    hobbyFields: false,
  },
};

export default resumeInitialState;
