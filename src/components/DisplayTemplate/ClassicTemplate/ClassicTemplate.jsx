import { useContext } from 'react';
import templateFont from '../TemplateFonts.module.css';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';
import styles from './ClassicTemplate.module.css';
import { Link } from 'react-router-dom';
import { FaAddressCard, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
const ClassicTemplate = ({ fontStyle }) => {
  const [stateField, dispatchField] = useContext(InputFieldContext);

  const personalInfo = stateField.personalInfoInput;
  const addressInfo = stateField.addressInput;
  const links = [
    stateField.websiteInput.linkedIn,
    stateField.websiteInput.gitHub,
    stateField.websiteInput.portfolio,
  ];

  return (
    <section className={`${styles.templateSection} ${templateFont[fontStyle]}`}>
      <section className={styles.header}>
        <div className={styles.name_Profession}>
          <h1>{personalInfo.fullName}</h1>
          <h2>{personalInfo.profession}</h2>
        </div>
        <div className={styles.contactInfo}>
          {personalInfo.email && (
            <h3>
              <MdEmail size={14} className={styles.contactIcon} />
              <span>{personalInfo.email}</span>
            </h3>
          )}
          {personalInfo.phoneNumber && (
            <>
              {personalInfo.email && (
                <span className={styles.separator}>|</span>
              )}
              <h3>
                <FaPhoneAlt size={13} className={styles.contactIcon} />
                <span>{personalInfo.phoneNumber}</span>
              </h3>
            </>
          )}
          {(addressInfo.address ||
            addressInfo.selectedCity ||
            addressInfo.selectedStateName ||
            addressInfo.zipCode ||
            addressInfo.selectedCountryName) && (
            <>
              {(personalInfo.email || personalInfo.phoneNumber) && (
                <span className={styles.separator}>|</span>
              )}
              <h3>
                <FaAddressCard size={13.5} className={styles.contactIcon} />
                <span>
                  {[
                    addressInfo.address,
                    addressInfo.selectedCity,
                    addressInfo.selectedStateName,
                    addressInfo.zipCode,
                    addressInfo.selectedCountryName,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </span>
              </h3>
            </>
          )}
        </div>
      </section>
      <section className={styles.body}>
        {/* professional summary */}
        <div className={styles.summaryContainer}>
          <h2>PROFESSIONAL SUMMARY</h2>
          <hr className={styles.hrBreaker} />
          <p>{stateField.profileSummaryInput}</p>
        </div>
        {/* work experience */}
        {!stateField.skipField.workExperienceFields && (
          <div className={styles.workExperienceContainer}>
            <h2>
              {stateField.workExperienceFields.length > 1
                ? 'WORK EXPERIENCES'
                : 'WORK EXPERIENCE'}
            </h2>
            <hr className={styles.hrBreaker} />
            <ul>
              {stateField.workExperienceFields.map((field) => (
                <li key={field.id} className={styles.workExperienceItems}>
                  {(field.jobTitle || field.companyName) && (
                    <h3>
                      {field.jobTitle && <span>{field.jobTitle}</span>}
                      {field.companyName && <span>{field.companyName}</span>}
                    </h3>
                  )}
                  {field.jobType && (
                    <h4>
                      <i>{field.jobType}</i>
                    </h4>
                  )}
                  {field.location && <h4>{field.location}</h4>}
                  {field.startDate && (
                    <h4>
                      {field.startDate}
                      {' - '}
                      {field.isCurrentlyWorking ? 'Present' : field.endDate}
                    </h4>
                  )}
                  {field.achievements && <p>{field.achievements}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* education */}
        {!stateField.skipField.educationFields && (
          <div className={styles.educationContainer}>
            <h2>
              {stateField.educationFields.length > 1
                ? 'EDUCATIONS'
                : 'EDUCATION'}
            </h2>
            <hr className={styles.hrBreaker} />
            <ul>
              {stateField.educationFields.map((field) => (
                <li key={field.id} className={styles.educationItems}>
                  {(field.degreeName || field.universityCollege) && (
                    <h3>
                      {field.degreeName && <span>{field.degreeName}</span>}
                      {field.universityCollege && (
                        <span>{field.universityCollege}</span>
                      )}
                    </h3>
                  )}
                  {field.gpa && <h4>GPA: {field.gpa}</h4>}
                  {field.startDate && (
                    <h4>
                      {field.startDate}
                      {' - '}
                      {field.isCurrentlyStudying ? 'Present' : field.endDate}
                    </h4>
                  )}
                  {field.coursework && <p>{field.coursework}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* skills */}
        {!stateField.skipField.skillFields && (
          <div className={styles.skillsContainer}>
            <h2>{stateField.skillFields.length > 1 ? 'SKILLS' : 'SKILL'}</h2>
            <hr className={styles.hrBreaker} />
            <ul className={styles.skillsList}>
              {stateField.skillFields.map((field) => (
                <li key={field.id} className={styles.skillItems}>
                  {field.skill}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* projects */}
        {!stateField.skipField.projectFields && (
          <div className={styles.projectsContainer}>
            <h2>
              {stateField.projectFields.length > 1 ? 'PROJECTS' : 'PROJECT'}
            </h2>
            <hr className={styles.hrBreaker} />
            <ul>
              {stateField.projectFields.map((field) => (
                <li key={field.id} className={styles.projectItems}>
                  {field.projectName && <h3>{field.projectName}</h3>}
                  {field.technologiesUsed && <h4>{field.technologiesUsed}</h4>}
                  {field.projectLink && (
                    <Link
                      to={field.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Project Link: {field.projectLink}
                    </Link>
                  )}
                  {field.liveDemoLink && (
                    <Link
                      to={field.liveDemoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo: {field.liveDemoLink}
                    </Link>
                  )}
                  {field.description && <p>{field.description}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* certification */}
        {!stateField.skipField.certificationFields && (
          <div className={styles.certificationContainer}>
            <h2>
              {stateField.certificationFields.length > 1
                ? 'CERTIFICATIONS'
                : 'CERTIFICATION'}
            </h2>
            <hr className={styles.hrBreaker} />
            <ul>
              {stateField.certificationFields.map((field) => (
                <li key={field.id} className={styles.certificationItems}>
                  {(field.certificationName || field.issuingOrganization) && (
                    <h3>
                      {field.certificationName && (
                        <span>{field.certificationName}</span>
                      )}
                      {field.issuingOrganization && (
                        <span>{field.issuingOrganization}</span>
                      )}
                    </h3>
                  )}
                  {!field.noDates && (field.issueDate || field.expiryDate) && (
                    <h4>
                      {field.issueDate && field.issueDate}
                      {field.expiryDate && (
                        <>
                          {' - '}
                          {new Date(field.expiryDate).getTime() > Date.now()
                            ? field.expiryDate
                            : 'Expired'}
                        </>
                      )}
                    </h4>
                  )}
                  {field.credential && <p>Credential ID: {field.credential}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Awards */}
        {!stateField.skipField.awardFields && (
          <div className={styles.awardsContainer}>
            <h2>{stateField.awardFields.length > 1 ? 'AWARDS' : 'AWARD'}</h2>
            <hr className={styles.hrBreaker} />
            <ul>
              {stateField.awardFields.map((field) => (
                <li key={field.id} className={styles.awardItems}>
                  {field.awardName && <h3>{field.awardName}</h3>}
                  {field.year && <h4>{field.year}</h4>}
                  {field.details && <p>{field.details}</p>}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* websites */}
        {!stateField.skipField.websiteFields && (
          <div className={styles.websitesContainer}>
            <h2>WEBSITES</h2>
            <hr className={styles.hrBreaker} />
            <div className={styles.websiteLinksContainer}>
              {links.map(
                (link, index) =>
                  link && (
                    <Link
                      to={link}
                      key={index}
                      className={styles.websiteLinks}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.toLowerCase().includes('linkedin')
                        ? 'LinkedIn:  '
                        : link.toLowerCase().includes('github')
                          ? 'Github:  '
                          : link === ''
                            ? null
                            : 'Portfolio: '}
                      {link}
                    </Link>
                  ),
              )}
              {stateField.moreLinkFields.map(
                (field) =>
                  field.link && (
                    <Link
                      to={field.link}
                      key={field.id}
                      className={styles.websiteLinks}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link: {field.link}
                    </Link>
                  ),
              )}
            </div>
          </div>
        )}

        {/* Languages */}
        {!stateField.skipField.languageFields && (
          <div className={styles.languagesContainer}>
            <h2>
              {stateField.languageFields.length > 1 ? 'LANGUAGES' : 'LANGUAGE'}
            </h2>
            <hr className={styles.hrBreaker} />
            <ul>
              {stateField.languageFields.map((field) => (
                <li key={field.id} className={styles.languageItems}>
                  {field.language}
                  {field.proficiencyLevel ? ` - ${field.proficiencyLevel}` : ''}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Hobbies */}
        {!stateField.skipField.hobbyFields && (
          <div className={styles.hobbiesContainer}>
            <h2>{stateField.hobbyFields.length > 1 ? 'HOBBIES' : 'HOBBY'}</h2>
            <hr className={styles.hrBreaker} />
            <ul>
              {stateField.hobbyFields.map((field) => (
                <li key={field.id} className={styles.hobbyItems}>
                  {field.hobby}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </section>
  );
};

export default ClassicTemplate;
