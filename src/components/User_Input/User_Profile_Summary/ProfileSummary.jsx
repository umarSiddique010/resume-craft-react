import '../Styles/ComponentsSimilarStyles.css';

const SummaryProfile = ({ careerSummaryInput, setCareerSummaryInput }) => {
  return (
    <section className='component-section'>
      <h2>A short bio or career summary</h2>

      <div className='input-box'>
        <label htmlFor='SummaryProfile'>
          Enter A short bio or career summary highlighting key skills and
          experience between 30 words to 100 words:{' '}
        </label>
        <textarea
          placeholder='Summary/Bio'
          minLength='150'
          maxLength='600'
          id='SummaryProfile'
          name='SummaryProfile'
          value={careerSummaryInput}
          onChange={(e) => setCareerSummaryInput(e.target.value)}
        />
      </div>
    </section>
  );
};

export default SummaryProfile;
