import '../Styles/ComponentsSimilarStyles.css';

const Languages = ({ languagesField, setLanguagesField }) => {
  const handleChange = (id, name, value) => {
    setLanguagesField(
      languagesField.map((lf) => (lf.id === id ? { ...lf, [name]: value } : lf))
    );
  };

  const removeLanguageInput = (id) => {
    setLanguagesField(languagesField.filter((lf) => lf.id !== id));
  };

  const removeAllLanguageInput = () => {
    setLanguagesField([
      {
        id: Date.now(),
        languagesFieldNo: 1,
        languageName: '',
        proficiencyLevel: '',
      },
    ]);
  };

  const addLanguageInput = () => {
    setLanguagesField((lf) => [
      ...lf,
      {
        id: Date.now(),
        languagesFieldNo:
          lf.length > 0 ? lf[lf.length - 1].languagesFieldNo + 1 : 0,
        languageName: '',
        proficiencyLevel: '',
      },
    ]);
  };

  return (
    <section className='component-section'>
      <h2>Languages (if multilingual)</h2>

      {languagesField.map((lf) => (
        <div key={lf.id} className='render-box'>
          <h3>Language Input Field: {lf.languagesFieldNo}</h3>

          <div className='input-box'>
            <label htmlFor='languageName'>Enter Language Name: </label>
            <input
              type='text'
              placeholder='Language Name'
              id='languageName'
              name='languageName'
              value={lf.languageName}
              onChange={(e) =>
                handleChange(lf.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className='input-box'>
            <label htmlFor='proficiencyLevel'>Proficiency Level: </label>
            <select
              id='proficiencyLevel'
              name='proficiencyLevel'
              value={lf.proficiencyLevel}
              onChange={(e) =>
                handleChange(lf.id, e.target.name, e.target.value)
              }
            >
              <option value='Proficiency Level'>--Proficiency Level--</option>
              <optgroup>
                <option value='Basic'>Basic</option>
                <option value='Conversational'>Conversational</option>
                <option value='Fluent'>Fluent</option>
                <option value='Proficient'>Proficient</option>
                <option value='Native'>Native</option>
              </optgroup>
            </select>
          </div>

          {languagesField.length > 1 && (
            <div className='remove-btn-box'>
              <button
                className='remove-field-btn'
                type='button'
                onClick={() => removeLanguageInput(lf.id)}
              >
                Remove Language
              </button>
            </div>
          )}
        </div>
      ))}

      <div className='btn-wrapper'>
        <button
          className='add-field-btn'
          type='button'
          onClick={addLanguageInput}
        >
          Add Language
        </button>

        {languagesField.length > 2 && (
          <button
            className='remove-all-fields-btn'
            type='button'
            onClick={removeAllLanguageInput}
          >
            Remove All Language
          </button>
        )}
      </div>
    </section>
  );
};

export default Languages;
