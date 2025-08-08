import '../Styles/ComponentsSimilarStyles.css';
const WorkExperience = ({ workExperiencesField, setWorkExperiencesField }) => {
  const handleChange = (id, name, value) => {
    setWorkExperiencesField((wef) =>
      wef.map((we) => (we.id === id ? { ...we, [name]: value } : we)),
    );
  };

  const removeWorkExperience = (id) => {
    setWorkExperiencesField((wef) => wef.filter((we) => we.id !== id));
  };

  const addWorkExperience = () => {
    setWorkExperiencesField((wef) => [
      ...wef,
      {
        id: Date.now(),
        experienceFieldNo:
          wef.length > 0 ? wef[wef.length - 1].experienceFieldNo + 1 : 0,
        jobTitle: '',
        companyName: '',
        location: '',
        startDate: '',
        endDate: '',
        currentlyWork: false,
        achievements: '',
      },
    ]);
  };

  const removeAllWorkExperience = () => {
    setWorkExperiencesField([
      {
        id: Date.now(),
        experienceFieldNo: 1,
        jobTitle: '',
        companyName: '',
        location: '',
        startDate: '',
        endDate: '',
        currentlyWork: false,
        achievements: '',
      },
    ]);
  };

  return (
    <section className="component-section">
      <h2>Work Experience</h2>

      {workExperiencesField.map((wef) => (
        <div key={wef.id} className="render-box">
          <h3>Experience Field: {wef.experienceFieldNo}</h3>

          <div className="input-box">
            <label htmlFor="jobTitle">Enter Job Title: </label>
            <input
              type="text"
              placeholder="Job Title"
              id="jobTitle"
              name="jobTitle"
              value={wef.jobTitle}
              onChange={(e) =>
                handleChange(wef.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className="input-box">
            <label htmlFor="companyName">Enter Company Name: </label>
            <input
              type="text"
              placeholder="Company Name"
              id="companyName"
              name="companyName"
              value={wef.companyName}
              onChange={(e) =>
                handleChange(wef.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className="input-box">
            <label htmlFor="location">Enter Location (City, Country): </label>
            <input
              type="text"
              placeholder="Location (City, Country)"
              id="location"
              name="location"
              value={wef.location}
              onChange={(e) =>
                handleChange(wef.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className="input-box">
            <label htmlFor="startDate">Enter Start Date: </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={wef.startDate}
              onChange={(e) =>
                handleChange(wef.id, e.target.name, e.target.value)
              }
            />
          </div>
          {wef.currentlyWork !== true && (
            <div className="input-box">
              <label htmlFor="endDate">Enter End Date: </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={wef.endDate}
                onChange={(e) =>
                  handleChange(wef.id, e.target.name, e.target.value)
                }
              />
            </div>
          )}

          <div className="checkbox-box">
            <input
              type="checkbox"
              className="checkbox"
              id="currentlyWork"
              name="currentlyWork"
              checked={wef.currentlyWork}
              onChange={(e) =>
                handleChange(wef.id, 'currentlyWork', e.target.checked)
              }
            />
            <label htmlFor="currentlyWork">Currently working here.</label>
          </div>

          <div className="input-box">
            <label htmlFor="achievements">
              Enter Responsibilities & Achievements (Bullet points or
              description) under 100 words:{' '}
            </label>
            <textarea
              placeholder="Responsibilities & Achievements"
              maxLength="600"
              id="achievements"
              name="achievements"
              value={wef.achievements}
              onChange={(e) =>
                handleChange(wef.id, e.target.name, e.target.value)
              }
            />
          </div>

          {workExperiencesField.length > 1 && (
            <div className="remove-btn-box">
              {' '}
              <button
                className="remove-field-btn"
                type="button"
                onClick={() => removeWorkExperience(wef.id)}
              >
                Remove Experience
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="btn-wrapper">
        <button
          className="add-field-btn"
          type="button"
          onClick={addWorkExperience}
        >
          Add Experience
        </button>

        {workExperiencesField.length > 2 && (
          <button
            className="remove-all-fields-btn"
            type="button"
            onClick={removeAllWorkExperience}
          >
            Remove all Experience
          </button>
        )}
      </div>
    </section>
  );
};

export default WorkExperience;
