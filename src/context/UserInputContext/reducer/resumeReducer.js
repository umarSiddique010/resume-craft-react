import * as types from './resumeTypes';
import { addField, updateField, removeField } from './reducerInputUtils';
import resumeInitialState from './resumeInitialState';

const resumeReducer = (state, action) => {
  switch (action.type) {
    // ===== Single Object Inputs =====
    case types.SET_PERSONAL_INFO_INPUT:
      return {
        ...state,
        personalInfoInput: { ...state.personalInfoInput, ...action.payload },
      };

    case types.SET_PROFILE_SUMMARY_INPUT:
      return { ...state, profileSummaryInput: action.payload };

    case types.SET_ADDRESS_INPUT:
      return {
        ...state,
        addressInput: { ...state.addressInput, ...action.payload },
      };

    case types.SET_WEBSITE_INPUT:
      return {
        ...state,
        websiteInput: { ...state.websiteInput, ...action.payload },
      };

    // =====  More link Fields =====

    case types.ADD_MORE_LINK_FIELD:
      return {
        ...state,
        moreLinkFields: addField(state.moreLinkFields, action.payload),
      };

    case types.UPDATE_MORE_LINK_FIELD:
      return {
        ...state,
        moreLinkFields: updateField(state.moreLinkFields, action.payload),
      };

    case types.REMOVE_MORE_LINK_FIELD:
      return {
        ...state,
        moreLinkFields: removeField(state.moreLinkFields, action.payload),
      };

    case types.REMOVE_ALL_MORE_LINK_FIELD:
      return {
        ...state,
        moreLinkFields: resumeInitialState.moreLinkFields,
      };

    // ===== Work Experience Fields =====
    case types.ADD_WORK_EXPERIENCE_FIELD:
      return {
        ...state,
        workExperienceFields: addField(
          state.workExperienceFields,
          action.payload,
        ),
      };
    case types.UPDATE_WORK_EXPERIENCE_FIELD:
      return {
        ...state,
        workExperienceFields: updateField(
          state.workExperienceFields,
          action.payload,
        ),
      };
    case types.REMOVE_WORK_EXPERIENCE_FIELD:
      return {
        ...state,
        workExperienceFields: removeField(
          state.workExperienceFields,
          action.payload,
        ),
      };
    case types.REMOVE_ALL_WORK_EXPERIENCE_FIELD:
      return {
        ...state,
        workExperienceFields: resumeInitialState.workExperienceFields,
      };

    // ===== Education Fields =====
    case types.ADD_EDUCATION_FIELD:
      return {
        ...state,
        educationFields: addField(state.educationFields, action.payload),
      };
    case types.UPDATE_EDUCATION_FIELD:
      return {
        ...state,
        educationFields: updateField(state.educationFields, action.payload),
      };
    case types.REMOVE_EDUCATION_FIELD:
      return {
        ...state,
        educationFields: removeField(state.educationFields, action.payload),
      };
    case types.REMOVE_ALL_EDUCATION_FIELD:
      return {
        ...state,
        educationFields: resumeInitialState.educationFields,
      };

    // ===== Skill Fields =====
    case types.ADD_SKILL_FIELD:
      return {
        ...state,
        skillFields: addField(state.skillFields, action.payload),
      };
    case types.UPDATE_SKILL_FIELD:
      return {
        ...state,
        skillFields: updateField(state.skillFields, action.payload),
      };
    case types.REMOVE_SKILL_FIELD:
      return {
        ...state,
        skillFields: removeField(state.skillFields, action.payload),
      };
    case types.REMOVE_ALL_SKILL_FIELD:
      return {
        ...state,
        skillFields: resumeInitialState.skillFields,
      };

    // ===== Project Fields =====
    case types.ADD_PROJECT_FIELD:
      return {
        ...state,
        projectFields: addField(state.projectFields, action.payload),
      };
    case types.UPDATE_PROJECT_FIELD:
      return {
        ...state,
        projectFields: updateField(state.projectFields, action.payload),
      };
    case types.REMOVE_PROJECT_FIELD:
      return {
        ...state,
        projectFields: removeField(state.projectFields, action.payload),
      };
    case types.REMOVE_ALL_PROJECT_FIELD:
      return {
        ...state,
        projectFields: resumeInitialState.projectFields,
      };

    // ===== Certification Fields =====
    case types.ADD_CERTIFICATION_FIELD:
      return {
        ...state,
        certificationFields: addField(
          state.certificationFields,
          action.payload,
        ),
      };
    case types.UPDATE_CERTIFICATION_FIELD:
      return {
        ...state,
        certificationFields: updateField(
          state.certificationFields,
          action.payload,
        ),
      };
    case types.REMOVE_CERTIFICATION_FIELD:
      return {
        ...state,
        certificationFields: removeField(
          state.certificationFields,
          action.payload,
        ),
      };
    case types.REMOVE_ALL_CERTIFICATION_FIELD:
      return {
        ...state,
        certificationFields: resumeInitialState.certificationFields,
      };

    // ===== Award Fields =====
    case types.ADD_AWARD_FIELD:
      return {
        ...state,
        awardFields: addField(state.awardFields, action.payload),
      };
    case types.UPDATE_AWARD_FIELD:
      return {
        ...state,
        awardFields: updateField(state.awardFields, action.payload),
      };
    case types.REMOVE_AWARD_FIELD:
      return {
        ...state,
        awardFields: removeField(state.awardFields, action.payload),
      };
    case types.REMOVE_ALL_AWARD_FIELD:
      return {
        ...state,
        awardFields: resumeInitialState.awardFields,
      };

    // ===== Language Fields =====
    case types.ADD_LANGUAGE_FIELD:
      return {
        ...state,
        languageFields: addField(state.languageFields, action.payload),
      };
    case types.UPDATE_LANGUAGE_FIELD:
      return {
        ...state,
        languageFields: updateField(state.languageFields, action.payload),
      };
    case types.REMOVE_LANGUAGE_FIELD:
      return {
        ...state,
        languageFields: removeField(state.languageFields, action.payload),
      };
    case types.REMOVE_ALL_LANGUAGE_FIELD:
      return {
        ...state,
        languageFields: resumeInitialState.languageFields,
      };

    // ===== Hobby Fields =====
    case types.ADD_HOBBY_FIELD:
      return {
        ...state,
        hobbyFields: addField(state.hobbyFields, action.payload),
      };
    case types.UPDATE_HOBBY_FIELD:
      return {
        ...state,
        hobbyFields: updateField(state.hobbyFields, action.payload),
      };
    case types.REMOVE_HOBBY_FIELD:
      return {
        ...state,
        hobbyFields: removeField(state.hobbyFields, action.payload),
      };
    case types.REMOVE_ALL_HOBBY_FIELD:
      return {
        ...state,
        hobbyFields: resumeInitialState.hobbyFields,
      };

    // ===== Skip Field Toggle =====
    case types.SET_SKIP_FIELD:
      return { ...state, skipField: { ...state.skipField, ...action.payload } };

    default:
      return state;
  }
};

export default resumeReducer;
