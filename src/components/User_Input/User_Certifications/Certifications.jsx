import '../Styles/ComponentsSimilarStyles.css';

const Certifications = ({ certificationField, setCertificationField }) => {
  const handleChange = (id, name, value) => {
    setCertificationField(
      certificationField.map((cf) =>
        cf.id === id ? { ...cf, [name]: value } : cf
      )
    );
  };

  const removeCertification = (id) => {
    setCertificationField(certificationField.filter((cf) => cf.id !== id));
  };

  const removeAllCertification = () => {
    setCertificationField([
      {
        id: Date.now(),
        certificationFieldNo: 1,
        certificationName: '',
        issuingOrganization: '',
        issueDate: '',
        expiryDate: '',
        credential: '',
      },
    ]);
  };

  const addCertification = () => {
    setCertificationField((cf) => [
      ...cf,
      {
        id: Date.now(),
        certificationFieldNo:
          cf.length > 0 ? cf[cf.length - 1].certificationFieldNo + 1 : 0,
        certificationName: '',
        issuingOrganization: '',
        issueDate: '',
        expiryDate: '',
        credential: '',
      },
    ]);
  };

  return (
    <section className='component-section'>
      <h2>Certifications (if any)</h2>
      {certificationField.map((cf) => (
        <div key={cf.id} className='render-box'>
          <h3>Certification Field: {cf.certificationFieldNo}</h3>

          <div className='input-box'>
            <label htmlFor='certificationName'>
              Enter Certification Name:{' '}
            </label>
            <input
              type='text'
              placeholder='Certification Name'
              id='certificationName'
              name='certificationName'
              value={cf.certificationName}
              onChange={(e) =>
                handleChange(cf.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className='input-box'>
            <label htmlFor='issuingOrganization'>
              Enter Issuing Organization:{' '}
            </label>
            <input
              type='text'
              placeholder='Issuing Organization'
              id='issuingOrganization'
              name='issuingOrganization'
              value={cf.issuingOrganization}
              onChange={(e) =>
                handleChange(cf.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className='input-box'>
            <label htmlFor='issueDate'>Enter Issue Date: </label>
            <input
              type='date'
              id='issueDate'
              name='issueDate'
              value={cf.issueDate}
              onChange={(e) =>
                handleChange(cf.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className='input-box'>
            <label htmlFor='expiryDate'>
              Enter Expiry Date (if applicable):{' '}
            </label>
            <input
              type='date'
              id='expiryDate'
              name='expiryDate'
              value={cf.expiryDate}
              onChange={(e) =>
                handleChange(cf.id, e.target.name, e.target.value)
              }
            />
          </div>

          <div className='input-box'>
            <label htmlFor='credential'>Enter Credential ID or Link: </label>
            <input
              type='text'
              placeholder='Credential ID or Link'
              id='credential'
              name='credential'
              value={cf.credential}
              onChange={(e) =>
                handleChange(cf.id, e.target.name, e.target.value)
              }
            />
          </div>

          {certificationField.length > 1 && (
            <div className='remove-btn-box'>
              <button
                className='remove-field-btn'
                type='button'
                onClick={() => removeCertification(cf.id)}
              >
                Remove Certification
              </button>
            </div>
          )}
        </div>
      ))}

      <div className='btn-wrapper'>
        <button
          className='add-field-btn'
          type='button'
          onClick={addCertification}
        >
          Add Certification
        </button>

        {certificationField.length > 2 && (
          <button
            className='remove-all-fields-btn'
            type='button'
            onClick={removeAllCertification}
          >
            Remove all Certification
          </button>
        )}
      </div>
    </section>
  );
};

export default Certifications;
