import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useContext } from 'react';
import InputFieldProvider, { InputFieldContext } from './InputFieldContext';

// A fake component just to read the context data
const TestConsumer = () => {
  const [state] = useContext(InputFieldContext);
  return (
    <div data-testid="name-display">{state.personalInfoInput.fullName}</div>
  );
};

describe('InputFieldProvider', () => {
  it('renders children and empty the initial state', () => {
    render(
      <InputFieldProvider>
        <TestConsumer />
      </InputFieldProvider>,
    );
    const displayElement = screen.getByTestId('name-display');

    expect(displayElement.textContent).toBe('JOHN DOE');
  });
});
