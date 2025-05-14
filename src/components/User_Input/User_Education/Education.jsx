import '../Styles/ComponentsSimilarStyles.css';
import Styles from './Education.module.css';

const Education = ({ educationField, setEducationField }) => {
  const handleChange = (id, name, value) => {
    setEducationField(
      educationField.map((ei) => (ei.id === id ? { ...ei, [name]: value } : ei))
    );
  };

  const removeEducationField = (id) => {
    setEducationField(educationField.filter((ei) => ei.id !== id));
  };

  const addEducationField = () => {
    setEducationField((ef) => [
      ...ef,
      {
        id: Date.now(),
        educationFieldNo:
          ef.length > 0 ? ef[ef.length - 1].educationFieldNo + 1 : 0,
        degreeName: '',
        universityCollege: '',
        startDate: '',
        endDate: '',
        currentlyStudy: false,
        coursework: '',
        GPA: '',
      },
    ]);
  };

  const removeEducationAllField = () => {
    setEducationField([
      {
        id: Date.now(),
        educationFieldNo: 1,
        degreeName: '',
        universityCollege: '',
        startDate: '',
        endDate: '',
        currentlyStudy: false,
        coursework: '',
        GPA: '',
      },
    ]);
  };

  return (
    <section className='component-section'>
      <h2>Education</h2>
      {educationField.map((ef) => (
        <div key={ef.id} className='render-box'>
          <h3>Education field: {ef.educationFieldNo}</h3>

          <div className='input-box'>
            <label htmlFor='degreeName'>
              Enter Degree Name (e.g., “BSc in Computer Science”):{' '}
            </label>
            <input
              type='text'
              placeholder='Degree Name'
              id='degreeName'
              name='degreeName'
              value={ef.degreeName}
              onChange={(e) =>
                handleChange(ef.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className='input-box'>
            <label htmlFor='universityCollege'>
              Enter University/College Name:{' '}
            </label>
            <input
              type='text'
              placeholder='University/College Name'
              id='universityCollege'
              name='universityCollege'
              value={ef.universityCollege}
              onChange={(e) =>
                handleChange(ef.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className={Styles.date_wrapper}>
            <div className='input-box'>
              <label>Enter Start Date: </label>
              <input
                type='date'
                id='startDate'
                name='startDate'
                value={ef.startDate}
                onChange={(e) =>
                  handleChange(ef.id, e.target.name, e.target.value)
                }
              />
            </div>

            {ef.currentlyStudy !== true && (
              <div className='input-box'>
                <label htmlFor='endDate'>Enter End Date: </label>
                <input
                  type='date'
                  id='endDate'
                  name='endDate'
                  value={ef.endDate}
                  onChange={(e) =>
                    handleChange(ef.id, e.target.name, e.target.value)
                  }
                />
              </div>
            )}

            <div className='checkbox-box'>
              <input
                type='checkbox'
                className='checkbox'
                id='currentlyStudy'
                name='currentlyStudy'
                checked={ef.currentlyStudy}
                onChange={(e) =>
                  handleChange(ef.id, e.target.name, e.target.checked)
                }
              />
              <label htmlFor='currentlyStudy'>Currently studying here.</label>
            </div>
          </div>

          <div className='input-box'>
            <label htmlFor='coursework'>
              Enter Relevant Coursework (optional):{' '}
            </label>
            <input
              type='text'
              placeholder='Relevant Coursework'
              id='coursework'
              name='coursework'
              value={ef.coursework}
              onChange={(e) =>
                handleChange(ef.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className='input-box'>
            <label htmlFor='GPA'>Enter GPA (if applicable): </label>
            <input
              type='text'
              placeholder='GPA'
              id='GPA'
              name='GPA'
              value={ef.GPA}
              onChange={(e) =>
                handleChange(ef.id, e.target.name, e.target.value)
              }
            />
          </div>

          {educationField.length > 1 && (
            <div className='remove-btn-box'>
              <button
                className='remove-field-btn'
                type='button'
                onClick={() => removeEducationField(ef.id)}
              >
                Remove Education
              </button>
            </div>
          )}
        </div>
      ))}

      <div className='btn-wrapper'>
        <button
          className='add-field-btn'
          type='button'
          onClick={addEducationField}
        >
          Add Education
        </button>

        {educationField.length > 2 && (
          <button
            className='remove-all-fields-btn'
            type='button'
            onClick={removeEducationAllField}
          >
            Remove all education
          </button>
        )}
      </div>
    </section>
  );
};

export default Education;
