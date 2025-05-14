import '../Styles/ComponentsSimilarStyles.css';
import Styles from './Skills.module.css';

const Skills = ({
  skillField,
setSkillField,
}) => {


  const handleSkillChange = (id, name, value) => {
    setSkillField(
      skillField.map((sf) =>
        sf.id === id ? { ...sf, [name]: value } : sf
      )
    );
  };

  const addSkill = () => {
    setSkillField((sf) => [
      ...sf,
      {
        id: Date.now(),
        skillFieldNo:
          sf.length > 0 ? sf[sf.length - 1].skillFieldNo + 1 : 0,
        skillValue: '',
        skillLevel: '',
      },
    ]);
  };

  const removeSkill = (id) => {
    setSkillField(skillField.filter((sf) => sf.id !== id));
  };

  const removeAllSkill = () => {
    setSkillField([
      {
        id: Date.now(),
        skillFieldNo: 1,
        skillValue: '',
        skillLevel: '',
      },
    ]);
  };

 

  return (
    <section className='component-section'>
      <h2>Skills</h2>

      <div className={Styles.tech_wrapper}>
        <h3>Skills</h3>
        {skillField.map((sf) => (
          <div key={sf.id} className='render-box'>
            <h3> Skills input: {sf.SkillFieldNo}</h3>

            <div className='input-box'>
              <label htmlFor='skillValue'>
                Enter Skills{' '}
                <i>(e.g., JavaScript, React, Problem solving)</i>:
              </label>

              <input
                type='text'
                placeholder='Skill'
                id='skillValue'
                name='skillValue'
                value={sf.skillValue}
                onChange={(e) =>
                  handleSkillChange(sf.id, e.target.name, e.target.value)
                }
              />
            </div>

            <div className='input-box'>
              <label htmlFor='skillLevel'>Select Your Level: </label>
              <select
                id='skillLevel'
                name='skillLevel'
                value={sf.skillLevel}
                onChange={(e) =>
                  handleSkillChange(sf.id, e.target.name, e.target.value)
                }
              >
                <option value='Select Your Level'>
                  --Select Your Level---
                </option>
                <optgroup>
                  <option value='Basic'>Basic</option>
                  <option value='Intermediate'>Intermediate</option>
                  <option value='Advanced'>Advanced</option>
                </optgroup>
              </select>
            </div>

            {skillField.length > 1 && (
              <div className='remove-btn-box'>
                <button
                  className='remove-field-btn'
                  type='button'
                  onClick={() => removeSkill(sf.id)}
                >
                  Remove Skill
                </button>
              </div>
            )}
          </div>
        ))}

        <div className='btn-wrapper'>
          <button
            className='add-field-btn'
            type='button'
            onClick={addSkill}
          >
            Add Skill
          </button>

          {skillField.length > 2 && (
            <button
              className='remove-all-fields-btn'
              type='button'
              onClick={removeAllSkill}
            >
              Remove all Skill
            </button>
          )}
        </div>
      </div>

    </section>
  );
};

export default Skills;
