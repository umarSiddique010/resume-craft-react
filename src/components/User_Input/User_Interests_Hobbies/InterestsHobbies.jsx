import '../Styles/ComponentsSimilarStyles.css';
import Styles from './InterestsHobbies.module.css';

const InterestsHobbies = ({
  interestsHobbiesField,
  setInterestsHobbiesField,
}) => {
  const handleChange = (id, name, value) => {
    setInterestsHobbiesField(
      interestsHobbiesField.map((ihf) =>
        ihf.id === id ? { ...ihf, [name]: value } : ihf,
      ),
    );
  };

  const removeInterestHobbyInput = (id) => {
    setInterestsHobbiesField(
      interestsHobbiesField.filter((ihf) => ihf.id !== id),
    );
  };

  const addInterestHobbyInput = () => {
    setInterestsHobbiesField((ihf) => [
      ...ihf,
      {
        id: Date.now(),
        interestsHobbiesFieldNo:
          ihf.length > 0 ? ihf[ihf.length - 1].interestsHobbiesFieldNo + 1 : 0,
        interestsHobbies: '',
      },
    ]);
  };

  const removeAllInterestsHobbiesInput = () => {
    setInterestsHobbiesField([
      {
        id: Date.now(),
        interestsHobbiesFieldNo: 1,
        interestsHobbies: '',
      },
    ]);
  };

  return (
    <section className="component-section">
      <h2 className={Styles.hobbies_heading}>Interests/Hobbies (Optional)</h2>
      {interestsHobbiesField.map((ihf) => (
        <div key={ihf.id} className="render-box">
          <h3>Interests/Hobbies Input Field: {ihf.interestsHobbiesFieldNo}</h3>
          <div className="input-box">
            <label htmlFor="interestsHobbies">
              Write your interests/hobbies:{' '}
            </label>
            <input
              type="text"
              placeholder="Interests/Hobbies"
              id="interestsHobbies"
              name="interestsHobbies"
              value={ihf.interestsHobbies}
              onChange={(e) =>
                handleChange(ihf.id, e.target.name, e.target.value)
              }
            />
          </div>
          {interestsHobbiesField.length > 1 && (
            <div className="remove-btn-box">
              <button
                className="remove-field-btn"
                type="button"
                onClick={() => removeInterestHobbyInput(ihf.id)}
              >
                Remove Interest/Hobby
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="btn-wrapper">
        <button
          className="add-field-btn"
          type="button"
          onClick={addInterestHobbyInput}
        >
          Add Interest/Hobby
        </button>

        {interestsHobbiesField.length > 2 && (
          <button
            className="remove-all-fields-btn"
            type="button"
            onClick={removeAllInterestsHobbiesInput}
          >
            Remove All Interests/Hobbies
          </button>
        )}
      </div>
    </section>
  );
};

export default InterestsHobbies;
