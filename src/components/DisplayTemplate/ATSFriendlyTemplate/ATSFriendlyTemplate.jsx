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

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfoInput.fullName}</Text>
          <Text style={styles.profession}>{personalInfoInput.profession}</Text>
          <Text style={styles.contact}>
            {personalInfoInput.email} | {personalInfoInput.phoneNumber}
          </Text>
          <Text style={styles.contact}>
            {addressInput.address}, {addressInput.selectedCity},{' '}
            {addressInput.selectedStateName}, {addressInput.zipCode},{' '}
            {addressInput.selectedCountryName}
          </Text>
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
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {workExperienceFields.map((exp) => (
              <View key={exp.id} style={styles.listItem}>
                <Text style={styles.itemTitle}>
                  {exp.jobTitle} – {exp.companyName}
                </Text>
                <Text style={styles.text}>
                  {exp.location} | {exp.startDate} –{' '}
                  {exp.isCurrentlyWorking ? 'Present' : exp.endDate}
                </Text>
                <Text style={styles.text}>{exp.achievements}</Text>
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
                <Text style={styles.itemTitle}>
                  {edu.degreeName} – {edu.universityCollege}
                </Text>
                <Text style={styles.text}>
                  {edu.startDate} –{' '}
                  {edu.isCurrentlyStudying ? 'Present' : edu.endDate}
                </Text>
                <Text style={styles.text}>GPA: {edu.gpa}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {!skipField.skillFields && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.text}>
              {skillFields.map((s) => s.skill).join(', ')}
            </Text>
          </View>
        )}

        {/* Projects */}
        {!skipField.projectFields && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projectFields.map((proj) => (
              <View key={proj.id} style={styles.listItem}>
                <Text style={styles.itemTitle}>{proj.projectName}</Text>
                <Text style={styles.text}>{proj.technologiesUsed}</Text>
                <Text style={styles.text}>{proj.description}</Text>
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
            <Text style={styles.sectionTitle}>Certifications</Text>
            {certificationFields.map((cert) => (
              <View key={cert.id} style={styles.listItem}>
                <Text style={styles.itemTitle}>
                  {cert.certificationName} – {cert.issuingOrganization}
                </Text>
                {!cert.noDates && (
                  <Text style={styles.text}>
                    {cert.issueDate} – {cert.expiryDate}
                  </Text>
                )}
                <Text style={styles.text}>
                  Credential ID: {cert.credential}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Awards */}
        {!skipField.awardFields && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Awards</Text>
            {awardFields.map((award) => (
              <View key={award.id} style={styles.listItem}>
                <Text style={styles.itemTitle}>
                  {award.awardName} ({award.year})
                </Text>
                <Text style={styles.text}>{award.details}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {!skipField.languageFields && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {languageFields.map((lang) => (
              <Text key={lang.id} style={styles.text}>
                {lang.language} – {lang.proficiencyLevel}
              </Text>
            ))}
          </View>
        )}

        {/* Hobbies */}
        {!skipField.hobbyFields && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hobbies</Text>
            <Text style={styles.text}>
              {hobbyFields.map((h) => h.hobby).join(', ')}
            </Text>
          </View>
        )}

        {/* Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Websites</Text>
          {websiteInput.linkedIn && (
            <Text style={styles.text}>LinkedIn: {websiteInput.linkedIn}</Text>
          )}
          {websiteInput.gitHub && (
            <Text style={styles.text}>GitHub: {websiteInput.gitHub}</Text>
          )}
          {websiteInput.portfolio && (
            <Text style={styles.text}>Portfolio: {websiteInput.portfolio}</Text>
          )}
          {moreLinkFields.map((l) => (
            <Text key={l.id} style={styles.text}>
              {l.link}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ATSFriendly;
