const Websites = ({ websitesField, setWebsitesField }) => {
  const linkedIn = websitesField.linkedIn;
  const gitHub = websitesField.gitHub;
  const portfolio = websitesField.portfolio;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setWebsitesField((wf) => ({ ...wf, [name]: value }));
  };

  return (
    <section className='component-section'>
      <h2>Website links</h2>

      <div className='input-box'>
        <label htmlFor='linkedIn'>Enter your LinkedIn profile URL: </label>
        <input
          type='url'
          placeholder='LinkedIn profile URL'
          id='linkedIn'
          name='linkedIn'
          value={linkedIn}
          onChange={handleChange}
        />
      </div>

      <div className='input-box'>
        <label htmlFor='gitHub'>Enter your GitHub URL: </label>
        <input
          type='url'
          placeholder='GitHub URL'
          id='gitHub'
          name='gitHub'
          value={gitHub}
          onChange={handleChange}
        />
      </div>

      <div className='input-box'>
        <label htmlFor='portfolio'>Enter your Portfolio Website URL: </label>
        <input
          type='url'
          placeholder='Portfolio Website URL'
          id='portfolio'
          name='portfolio'
          value={portfolio}
          onChange={handleChange}
        />
      </div>
    </section>
  );
};

export default Websites;
