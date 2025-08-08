import '../Styles/ComponentsSimilarStyles.css';

const AwardsAchievements = ({
  awardsAchievementsField,
  setAwardsAchievementsField,
}) => {
  const handleChange = (id, name, value) => {
    setAwardsAchievementsField(
      awardsAchievementsField.map((aaf) =>
        aaf.id === id ? { ...aaf, [name]: value } : aaf,
      ),
    );
  };

  const removeAwardsAchievements = (id) => {
    setAwardsAchievementsField(
      awardsAchievementsField.filter((aaf) => aaf.id !== id),
    );
  };

  const removeAllAwardsAchievements = () => {
    setAwardsAchievementsField([
      {
        id: Date.now(),
        awardsAchievementsFieldNo: 1,
        awardName: '',
        year: '',
        details: '',
      },
    ]);
  };

  const addAwardsAchievements = () => {
    setAwardsAchievementsField((aaf) => [
      ...aaf,
      {
        id: Date.now(),
        awardsAchievementsFieldNo:
          aaf.length > 0
            ? aaf[aaf.length - 1].awardsAchievementsFieldNo + 1
            : 0,
        awardName: '',
        year: '',
        details: '',
      },
    ]);
  };

  return (
    <section className="component-section">
      <h2>Awards & Achievements (Optional)</h2>

      {awardsAchievementsField.map((aaf) => (
        <div key={aaf.id} className="render-box">
          <h3>Awards & Achievements Field: {aaf.awardsAchievementsFieldNo}</h3>

          <div className="input-box">
            <label htmlFor="awardName">Enter Award Name: </label>
            <input
              type="text"
              placeholder="Award Name"
              name="awardName"
              id="awardName"
              value={aaf.awardName}
              onChange={(e) =>
                handleChange(aaf.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className="input-box">
            <label htmlFor="year">Enter Year: </label>
            <input
              type="date"
              id="year"
              name="year"
              value={aaf.year}
              onChange={(e) =>
                handleChange(aaf.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className="input-box">
            <label htmlFor="details">Write Details under 100 words: </label>
            <textarea
              placeholder="Details"
              id="details"
              name="details"
              maxLength="600"
              value={aaf.details}
              onChange={(e) =>
                handleChange(aaf.id, e.target.name, e.target.value)
              }
            />
          </div>

          {awardsAchievementsField.length > 1 && (
            <div className="remove-btn-box">
              <button
                className="remove-field-btn"
                type="button"
                onClick={() => removeAwardsAchievements(aaf.id)}
              >
                Remove Awards & Achievements
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="btn-wrapper">
        <button
          className="add-field-btn"
          type="button"
          onClick={addAwardsAchievements}
        >
          Add Awards & Achievements
        </button>

        {awardsAchievementsField.length > 2 && (
          <button
            className="remove-all-fields-btn"
            type="button"
            onClick={removeAllAwardsAchievements}
          >
            Remove all Awards & Achievements
          </button>
        )}
      </div>
    </section>
  );
};

export default AwardsAchievements;
