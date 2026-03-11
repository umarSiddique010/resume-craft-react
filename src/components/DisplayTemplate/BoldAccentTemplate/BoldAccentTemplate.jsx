import styles from './BoldAccentTemplate.module.css';
import templateFont from '../TemplateFonts.module.css';
import { FaRegAddressCard } from 'react-icons/fa';
import { MdOutlinePhone, MdOutlineMail } from 'react-icons/md';
import { FaLinkedinIn, FaLink } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';
import { TbWorld } from 'react-icons/tb';
import { BsFillSuitcaseLgFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';

const BoldAccentTemplate = ({ fontStyle }) => {
  const [stateField] = useContext(InputFieldContext);

  const personalInfoInput = stateField.personalInfoInput;
  const addressInfo = stateField.addressInput;
  const links = [
    stateField.websiteInput.linkedIn,
    stateField.websiteInput.gitHub,
    stateField.websiteInput.portfolio,
  ];

  return (
    <section className={`${styles.templateSection} ${templateFont[fontStyle]}`}>
      {/* ── HEADER ── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.personName}>{personalInfoInput.fullName}</h1>
          <h2 className={styles.personProfession}>
            {personalInfoInput.profession}
          </h2>
          <div className={styles.contactRow}>
            {personalInfoInput.phoneNumber && (
              <span className={styles.contactItem}>
                <MdOutlinePhone className={styles.contactIcon} />
                {personalInfoInput.phoneNumber}
              </span>
            )}
            {personalInfoInput.email && (
              <span className={styles.contactItem}>
                <MdOutlineMail className={styles.contactIcon} />
                {personalInfoInput.email}
              </span>
            )}
            {(addressInfo.address ||
              addressInfo.selectedCity ||
              addressInfo.selectedStateName ||
              addressInfo.zipCode ||
              addressInfo.selectedCountryName) && (
              <span className={styles.contactItem}>
                <FaRegAddressCard className={styles.contactIcon} />
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
            )}
          </div>
        </div>

        {!personalInfoInput.isNotProfilePic && (
          <div className={styles.profilePicWrapper}>
            <img
              src={personalInfoInput.profilePic}
              alt="Profile"
              className={styles.profilePic}
            />
          </div>
        )}
      </header>

      {/* ── ACCENT BAR ── */}
      <div className={styles.accentBar} />

      {/* ── BODY ── */}
      <div className={styles.body}>
        {/* LEFT COLUMN */}
        <aside className={styles.leftCol}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span>PROFILE</span>
            </h3>
            <p className={styles.summaryText}>
              {stateField.profileSummaryInput}
            </p>
          </div>

          {!stateField.skipField.skillFields && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span>
                  {stateField.skillFields.length > 1 ? 'SKILLS' : 'SKILL'}
                </span>
              </h3>
              <ul className={styles.skillList}>
                {stateField.skillFields.map((field) => (
                  <li key={field.id} className={styles.skillItem}>
                    <span className={styles.skillName}>{field.skill}</span>
                    {field.skillLevel && (
                      <span className={styles.skillBadge}>
                        {field.skillLevel}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!stateField.skipField.languageFields && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span>
                  {stateField.languageFields.length > 1
                    ? 'LANGUAGES'
                    : 'LANGUAGE'}
                </span>
              </h3>
              <ul className={styles.langList}>
                {stateField.languageFields.map((field) => (
                  <li key={field.id} className={styles.langItem}>
                    <span>{field.language}</span>
                    {field.proficiencyLevel && (
                      <span className={styles.langLevel}>
                        {field.proficiencyLevel}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!stateField.skipField.hobbyFields && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span>
                  {stateField.hobbyFields.length > 1 ? 'HOBBIES' : 'HOBBY'}
                </span>
              </h3>
              <ul className={styles.hobbyList}>
                {stateField.hobbyFields.map((field) => (
                  <li key={field.id} className={styles.hobbyItem}>
                    {field.hobby}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!stateField.skipField.websiteFields && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span>WEBSITES</span>
              </h3>
              <div className={styles.websiteList}>
                {links.map(
                  (link, index) =>
                    link && (
                      <Link
                        key={index}
                        to={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.websiteLink}
                      >
                        {link.toLowerCase().includes('linkedin') ? (
                          <FaLinkedinIn className={styles.webIcon} />
                        ) : link.toLowerCase().includes('github') ? (
                          <FaGithub className={styles.webIcon} />
                        ) : (
                          <BsFillSuitcaseLgFill className={styles.webIcon} />
                        )}
                        {link}
                      </Link>
                    ),
                )}
                {stateField.moreLinkFields.map(
                  (field) =>
                    field.link && (
                      <Link
                        key={field.id}
                        to={field.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.websiteLink}
                      >
                        <FaLink className={styles.webIcon} /> {field.link}
                      </Link>
                    ),
                )}
              </div>
            </div>
          )}
        </aside>

        {/* RIGHT COLUMN */}
        <main className={styles.rightCol}>
          {!stateField.skipField.workExperienceFields && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span>
                  {stateField.workExperienceFields.length > 1
                    ? 'WORK EXPERIENCES'
                    : 'WORK EXPERIENCE'}
                </span>
              </h3>
              {stateField.workExperienceFields.map((field) => (
                <div key={field.id} className={styles.card}>
                  {(field.jobTitle || field.companyName) && (
                    <div className={styles.cardHeader}>
                      {field.jobTitle && (
                        <h4 className={styles.cardTitle}>{field.jobTitle}</h4>
                      )}
                      {field.companyName && (
                        <span className={styles.cardOrg}>
                          {field.companyName}
                        </span>
                      )}
                    </div>
                  )}
                  {(field.location || field.startDate) && (
                    <div className={styles.cardMeta}>
                      {field.jobType && (
                        <h4 className={styles.cardTitle}>
                          <i>{field.jobType}</i>
                        </h4>
                      )}
                      {field.location && <span>{field.location}</span>}
                      {field.startDate && (
                        <span>
                          {field.startDate}
                          {field.isCurrentlyWorking
                            ? ' – Present'
                            : field.endDate
                              ? ' – ' + field.endDate
                              : ''}
                        </span>
                      )}
                    </div>
                  )}
                  {field.achievements && (
                    <p className={styles.cardDesc}>{field.achievements}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {!stateField.skipField.educationFields && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span>EDUCATION</span>
              </h3>
              {stateField.educationFields.map((field) => (
                <div key={field.id} className={styles.card}>
                  {(field.degreeName || field.universityCollege) && (
                    <div className={styles.cardHeader}>
                      {field.degreeName && (
                        <h4 className={styles.cardTitle}>{field.degreeName}</h4>
                      )}
                      {field.universityCollege && (
                        <span className={styles.cardOrg}>
                          {field.universityCollege}
                        </span>
                      )}
                    </div>
                  )}
                  {(field.gpa || field.startDate) && (
                    <div className={styles.cardMeta}>
                      {field.gpa && <span>GPA: {field.gpa}</span>}
                      {field.startDate && (
                        <span>
                          {field.startDate} –{' '}
                          {field.isCurrentlyStudying
                            ? 'Present'
                            : field.endDate}
                        </span>
                      )}
                    </div>
                  )}
                  {field.coursework && (
                    <p className={styles.cardDesc}>{field.coursework}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {!stateField.skipField.projectFields && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span>
                  {stateField.projectFields.length > 1 ? 'PROJECTS' : 'PROJECT'}
                </span>
              </h3>
              {stateField.projectFields.map((field) => (
                <div key={field.id} className={styles.card}>
                  {field.projectName && (
                    <h4 className={styles.cardTitle}>{field.projectName}</h4>
                  )}
                  {field.technologiesUsed && (
                    <p className={styles.techStack}>{field.technologiesUsed}</p>
                  )}
                  {(field.projectLink || field.liveDemoLink) && (
                    <div className={styles.projectLinks}>
                      {field.projectLink && (
                        <Link
                          to={field.projectLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.projLink}
                        >
                          <FaLink className={styles.webIcon} />{' '}
                          {field.projectLink}
                        </Link>
                      )}
                      {field.liveDemoLink && (
                        <Link
                          to={field.liveDemoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.projLink}
                        >
                          <TbWorld className={styles.webIcon} />{' '}
                          {field.liveDemoLink}
                        </Link>
                      )}
                    </div>
                  )}
                  {field.description && (
                    <p className={styles.cardDesc}>{field.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {!stateField.skipField.certificationFields && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span>
                  {stateField.certificationFields.length > 1
                    ? 'CERTIFICATIONS'
                    : 'CERTIFICATION'}
                </span>
              </h3>
              {stateField.certificationFields.map((field) => (
                <div key={field.id} className={styles.card}>
                  {(field.certificationName || field.issuingOrganization) && (
                    <div className={styles.cardHeader}>
                      {field.certificationName && (
                        <h4 className={styles.cardTitle}>
                          {field.certificationName}
                        </h4>
                      )}
                      {field.issuingOrganization && (
                        <span className={styles.cardOrg}>
                          {field.issuingOrganization}
                        </span>
                      )}
                    </div>
                  )}
                  {!field.noDates && (field.issueDate || field.expiryDate) && (
                    <div className={styles.cardMeta}>
                      <span>
                        {field.issueDate}
                        {field.expiryDate && (
                          <>
                            {' '}
                            –{' '}
                            {new Date(field.expiryDate).getTime() > Date.now()
                              ? field.expiryDate
                              : 'Expired'}
                          </>
                        )}
                      </span>
                    </div>
                  )}
                  {field.credential && (
                    <p className={styles.cardDesc}>
                      Credential ID: {field.credential}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {!stateField.skipField.awardFields && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <span>
                  {stateField.awardFields.length > 1 ? 'AWARDS' : 'AWARD'}
                </span>
              </h3>
              {stateField.awardFields.map((field) => (
                <div key={field.id} className={styles.card}>
                  {(field.awardName || field.year) && (
                    <div className={styles.cardHeader}>
                      {field.awardName && (
                        <h4 className={styles.cardTitle}>{field.awardName}</h4>
                      )}
                      {field.year && (
                        <span className={styles.cardOrg}>{field.year}</span>
                      )}
                    </div>
                  )}
                  {field.details && (
                    <p className={styles.cardDesc}>{field.details}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default BoldAccentTemplate;
