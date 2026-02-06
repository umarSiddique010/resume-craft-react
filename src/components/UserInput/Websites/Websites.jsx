import commonStyles from '../Styles/CommonInputStyles.module.css';
import {
  SET_WEBSITE_INPUT,
  ADD_MORE_LINK_FIELD,
  UPDATE_MORE_LINK_FIELD,
  REMOVE_MORE_LINK_FIELD,
  REMOVE_ALL_MORE_LINK_FIELD,
} from '../../../context/UserInputContext/reducer/resumeTypes';
import { useContext } from 'react';
import { InputFieldContext } from '../../../context/UserInputContext/InputFieldContext';

const Websites = () => {
  const [stateField, dispatchField] = useContext(InputFieldContext);

  const handleSetWebsiteChange = (e) => {
    const { name, value } = e.target;

    dispatchField({
      type: SET_WEBSITE_INPUT,
      payload: {
        [name]: value,
      },
    });
  };

  const handleMoreLinkChange = (e, id) => {
    const { name, value } = e.target;
    dispatchField({
      type: UPDATE_MORE_LINK_FIELD,
      payload: { id, [name]: value },
    });
  };

  const handleAddMoreLink = () => {
    dispatchField({
      type: ADD_MORE_LINK_FIELD,
      payload: {
        link: '',
      },
    });
  };

  const handleRemoveMoreLink = (id) => {
    dispatchField({ type: REMOVE_MORE_LINK_FIELD, payload: id });
  };

  const handleAllRemoveMoreLinks = () => {
    dispatchField({ type: REMOVE_ALL_MORE_LINK_FIELD });
  };

  return (
    <section className={commonStyles.componentSection}>
      <h2 className={commonStyles.componentHeading}>Website links</h2>

      <div className={commonStyles.inputBox}>
        <label className={commonStyles.inputLabel} htmlFor="linkedIn">
          Enter your LinkedIn profile URL:{' '}
        </label>
        <input
          className={commonStyles.inputField}
          type="url"
          placeholder="LinkedIn profile URL"
          id="linkedIn"
          name="linkedIn"
          value={stateField.websiteInput.linkedIn}
          onChange={handleSetWebsiteChange}
        />
      </div>

      <div className={commonStyles.inputBox}>
        <label className={commonStyles.inputLabel} htmlFor="gitHub">
          Enter your GitHub URL:{' '}
        </label>
        <input
          className={commonStyles.inputField}
          type="url"
          placeholder="GitHub URL"
          id="gitHub"
          name="gitHub"
          value={stateField.websiteInput.gitHub}
          onChange={handleSetWebsiteChange}
        />
      </div>

      <div className={commonStyles.inputBox}>
        <label className={commonStyles.inputLabel} htmlFor="portfolio">
          Enter your Portfolio Website URL:{' '}
        </label>
        <input
          className={commonStyles.inputField}
          type="url"
          placeholder="Portfolio Website URL"
          id="portfolio"
          name="portfolio"
          value={stateField.websiteInput.portfolio}
          onChange={handleSetWebsiteChange}
        />
      </div>

      {stateField.moreLinkFields.map((field) => (
        <div key={field.id} className={commonStyles.renderBox}>
          <h3 className={commonStyles.itemNumberHeading}>
            URL #{field.itemNumber}
          </h3>
          <div className={commonStyles.inputBox}>
            <label
              className={commonStyles.inputLabel}
              htmlFor={`link-${field.id}`}
            >
              Enter a Website URL (if any):{' '}
            </label>
            <input
              className={commonStyles.inputField}
              type="url"
              placeholder="Website URL"
              id={`link-${field.id}`}
              name="link"
              value={field.link}
              onChange={(e) => handleMoreLinkChange(e, field.id)}
            />
          </div>
          {stateField.moreLinkFields.length > 1 && (
            <div className={commonStyles.removeBtnBox}>
              {' '}
              <button
                className={commonStyles.removeFieldBtn}
                type="button"
                onClick={() => handleRemoveMoreLink(field.id)}
              >
                Remove Extra URL
              </button>
            </div>
          )}
        </div>
      ))}

      <div className={commonStyles.btnWrapper}>
        <button
          className={commonStyles.addFieldBtn}
          type="button"
          onClick={handleAddMoreLink}
        >
          Add URL
        </button>

        {stateField.moreLinkFields.length > 2 && (
          <button
            className={commonStyles.removeAllFieldsBtn}
            type="button"
            onClick={handleAllRemoveMoreLinks}
          >
            Remove all Extra URL
          </button>
        )}
      </div>
    </section>
  );
};

export default Websites;
