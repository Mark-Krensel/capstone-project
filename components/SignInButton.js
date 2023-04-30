import styled from 'styled-components';
import { Button } from './Button';

const SignInButton = styled(Button)`
  font-size: 1.5em;
  background-color: var(--background-primary);
  padding: 0.2em 1em;
  margin: 1em auto;
  border-radius: 1em;
  border: 0.1em var(--text-secondary) solid;
  box-shadow: var(--shadow-elevation);
`;

export { SignInButton };
