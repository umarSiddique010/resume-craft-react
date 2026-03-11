import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 22,
    fontSize: 9,
    lineHeight: 1.15,
    fontFamily: 'Helvetica',
  },

  header: {
    marginBottom: 8,
  },

  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  profession: {
    fontSize: 10,
    marginBottom: 2,
    marginTop: 3,
  },

  contact: {
    fontSize: 9,
    marginBottom: 2,
  },

  section: {
    marginBottom: 6,
  },

  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 3,
    textTransform: 'uppercase',
  },

  itemTitle: {
    fontSize: 9.5,
    fontWeight: 'bold',
  },

  text: {
    fontSize: 9,
  },

  listItem: {
    marginBottom: 3,
  },
});

const ATSFriendly = ({ data }) => {
  const {
    personalInfoInput,
    addressInput,
    profileSummaryInput,
    workExperienceFields,
    educationFields,
    skillFields,
    projectFields,
    certificationFields,
    awardFields,
    languageFields,
    hobbyFields,
    websiteInput,
    moreLinkFields,
    skipField,
  } = data;

  const address = [
    addressInput.address,
    addressInput.selectedCity,
    addressInput.selectedStateName,
    addressInput.zipCode,
    addressInput.selectedCountryName,
  ]
    .filter(Boolean)
    .join(', ');

  const hasLinks =
    websiteInput.linkedIn ||
    websiteInput.gitHub ||
    websiteInput.portfolio ||
    moreLinkFields.some((l) => l.link);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {personalInfoInput.fullName && (
            <Text style={styles.name}>{personalInfoInput.fullName}</Text>
          )}
          {personalInfoInput.profession && (
            <Text style={styles.profession}>
              {personalInfoInput.profession}
            </Text>
          )}
          {(personalInfoInput.email || personalInfoInput.phoneNumber) && (
            <Text style={styles.contact}>
              {[personalInfoInput.email, personalInfoInput.phoneNumber]
                .filter(Boolean)
                .join(' | ')}
            </Text>
          )}
          {address && <Text style={styles.contact}>{address}</Text>}
        </View>

        {/* Summary */}
        {profileSummaryInput && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.text}>{profileSummaryInput}</Text>
          </View>
        )}

        {/* Work Experience */}
        {!skipField.workExperienceFields && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {workExperienceFields.length > 1
                ? 'Work Experiences'
                : 'Work Experience'}
            </Text>
            {workExperienceFields.map((exp) => (
              <View key={exp.id} style={styles.listItem}>
                {(exp.jobTitle || exp.companyName) && (
                  <Text style={styles.itemTitle}>
                    {[exp.jobTitle, exp.companyName]
                      .filter(Boolean)
                      .join(' – ')}
                  </Text>
                )}
                {exp.jobType && <Text style={styles.text}>{exp.jobType}</Text>}
                {(exp.location || exp.startDate) && (
                  <Text style={styles.text}>
                    {[
                      exp.location,
                      exp.startDate
                        ? `${exp.startDate} – ${exp.isCurrentlyWorking ? 'Present' : exp.endDate || ''}`
                        : null,
                    ]
                      .filter(Boolean)
                      .join(' | ')}
                  </Text>
                )}
                {exp.achievements && (
                  <Text style={styles.text}>{exp.achievements}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {!skipField.educationFields && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {educationFields.map((edu) => (
              <View key={edu.id} style={styles.listItem}>
                {(edu.degreeName || edu.universityCollege) && (
                  <Text style={styles.itemTitle}>
                    {[edu.degreeName, edu.universityCollege]
                      .filter(Boolean)
                      .join(' – ')}
                  </Text>
                )}
                {edu.startDate && (
                  <Text style={styles.text}>
                    {edu.startDate} –{' '}
                    {edu.isCurrentlyStudying ? 'Present' : edu.endDate || ''}
                  </Text>
                )}
                {edu.gpa && <Text style={styles.text}>GPA: {edu.gpa}</Text>}
                {edu.coursework && (
                  <Text style={styles.text}>{edu.coursework}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {!skipField.skillFields && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {skillFields.length > 1 ? 'Skills' : 'Skill'}
            </Text>
            <Text style={styles.text}>
              {skillFields
                .map((s) => s.skill)
                .filter(Boolean)
                .join(', ')}
            </Text>
          </View>
        )}

        {/* Projects */}
        {!skipField.projectFields && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {projectFields.length > 1 ? 'Projects' : 'Project'}
            </Text>
            {projectFields.map((proj) => (
              <View key={proj.id} style={styles.listItem}>
                {proj.projectName && (
                  <Text style={styles.itemTitle}>{proj.projectName}</Text>
                )}
                {proj.technologiesUsed && (
                  <Text style={styles.text}>{proj.technologiesUsed}</Text>
                )}
                {proj.description && (
                  <Text style={styles.text}>{proj.description}</Text>
                )}
                {proj.projectLink && (
                  <Text style={styles.text}>Link: {proj.projectLink}</Text>
                )}
                {proj.liveDemoLink && (
                  <Text style={styles.text}>Live: {proj.liveDemoLink}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {!skipField.certificationFields && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {certificationFields.length > 1
                ? 'Certifications'
                : 'Certification'}
            </Text>
            {certificationFields.map((cert) => (
              <View key={cert.id} style={styles.listItem}>
                {(cert.certificationName || cert.issuingOrganization) && (
                  <Text style={styles.itemTitle}>
                    {[cert.certificationName, cert.issuingOrganization]
                      .filter(Boolean)
                      .join(' – ')}
                  </Text>
                )}
                {!cert.noDates && (cert.issueDate || cert.expiryDate) && (
                  <Text style={styles.text}>
                    {cert.issueDate}
                    {cert.expiryDate
                      ? ` – ${new Date(cert.expiryDate).getTime() > Date.now() ? cert.expiryDate : 'Expired'}`
                      : ''}
                  </Text>
                )}
                {cert.credential && (
                  <Text style={styles.text}>
                    Credential ID: {cert.credential}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Awards */}
        {!skipField.awardFields && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {awardFields.length > 1 ? 'Awards' : 'Award'}
            </Text>
            {awardFields.map((award) => (
              <View key={award.id} style={styles.listItem}>
                {(award.awardName || award.year) && (
                  <Text style={styles.itemTitle}>
                    {award.awardName}
                    {award.year ? ` (${award.year})` : ''}
                  </Text>
                )}
                {award.details && (
                  <Text style={styles.text}>{award.details}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {!skipField.languageFields && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {languageFields.length > 1 ? 'Languages' : 'Language'}
            </Text>
            {languageFields.map((lang) => (
              <Text key={lang.id} style={styles.text}>
                {lang.language}
                {lang.proficiencyLevel ? ` – ${lang.proficiencyLevel}` : ''}
              </Text>
            ))}
          </View>
        )}

        {/* Hobbies */}
        {!skipField.hobbyFields && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {hobbyFields.length > 1 ? 'Hobbies' : 'Hobby'}
            </Text>
            <Text style={styles.text}>
              {hobbyFields
                .map((h) => h.hobby)
                .filter(Boolean)
                .join(', ')}
            </Text>
          </View>
        )}

        {/* Websites */}
        {hasLinks && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Websites</Text>
            {websiteInput.linkedIn && (
              <Text style={styles.text}>LinkedIn: {websiteInput.linkedIn}</Text>
            )}
            {websiteInput.gitHub && (
              <Text style={styles.text}>GitHub: {websiteInput.gitHub}</Text>
            )}
            {websiteInput.portfolio && (
              <Text style={styles.text}>
                Portfolio: {websiteInput.portfolio}
              </Text>
            )}
            {moreLinkFields.map(
              (l) =>
                l.link && (
                  <Text key={l.id} style={styles.text}>
                    {l.link}
                  </Text>
                ),
            )}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ATSFriendly;
