import { describe, it, expect } from 'vitest';
import resumeReducer from './resumeReducer';
import * as types from './resumeTypes';
import resumeInitialState from './resumeInitialState';

describe('resumeReducer', () => {
  // --- SINGLE OBJECT UPDATES (Personal Info, Address,  Profile Summary and static website input.) ---
  //Personal Info
  it('updates Personal Info correctly', () => {
    const initialState = {
      personalInfoInput: { fullName: 'Old Name', email: 'old@test.com' },
    };

    const action = {
      type: types.SET_PERSONAL_INFO_INPUT,
      payload: { fullName: 'New Name' },
    };

    const newState = resumeReducer(initialState, action);

    expect(newState.personalInfoInput).toEqual({
      fullName: 'New Name',
      email: 'old@test.com',
    });
  });

  // --- Profile Summary ---
  it('updates Profile Summary string directly', () => {
    const initialState = { profileSummaryInput: 'Old Summary' };
    const action = {
      type: types.SET_PROFILE_SUMMARY_INPUT,
      payload: 'New Summary',
    };

    const newState = resumeReducer(initialState, action);
    expect(newState.profileSummaryInput).toBe('New Summary');
  });

  // --- Address Input ---
  it('updates Address fields correctly', () => {
    const initialState = {
      addressInput: { city: '', country: '' },
    };
    const action = {
      type: types.SET_ADDRESS_INPUT,
      payload: { city: 'New York', country: 'USA' },
    };

    const newState = resumeReducer(initialState, action);

    expect(newState.addressInput.city).toBe('New York');
    expect(newState.addressInput.country).toBe('USA');
  });

  // ---  Website Input (static) ---
  it('updates Website Links (GitHub, LinkedIn)', () => {
    const initialState = {
      websiteInput: { gitHub: '', linkedIn: '' },
    };

    const action = {
      type: types.SET_WEBSITE_INPUT,
      payload: { gitHub: 'github.com/myprofile' },
    };

    const newState = resumeReducer(initialState, action);

    expect(newState.websiteInput.gitHub).toBe('github.com/myprofile');
    expect(newState.websiteInput.linkedIn).toBe(''); // Should remain empty
  });

  // --- ARRAY FIELD LOGIC ---

  // Work Experience field
  it('adds a new Work Experience field', () => {
    const initialState = {
      workExperienceFields: [{ id: '1', jobTitle: 'Job 1' }],
    };

    // Mocking the payload needed for addField
    const newJob = { jobTitle: 'Job 2' };

    const action = {
      type: types.ADD_WORK_EXPERIENCE_FIELD,
      payload: newJob,
    };

    const newState = resumeReducer(initialState, action);

    // Should now have 2 items
    expect(newState.workExperienceFields).toHaveLength(2);
    // The last item should match our payload (mostly)
    expect(newState.workExperienceFields[1]).toMatchObject(newJob);
  });

  it('updates a specific Work Experience field by ID', () => {
    const initialState = {
      workExperienceFields: [
        { id: '1', jobTitle: 'Old Title' },
        { id: '2', jobTitle: 'Other Job' },
      ],
    };

    const action = {
      type: types.UPDATE_WORK_EXPERIENCE_FIELD,
      payload: { id: '1', jobTitle: 'New Title' },
    };

    const newState = resumeReducer(initialState, action);

    expect(newState.workExperienceFields[0].jobTitle).toBe('New Title');
    expect(newState.workExperienceFields[1].jobTitle).toBe('Other Job');
  });

  it('removes a specific Work Experience field by ID', () => {
    const initialState = {
      workExperienceFields: [
        { id: '1', jobTitle: 'Job 1' },
        { id: '2', jobTitle: 'Job 2' },
      ],
    };

    const action = {
      type: types.REMOVE_WORK_EXPERIENCE_FIELD,
      payload: '1',
    };

    const newState = resumeReducer(initialState, action);

    expect(newState.workExperienceFields).toHaveLength(1);
    expect(newState.workExperienceFields[0].id).toBe('2');
  });

  it('resets Work Experience to Initial State (Remove All)', () => {
    // State with custom data
    const initialState = {
      workExperienceFields: [
        { id: '999', jobTitle: 'Custom Job 1' },
        { id: '888', jobTitle: 'Custom Job 2' },
      ],
    };

    const action = {
      type: types.REMOVE_ALL_WORK_EXPERIENCE_FIELD,
    };

    const newState = resumeReducer(initialState, action);

    // Should revert exactly to what is in resumeInitialState
    expect(newState.workExperienceFields).toEqual(
      resumeInitialState.workExperienceFields,
    );
  });

  // --- SKIP FIELDS ---
  it('toggles Skip Fields correctly', () => {
    const initialState = {
      skipField: { educationFields: false, skillFields: false },
    };

    const action = {
      type: types.SET_SKIP_FIELD,
      payload: { educationFields: true },
    };

    const newState = resumeReducer(initialState, action);

    expect(newState.skipField.educationFields).toBe(true);
    expect(newState.skipField.skillFields).toBe(false);
  });

  // --- DEFAULT CASE ---
  it('returns current state for unknown action types', () => {
    const initialState = { foo: 'bar' };
    const action = { type: 'UNKNOWN_ACTION' };

    const newState = resumeReducer(initialState, action);
    expect(newState).toBe(initialState);
  });

  // --- Education Field ---
  it('adds and removes Education fields', () => {
    const initialState = {
      educationFields: [],
    };

    const newEdu = {
      degreeName: 'B.Sc Computer Science',
      universityCollege: 'MIT',
    };

    const addAction = {
      type: types.ADD_EDUCATION_FIELD,
      payload: newEdu,
    };
    const stateAfterAdd = resumeReducer(initialState, addAction);

    expect(stateAfterAdd.educationFields).toHaveLength(1);
    expect(stateAfterAdd.educationFields[0].degreeName).toBe(
      'B.Sc Computer Science',
    );

    // Test REMOVE (using the ID generated from the add)
    const idToRemove = stateAfterAdd.educationFields[0].id;
    const removeAction = {
      type: types.REMOVE_EDUCATION_FIELD,
      payload: idToRemove,
    };
    const stateAfterRemove = resumeReducer(stateAfterAdd, removeAction);

    expect(stateAfterRemove.educationFields).toHaveLength(0);
  });

  // --- Skill Field ---
  it('updates Skill fields correctly', () => {
    const initialState = {
      skillFields: [{ id: '101', skill: 'Java', skillLevel: 'Basic' }],
    };

    const updateAction = {
      type: types.UPDATE_SKILL_FIELD,
      payload: { id: '101', skillLevel: 'Advanced' },
    };

    const newState = resumeReducer(initialState, updateAction);

    expect(newState.skillFields[0].skill).toBe('Java');
    expect(newState.skillFields[0].skillLevel).toBe('Advanced');
  });

  // --- More Link Field ---
  it('handles More Link fields (Add & Reset)', () => {
    const initialState = {
      moreLinkFields: [{ id: '1', link: 'google.com' }],
    };

    const addAction = {
      type: types.ADD_MORE_LINK_FIELD,
      payload: { link: 'github.com' },
    };
    const stateAfterAdd = resumeReducer(initialState, addAction);
    expect(stateAfterAdd.moreLinkFields).toHaveLength(2);

    // 2. Test REMOVE ALL (Reset)
    const resetAction = {
      type: types.REMOVE_ALL_MORE_LINK_FIELD,
    };
    const stateAfterReset = resumeReducer(stateAfterAdd, resetAction);

    // Should revert to the default state defined in resumeInitialState
    expect(stateAfterReset.moreLinkFields).toEqual(
      resumeInitialState.moreLinkFields,
    );
  });

  // --- Project Field ---
  it('adds, updates, and removes Project fields', () => {
    const initialState = { projectFields: [] };

    const addAction = {
      type: types.ADD_PROJECT_FIELD,
      payload: { projectName: 'Portfolio Website' },
    };
    const stateAfterAdd = resumeReducer(initialState, addAction);
    expect(stateAfterAdd.projectFields).toHaveLength(1);
    expect(stateAfterAdd.projectFields[0].projectName).toBe(
      'Portfolio Website',
    );

    // Test UPDATE
    const id = stateAfterAdd.projectFields[0].id;
    const updateAction = {
      type: types.UPDATE_PROJECT_FIELD,
      payload: { id, description: 'Built with React' },
    };
    const stateAfterUpdate = resumeReducer(stateAfterAdd, updateAction);
    expect(stateAfterUpdate.projectFields[0].description).toBe(
      'Built with React',
    );

    // Test REMOVE
    const removeAction = {
      type: types.REMOVE_PROJECT_FIELD,
      payload: id,
    };
    const finalState = resumeReducer(stateAfterUpdate, removeAction);
    expect(finalState.projectFields).toHaveLength(0);
  });

  // --- Certification Field ---
  it('handles Certification fields', () => {
    const initialState = { certificationFields: [] };

    const addAction = {
      type: types.ADD_CERTIFICATION_FIELD,
      payload: { certificationName: 'AWS Certified' },
    };
    const newState = resumeReducer(initialState, addAction);

    expect(newState.certificationFields).toHaveLength(1);
    expect(newState.certificationFields[0].certificationName).toBe(
      'AWS Certified',
    );

    // Test REMOVE ALL
    const resetAction = { type: types.REMOVE_ALL_CERTIFICATION_FIELD };
    const resetState = resumeReducer(newState, resetAction);
    expect(resetState.certificationFields).toEqual(
      resumeInitialState.certificationFields,
    );
  });

  // --- Award Field ---
  it('updates Award fields', () => {
    const initialState = {
      awardFields: [{ id: '1', awardName: 'Best Employee' }],
    };

    const updateAction = {
      type: types.UPDATE_AWARD_FIELD,
      payload: { id: '1', awardName: 'Best Manager' },
    };

    const newState = resumeReducer(initialState, updateAction);
    expect(newState.awardFields[0].awardName).toBe('Best Manager');
  });

  // --- Language Field ---
  it('adds and removes Language fields', () => {
    const initialState = { languageFields: [] };

    const addAction = {
      type: types.ADD_LANGUAGE_FIELD,
      payload: { language: 'Spanish', proficiency: 'Fluent' },
    };
    const stateAfterAdd = resumeReducer(initialState, addAction);
    expect(stateAfterAdd.languageFields[0].language).toBe('Spanish');

    // Test REMOVE
    const id = stateAfterAdd.languageFields[0].id;
    const removeAction = {
      type: types.REMOVE_LANGUAGE_FIELD,
      payload: id,
    };
    const finalState = resumeReducer(stateAfterAdd, removeAction);
    expect(finalState.languageFields).toHaveLength(0);
  });

  // --- Hobby Field ---
  it('handles Hobby fields', () => {
    const initialState = { hobbyFields: [] };

    const addAction = {
      type: types.ADD_HOBBY_FIELD,
      payload: { hobby: 'Chess' },
    };
    const stateAfterAdd = resumeReducer(initialState, addAction);
    expect(stateAfterAdd.hobbyFields[0].hobby).toBe('Chess');

    // Test REMOVE ALL
    const resetAction = { type: types.REMOVE_ALL_HOBBY_FIELD };
    const resetState = resumeReducer(stateAfterAdd, resetAction);
    expect(resetState.hobbyFields).toEqual(resumeInitialState.hobbyFields);
  });
});
