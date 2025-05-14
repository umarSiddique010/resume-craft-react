import Styles from './TemplateOne.module.css';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { TbWorldWww } from 'react-icons/tb';
import { FaPhone } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { PiAddressBookTabs } from 'react-icons/pi';

const TemplateOne = ({
  basicInfoField,
  addressField,
  websitesField,
  careerSummaryInput,
  workExperiencesField,
  educationField,
  skillField,
  projectField,
  certificationField,
  awardsAchievementsField,
  languagesField,
  interestsHobbiesField,
  skipField,
  fontStyle,
}) => {
  const formaDate = (dateStr) => {
    if (!dateStr) return '';

    const [year, month, day] = dateStr.split('-');

    return `${day}/${month}/${year}`;
  };

  const removeExtraSpace = (renderingValue) => {
    return renderingValue ? renderingValue.trim() : '';
  };

  const addressPart = [
    removeExtraSpace(addressField.address),
    addressField.selectedCity,
    addressField.selectedStateName,
    addressField.selectedCountryName,
  ];

  const fullAddress = addressPart.filter((ap) => ap !== '');

  const handleCopyCredentialID = async (credential) => {
    try {
      await navigator.clipboard.writeText(credential);
      alert('Credential ID copied to clipboard: ' + credential);
    } catch (error) {
      alert('Failed to copy Credential ID ', error);
    }
  };

  return (
    <section
      style={{
        fontFamily: fontStyle === 'Change Font' ? 'Arial' : fontStyle,
      }}
      className={Styles.templateOne_section}
    >
      {/* BODY OF TEMPLATE  */}

      <div className={Styles.template_body}>
        {/* LEFT SIDE TEMPLATE  */}
        <div className={Styles.template_left_side}>
          {/* rendering  profile picture*/}

          <div className={Styles.profile_pic_box}>
            <img src={basicInfoField.profilePic} alt='Profile Picture' />
          </div>

          {/* rendering  summary*/}
          <div className={Styles.profile_summary_container}>
            <h3>SUMMARY</h3>
            <hr />
            <p>{careerSummaryInput}</p>
          </div>

          {/* rendering skill  */}
          {!skipField.Skills && (
            <div className={Styles.skills_container}>
              <h3>{skillField.length > 1 ? 'SKILLS' : 'SKILL'}</h3>
              <hr />

              <ul>
                {skillField.map((sf) => (
                  <li key={sf.id} className={Styles.rendered_skill_list}>
                    <h4>{removeExtraSpace(sf.skillValue)}</h4>
                    <div className={Styles.skill_level_dots}>
                      <div
                        className={Styles.skill_dots}
                        style={{
                          backgroundColor: [
                            'Basic',
                            'Intermediate',
                            'Advanced',
                          ].includes(removeExtraSpace(sf.skillLevel))
                            ? '#fdf9f5'
                            : '',
                        }}
                      ></div>
                      <div
                        className={Styles.skill_dots}
                        style={{
                          backgroundColor: [
                            'Basic',
                            'Intermediate',
                            'Advanced',
                          ].includes(removeExtraSpace(sf.skillLevel))
                            ? '#fdf9f5'
                            : '',
                        }}
                      ></div>
                      <div
                        className={Styles.skill_dots}
                        style={{
                          backgroundColor: [
                            'Intermediate',
                            'Advanced',
                          ].includes(removeExtraSpace(sf.skillLevel))
                            ? '#fdf9f5'
                            : '',
                        }}
                      ></div>
                      <div
                        className={Styles.skill_dots}
                        style={{
                          backgroundColor: [
                            'Intermediate',
                            'Advanced',
                          ].includes(removeExtraSpace(sf.skillLevel))
                            ? '#fdf9f5'
                            : '',
                        }}
                      ></div>
                      <div
                        className={Styles.skill_dots}
                        style={{
                          backgroundColor: ['Advanced'].includes(
                            removeExtraSpace(sf.skillLevel)
                          )
                            ? '#fdf9f5'
                            : '',
                        }}
                      ></div>
                      <div
                        className={Styles.skill_dots}
                        style={{
                          backgroundColor: ['Advanced'].includes(
                            removeExtraSpace(sf.skillLevel)
                          )
                            ? '#fdf9f5'
                            : '',
                        }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* rendering language  */}
          {!skipField.Languages && (
            <div className={Styles.languages_container}>
              <h3>{languagesField.length > 1 ? 'LANGUAGES' : 'LANGUAGE'}</h3>
              <hr />
              <ul>
                {languagesField.map((lf) => (
                  <li key={lf.id} className={Styles.rendered_language_list}>
                    <h4>{removeExtraSpace(lf.languageName)}</h4>

                    <div className={Styles.skill_level_dots}>
                      <div
                        className={Styles.skill_dots}
                        style={{
                          backgroundColor: [
                            'Basic',
                            'Conversational',
                            'Fluent',
                            'Proficient',
                            'Native',
                          ].includes(removeExtraSpace(lf.proficiencyLevel))
                            ? '#fdf9f5'
                            : '',
                        }}
                      ></div>
                      <div
                        className={Styles.skill_dots}
                        style={{
                          backgroundColor: [
                            'Basic',
                            'Conversational',
                            'Fluent',
                            'Proficient',
                            'Native',
                          ].includes(removeExtraSpace(lf.proficiencyLevel))
                            ? '#fdf9f5'
                            : '',
                        }}
                      ></div>
                      <div
                        className={Styles.skill_dots}
                        style={{
                          backgroundColor: [
                            'Conversational',
                            'Fluent',
                            'Proficient',
                            'Native',
                          ].includes(removeExtraSpace(lf.proficiencyLevel))
                            ? '#fdf9f5'
                            : '',
                        }}
                      ></div>
                      <div
                        className={Styles.skill_dots}
                        style={{
                          backgroundColor: [
                            'Fluent',
                            'Proficient',
                            'Native',
                          ].includes(removeExtraSpace(lf.proficiencyLevel))
                            ? '#fdf9f5'
                            : '',
                        }}
                      ></div>
                      <div
                        className={Styles.skill_dots}
                        style={{
                          backgroundColor: ['Proficient', 'Native'].includes(
                            removeExtraSpace(lf.proficiencyLevel)
                          )
                            ? '#fdf9f5'
                            : '',
                        }}
                      ></div>
                      <div
                        className={Styles.skill_dots}
                        style={{
                          backgroundColor: ['Native'].includes(
                            removeExtraSpace(lf.proficiencyLevel)
                          )
                            ? '#fdf9f5'
                            : '',
                        }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* rendering education */}

          {!skipField.Education && (
            <div className={Styles.education_container}>
              <h3>{educationField.length > 1 ? 'EDUCATIONS' : 'EDUCATION'}</h3>
              <hr />
              <ul>
                {educationField.map((ef) => (
                  <li key={ef.id} className={Styles.rendered_education_list}>
                    <div className={Styles.university_timeline}>
                      <h4>{removeExtraSpace(ef.universityCollege)}</h4>

                      <h4>
                        {formaDate(ef.startDate)} {' - '}{' '}
                        {ef.currentlyStudy ? 'Present' : formaDate(ef.endDate)}
                      </h4>
                    </div>

                    <div className={Styles.rendered_degree_gpa_coursework}>
                      <h4>
                        {removeExtraSpace(ef.degreeName)}
                        {' - '}{' '}
                        {removeExtraSpace(ef.GPA) &&
                        Number(removeExtraSpace(ef.GPA)) > 5
                          ? '5.0 GPA'
                          : removeExtraSpace(ef.GPA) + ' GPA'}
                      </h4>
                      <h4>
                        <span>
                          {removeExtraSpace(ef.coursework) && 'Coursework:'}
                        </span>{' '}
                        {removeExtraSpace(ef.coursework)}
                      </h4>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* rendering certification  */}

          {!skipField.Certifications && (
            <div className={Styles.certification_container}>
              <h3>
                {certificationField.length > 1 ? 'CERTIFICATES' : 'CERTIFICATE'}
              </h3>
              <hr />
              <ul>
                {certificationField.map((cf) => (
                  <li
                    key={cf.id}
                    className={Styles.rendered_certification_list}
                  >
                    <div className={Styles.certification_name_timeline}>
                      <h4>{removeExtraSpace(cf.certificationName)}</h4>
                      <h4>
                        {formaDate(cf.issueDate)} {' - '}{' '}
                        {formaDate(cf.expiryDate)}
                      </h4>
                    </div>

                    <div className={Styles.certification_issuing_organization}>
                      <h4>{removeExtraSpace(cf.issuingOrganization)}</h4>
                    </div>

                    <div className={Styles.certification_credential}>
                      {removeExtraSpace(cf.credential) &&
                      (removeExtraSpace(cf.credential).startsWith('http') ||
                        removeExtraSpace(cf.credential).startsWith('www.')) ? (
                        <a
                          href={removeExtraSpace(cf.credential)}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {removeExtraSpace(cf.credential) &&
                            'Open Credential link:'}{' '}
                          <span>{removeExtraSpace(cf.credential)}</span>
                        </a>
                      ) : (
                        <p
                          role='button'
                          tabIndex={0}
                          onClick={() =>
                            handleCopyCredentialID(
                              removeExtraSpace(cf.credential)
                            )
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ')
                              handleCopyCredentialID(
                                removeExtraSpace(cf.credential)
                              );
                          }}
                        >
                          {removeExtraSpace(cf.credential) && 'Credential ID:'}
                          <span> {removeExtraSpace(cf.credential)}</span>
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* rendering interest/hobbies */}

          {!skipField.InterestsHobbies && (
            <div className={Styles.interests_hobbies_container}>
              <h3>
                {interestsHobbiesField.length > 1
                  ? 'INTERESTS & HOBBIES '
                  : ' INTEREST & HOBBY'}
              </h3>
              <hr />

              <ul>
                {interestsHobbiesField.map((ihf) => (
                  <li
                    key={ihf.id}
                    className={Styles.rendered_interests_hobbies_list}
                  >
                    {removeExtraSpace(ihf.interestsHobbies)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* RIGHT SIDE TEMPLATE  */}
        <div className={Styles.template_right_side}>
          <div className={Styles.name_profession_container}>
            <div>
              {' '}
              <h3>{removeExtraSpace(basicInfoField.fullName)}</h3>
              <h4>{removeExtraSpace(basicInfoField.profession)}</h4>
            </div>
          </div>

          {/* rendering work experience  */}

          {!skipField.WorkExperience && (
            <div className={Styles.work_experiences_container}>
              <h3>
                {workExperiencesField.length > 1
                  ? 'WORK EXPERIENCES'
                  : 'WORK EXPERIENCE'}
              </h3>
              <hr />
              <ul>
                {workExperiencesField.map((wef) => (
                  <li
                    key={wef.id}
                    className={Styles.rendered_work_experience_list}
                  >
                    <div className={Styles.work_experiences_header}>
                      <div className={Styles.company_name_experience}>
                        <h4>{removeExtraSpace(wef.companyName)}</h4>
                        <h4>
                          {formaDate(wef.startDate)} {' - '}{' '}
                          {wef.currentlyWork
                            ? 'Present'
                            : formaDate(wef.endDate)}
                        </h4>
                      </div>
                      <div className={Styles.location}>
                        <h4>{removeExtraSpace(wef.location)}</h4>
                      </div>
                      <div className={Styles.job_title}>
                        <h4>{removeExtraSpace(wef.jobTitle)}</h4>
                      </div>
                    </div>

                    <div className={Styles.work_experiences_achievements}>
                      <p>{removeExtraSpace(wef.achievements)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* rendering project  */}

          {!skipField.Projects && (
            <div className={Styles.projects_container}>
              <h3>{projectField.length > 1 ? 'PROJECTS' : 'PROJECT'}</h3>
              <hr />
              <ul>
                {projectField.map((pf) => (
                  <li key={pf.id} className={Styles.rendered_projects_list}>
                    <div className={Styles.project_name_technology}>
                      <h4>{removeExtraSpace(pf.projectName)}</h4>
                      <h4>
                        {' '}
                        {removeExtraSpace(pf.technologiesUsed) &&
                          'Technologies Used:'}{' '}
                        {removeExtraSpace(pf.technologiesUsed)}
                      </h4>
                    </div>

                    <div className={Styles.project_description}>
                      <p>{removeExtraSpace(pf.description)}</p>
                    </div>

                    <div className={Styles.project_links}>
                      {
                        <a
                          href={removeExtraSpace(pf.gitHubLink)}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {removeExtraSpace(pf.gitHubLink) && 'GitHub repo:'}{' '}
                          <span>{removeExtraSpace(pf.gitHubLink)}</span>
                        </a>
                      }

                      {
                        <a
                          href={removeExtraSpace(pf.liveDemoLink)}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          {removeExtraSpace(pf.liveDemoLink) && 'Live demo:'}{' '}
                          <span>{removeExtraSpace(pf.liveDemoLink)}</span>
                        </a>
                      }
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* rendering award  */}

          {!skipField.AwardsAchievements && (
            <div className={Styles.awards_container}>
              <h3>{awardsAchievementsField.length > 1 ? 'AWARDS' : 'AWARD'}</h3>
              <hr />
              <ul>
                {awardsAchievementsField.map((aaf) => (
                  <li key={aaf.id} className={Styles.rendered_awards_list}>
                    <div className={Styles.award_name_year}>
                      <h4>{removeExtraSpace(aaf.awardName)}</h4>
                      <h4>{formaDate(aaf.year)}</h4>
                    </div>

                    <div className={Styles.award_details}>
                      <p>{removeExtraSpace(aaf.details)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* rendering website  */}

          {!skipField.Websites && (
            <div className={Styles.websites_container}>
              <h3>{'WEBSITES'}</h3>
              <hr />
              <div className={Styles.rendered_website_list}>
                {
                  <a
                    href={removeExtraSpace(websitesField.linkedIn)}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {removeExtraSpace(websitesField.linkedIn) && (
                      <span>
                        <FaLinkedin className={Styles.link_icon} />
                      </span>
                    )}{' '}
                    <span>{removeExtraSpace(websitesField.linkedIn)}</span>
                  </a>
                }

                {
                  <a
                    href={removeExtraSpace(websitesField.gitHub)}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {removeExtraSpace(websitesField.gitHub) && (
                      <span>
                        <FaGithub className={Styles.link_icon} />
                      </span>
                    )}{' '}
                    <span>{removeExtraSpace(websitesField.gitHub)}</span>
                  </a>
                }

                {
                  <a
                    href={removeExtraSpace(websitesField.portfolio)}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {removeExtraSpace(websitesField.portfolio) && (
                      <span>
                        <TbWorldWww className={Styles.link_icon} />
                      </span>
                    )}{' '}
                    <span>{removeExtraSpace(websitesField.portfolio)}</span>
                  </a>
                }
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER OF TEMPLATE  */}
      <div className={Styles.template_footer}>
        <a href={`tel:${removeExtraSpace(basicInfoField.phoneNumber)}`}>
          <span>
            <FaPhone className={Styles.contact_icon} />
          </span>
          {removeExtraSpace(basicInfoField.phoneNumber)}
        </a>
        <a href={`mailTo:${removeExtraSpace(basicInfoField.email)}`}>
          <span>
            <MdEmail className={Styles.contact_icon} />
          </span>
          {removeExtraSpace(basicInfoField.email)}
        </a>
        <h4>
          <span>
            <PiAddressBookTabs className={Styles.contact_icon} />
          </span>
          {fullAddress.join(', ') + '.'}
        </h4>
      </div>
    </section>
  );
};

export default TemplateOne;
