import { createContext, useReducer } from 'react';
import resumeReducer from './reducer/resumeReducer';
import resumeInitialState from './reducer/resumeInitialState';

export const InputFieldContext = createContext();

const InputFieldProvider = ({ children }) => {
  const [stateField, dispatchField] = useReducer(
    resumeReducer,
    resumeInitialState,
  );

  return (
    <InputFieldContext.Provider value={[stateField, dispatchField]}>
      {children}
    </InputFieldContext.Provider>
  );
};

export default InputFieldProvider;
