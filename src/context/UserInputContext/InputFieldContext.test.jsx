import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useContext } from 'react';
import InputFieldProvider, { InputFieldContext } from './InputFieldContext';
import resumeInitialState from './reducer/resumeInitialState';

// A fake component just to read the context data
const TestConsumer = () => {
  const [state] = useContext(InputFieldContext);
  return <div>{state.personalInfoInput.fullName}</div>;
};

describe('InputFieldProvider', () => {
  it('renders children and provides the initial state', () => {
    render(
      <InputFieldProvider>
        <TestConsumer />
      </InputFieldProvider>,
    );

    expect(
      screen.getByText(resumeInitialState.personalInfoInput.fullName),
    ).toBeInTheDocument();
  });
});
