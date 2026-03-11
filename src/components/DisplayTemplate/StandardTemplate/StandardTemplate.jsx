import styles from './StandardTemplate.module.css';
import templateFont from '../TemplateFonts.module.css';
import { FaRegAddressCard } from 'react-icons/fa';
import { MdOutlinePhone } from 'react-icons/md';
import { MdOutlineMail } from 'react-icons/md';
import { FaLinkedinIn } from 'react-icons/fa6';
import { FaLink } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import { BsFillSuitcaseLgFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';

const StandardTemplate = ({ fontStyle }) => {
  const [stateField, dispatchField] = useContext(InputFieldContext);

  const personalInfoInput = stateField.personalInfoInput;

  const basicSkillLevel = (skillLevel) =>
    ['Basic', 'Intermediate', 'Advanced'].includes(skillLevel)
      ? styles.dotsColorGreen
      : '';

  const intermediateSkillLevel = (skillLevel) =>
    ['Intermediate', 'Advanced'].includes(skillLevel)
      ? styles.dotsColorGreen
      : '';

  const advancedSkillLevel = (skillLevel) =>
    skillLevel === 'Advanced' ? styles.dotsColorGreen : '';

  const basicProficiencyLevel = (proficiency) =>
    ['Basic', 'Conversational', 'Fluent', 'Proficient', 'Native'].includes(
      proficiency,
    )
      ? styles.dotsColorGreen
      : '';
  const conversationalProficiencyLevel = (proficiency) =>
    ['Conversational', 'Fluent', 'Proficient', 'Native'].includes(proficiency)
      ? styles.dotsColorGreen
      : '';

  const fluentProficiencyLevel = (proficiency) =>
    ['Fluent', 'Proficient', 'Native'].includes(proficiency)
      ? styles.dotsColorGreen
      : '';

  const proficientProficiencyLevel = (proficiency) =>
    ['Proficient', 'Native'].includes(proficiency) ? styles.dotsColorGreen : '';

  const nativeProficiencyLevel = (proficiency) =>
    proficiency === 'Native' ? styles.dotsColorGreen : '';

  const addressInfo = stateField.addressInput;
  const links = [
    stateField.websiteInput.linkedIn,
    stateField.websiteInput.gitHub,
    stateField.websiteInput.portfolio,
  ];

  return (
    <section
      className={`${styles.templateSection}  ${templateFont[fontStyle]}`}
    >
      {/*--------------- LEFT PART --------------*/}
      <section className={styles.templateLeftPart}>
        {/* PROFILE PIC  */}
        {!personalInfoInput.isNotProfilePic && (
          <div className={styles.profilePic}>
            <img src={personalInfoInput.profilePic} alt="Profile Picture" />
          </div>
        )}
        {/* PROFILE SUMMARY  */}
        <div className={styles.profileSummaryContainer}>
          <h3 className={styles.profileSummaryHeading}>Profile</h3>
          <hr className={styles.hrBreaker} />
          <p className={styles.profileSummaryPara}>
            {stateField.profileSummaryInput}
          </p>
        </div>
        {/* SKILL FIELD  */}
        {!stateField.skipField.skillFields && (
          <div className={styles.skills}>
            <h2>{stateField.skillFields.length > 1 ? 'SKILLS' : 'SKILL'}</h2>
            <hr className={styles.hrBreaker} />
            <ul>
              {stateField.skillFields.map((field) => (
                <li key={field.id}>
                  <div>{field.skill}</div>
                  <div className={styles.skillLevelBox}>
                    <span className={basicSkillLevel(field.skillLevel)}></span>
                    <span className={basicSkillLevel(field.skillLevel)}></span>
                    <span
                      className={intermediateSkillLevel(field.skillLevel)}
                    ></span>
                    <span
                      className={intermediateSkillLevel(field.skillLevel)}
                    ></span>
                    <span
                      className={advancedSkillLevel(field.skillLevel)}
                    ></span>
                    <span
                      className={advancedSkillLevel(field.skillLevel)}
                    ></span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* AWARD FIELD */}
        {!stateField.skipField.awardFields && (
          <div className={styles.awards}>
            <h2>{stateField.awardFields.length > 1 ? 'AWARDS' : 'AWARD'}</h2>
            <hr className={styles.hrBreaker} />
            <ul>
              {stateField.awardFields.map((field) => (
                <li key={field.id}>
                  <h2>{field.awardName}</h2>
                  <h2>{field.year}</h2>
                  <p>{field.details}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* LANGUAGE FIELD  */}
        {!stateField.skipField.languageFields && (
          <div className={styles.languages}>
            <h2>
              {stateField.languageFields.length > 1 ? 'LANGUAGES' : 'LANGUAGE'}
            </h2>
            <hr className={styles.hrBreaker} />
            <ul>
              {stateField.languageFields.map((field) => (
                <li key={field.id}>
                  <div className={styles.languageName}>
                    <p>{field.language}</p>
                  </div>
                  <div className={styles.proficiencyLevelBox}>
                    <span
                      className={basicProficiencyLevel(field.proficiencyLevel)}
                    ></span>
                    <span
                      className={basicProficiencyLevel(field.proficiencyLevel)}
                    ></span>
                    <span
                      className={conversationalProficiencyLevel(
                        field.proficiencyLevel,
                      )}
                    ></span>
                    <span
                      className={fluentProficiencyLevel(field.proficiencyLevel)}
                    ></span>
                    <span
                      className={proficientProficiencyLevel(
                        field.proficiencyLevel,
                      )}
                    ></span>
                    <span
                      className={nativeProficiencyLevel(field.proficiencyLevel)}
                    ></span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {!stateField.skipField.hobbyFields && (
          <div className={styles.hobbies}>
            <h2>{stateField.hobbyFields.length > 1 ? 'HOBBIES' : 'HOBBY'}</h2>
            <hr className={styles.hrBreaker} />
            <ul>
              {stateField.hobbyFields.map((field) => (
                <li key={field.id}>{field.hobby}</li>
              ))}
            </ul>
          </div>
        )}
      </section>{' '}
      {/*--------------- RIGHT PART ---------------*/}
      <section className={styles.templateRightPart}>
        {/* person info */}
        <div className={styles.professionInfoContainer}>
          <h2 className={styles.personName}>{personalInfoInput.fullName}</h2>
          <h3 className={styles.personProfession}>
            {personalInfoInput.profession}
          </h3>

          {(personalInfoInput.phoneNumber || personalInfoInput.email) && (
            <h4 className={styles.personContacts}>
              {personalInfoInput.phoneNumber && (
                <>
                  <MdOutlinePhone className={styles.phoneIcon} />{' '}
                  <span>{personalInfoInput.phoneNumber}</span>
                </>
              )}
              {personalInfoInput.email && (
                <>
                  {' '}
                  | <MdOutlineMail className={styles.emailIcon} />
                  <span>{personalInfoInput.email}</span>
                </>
              )}
            </h4>
          )}

          {(addressInfo.address ||
            addressInfo.selectedCity ||
            addressInfo.selectedStateName ||
            addressInfo.zipCode ||
            addressInfo.selectedCountryName) && (
            <h4 className={styles.personAddress}>
              <FaRegAddressCard className={styles.addressIcon} />{' '}
              {[
                addressInfo.address,
                addressInfo.selectedCity,
                addressInfo.selectedStateName,
                addressInfo.zipCode,
                addressInfo.selectedCountryName,
              ]
                .filter(Boolean)
                .join(', ')}
            </h4>
          )}
        </div>

        <section className={styles.rightMain}>
          {/* work experiences */}
          {!stateField.skipField.workExperienceFields && (
            <div className={styles.workExperiences}>
              <h2>
                {stateField.workExperienceFields.length > 1
                  ? 'WORK EXPERIENCES'
                  : 'WORK EXPERIENCE'}
              </h2>
              <hr className={styles.hrBreaker} />
              <ul>
                {stateField.workExperienceFields.map((field) => (
                  <li className={styles.workExperienceList} key={field.id}>
                    {(field.companyName || field.location) && (
                      <h3>
                        {field.companyName && field.companyName}{' '}
                        {field.location && ' - ' + field.location}
                      </h3>
                    )}

                    {(field.jobTitle ||
                      field.startDate ||
                      field.isCurrentlyWorking ||
                      field.endDate) && (
                      <h4>
                        {field.jobTitle && field.jobTitle}
                        {field.startDate && (
                          <span>
                            {' | '}
                            {field.startDate}
                            {field.isCurrentlyWorking
                              ? ' - Present'
                              : field.endDate
                                ? ' - ' + field.endDate
                                : ''}
                          </span>
                        )}
                      </h4>
                    )}
                    {field.jobType && (
                      <h4>
                        <i>{field.jobType}</i>
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
            <div className={styles.educations}>
              <h2>EDUCATION</h2>
              <hr className={styles.hrBreaker}></hr>
              <ul>
                {stateField.educationFields.map((field) => (
                  <li className={styles.educationList} key={field.id}>
                    {field.degreeName && <h3>{field.degreeName}</h3>}
                    {(field.universityCollege ||
                      field.startDate ||
                      field.endDate ||
                      field.isCurrentlyStudying) && (
                      <h4>
                        {field.universityCollege && field.universityCollege}
                        {field.startDate && (
                          <span>
                            {' | '}
                            {field.startDate}
                            {' - '}
                            {field.isCurrentlyStudying
                              ? 'Present'
                              : field.endDate}
                          </span>
                        )}
                      </h4>
                    )}
                    {field.coursework && <p>{field.coursework}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* projects */}
          {!stateField.skipField.projectFields && (
            <div className={styles.projects}>
              <h2>
                {stateField.projectFields.length > 1 ? 'PROJECTS' : 'PROJECT'}
              </h2>
              <hr className={styles.hrBreaker} />
              <ul>
                {stateField.projectFields.map((field) => (
                  <li className={styles.projectList} key={field.id}>
                    {field.projectName && <h3>{field.projectName}</h3>}
                    {field.technologiesUsed && (
                      <h4>{field.technologiesUsed}</h4>
                    )}
                    {field.projectLink && (
                      <Link
                        to={field.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.projectLinks}
                      >
                        <FaLink className={styles.linkIcon} />{' '}
                        {field.projectLink}
                      </Link>
                    )}
                    {field.liveDemoLink && (
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        to={field.liveDemoLink}
                        className={styles.projectLinks}
                      >
                        <TbWorld className={styles.liveLink} />{' '}
                        {field.liveDemoLink}
                      </Link>
                    )}
                    {field.description && <p>{field.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* certifications */}
          {!stateField.skipField.certificationFields && (
            <div className={styles.certifications}>
              <h2>
                {stateField.certificationFields.length > 1
                  ? 'CERTIFICATIONS'
                  : 'CERTIFICATION'}
              </h2>
              <hr className={styles.hrBreaker} />
              <ul>
                {stateField.certificationFields.map((field) => (
                  <li className={styles.certificationList} key={field.id}>
                    {field.certificationName && (
                      <h3>{field.certificationName}</h3>
                    )}
                    {!field.noDates &&
                      (field.issueDate || field.expiryDate) && (
                        <h4>
                          {field.issueDate && field.issueDate}
                          {field.expiryDate && (
                            <span>
                              {' - '}
                              {new Date(field.expiryDate).getTime() > Date.now()
                                ? field.expiryDate
                                : 'Expired'}
                            </span>
                          )}
                        </h4>
                      )}
                    {field.credential && (
                      <p>Credential ID: {field.credential}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* websites */}
          {!stateField.skipField.websiteFields && (
            <div className={styles.websites}>
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
                        {link.toLowerCase().includes('linkedin') ? (
                          <FaLinkedinIn className={styles.linkedinIcon} />
                        ) : link.toLowerCase().includes('github') ? (
                          <FaGithub className={styles.githubIcon} />
                        ) : link === '' ? null : (
                          <BsFillSuitcaseLgFill
                            className={styles.portfolioIcon}
                          />
                        )}
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
                        <FaLink className={styles.linkIcon} /> {field.link}
                      </Link>
                    ),
                )}
              </div>
            </div>
          )}
        </section>
      </section>
    </section>
  );
};

export default StandardTemplate;
