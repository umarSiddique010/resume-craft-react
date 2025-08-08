const Projects = ({ projectField, setProjectField }) => {
  const handleChange = (id, name, value) => {
    setProjectField(
      projectField.map((pf) => (pf.id === id ? { ...pf, [name]: value } : pf)),
    );
  };

  const removeProject = (id) => {
    setProjectField(projectField.filter((pf) => pf.id !== id));
  };

  const addProject = () => {
    setProjectField((pf) => [
      ...pf,
      {
        id: Date.now(),
        projectFieldNo:
          pf.length > 0 ? pf[pf.length - 1].projectFieldNo + 1 : 0,
        projectName: '',
        description: '',
        technologiesUsed: '',
        gitHubLink: '',
        liveDemoLink: '',
      },
    ]);
  };

  const removeAllProject = () => {
    setProjectField([
      {
        id: Date.now(),
        projectFieldNo: 1,
        projectName: '',
        description: '',
        technologiesUsed: '',
        gitHubLink: '',
        liveDemoLink: '',
      },
    ]);
  };

  return (
    <section className="component-section">
      <h2>Projects</h2>
      {projectField.map((pf) => (
        <div key={pf.id} className="render-box">
          <h3>Project field: {pf.projectFieldNo}</h3>
          <div className="input-box">
            <label htmlFor="projectName">Enter Project Name: </label>
            <input
              type="text"
              placeholder="Project Name"
              id="projectName"
              name="projectName"
              value={pf.projectName}
              onChange={(e) =>
                handleChange(pf.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className="input-box">
            <label htmlFor="description">
              Write a Description under 100 words:{' '}
            </label>
            <textarea
              placeholder="Description"
              id="description"
              name="description"
              maxLength="600"
              value={pf.description}
              onChange={(e) =>
                handleChange(pf.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className="input-box">
            <label htmlFor="technologiesUsed">Enter Technologies Used: </label>
            <input
              type="text"
              placeholder="Technologies"
              id="technologiesUsed"
              name="technologiesUsed"
              value={pf.technologiesUsed}
              onChange={(e) =>
                handleChange(pf.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className="input-box">
            <label htmlFor="">Enter GitHub Link (if applicable): </label>
            <input
              type="url"
              placeholder="GitHub Link"
              id="gitHubLink"
              name="gitHubLink"
              value={pf.gitHubLink}
              onChange={(e) =>
                handleChange(pf.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className="input-box">
            <label htmlFor="liveDemoLink">
              Enter Live Demo Link (if applicable):{' '}
            </label>
            <input
              type="url"
              placeholder="Live Demo Link"
              id="liveDemoLink"
              name="liveDemoLink"
              value={pf.liveDemoLink}
              onChange={(e) =>
                handleChange(pf.id, e.target.name, e.target.value)
              }
            />
          </div>

          {projectField.length > 1 && (
            <div className="remove-btn-box">
              <button
                className="remove-field-btn"
                type="button"
                onClick={() => removeProject(pf.id)}
              >
                Remove Project
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="btn-wrapper">
        <button className="add-field-btn" type="button" onClick={addProject}>
          Add Project
        </button>

        {projectField.length > 2 && (
          <button
            className="remove-all-fields-btn"
            type="button"
            onClick={removeAllProject}
          >
            Remove all Projects
          </button>
        )}
      </div>
    </section>
  );
};

export default Projects;
