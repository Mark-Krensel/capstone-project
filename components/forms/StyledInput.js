import styled from 'styled-components';

const StyledInput = styled.input`
  width: 9em;
  max-height: 2em;
  border-radius: 8px;
  font-size: var(--form-fontSize);
  font-family: 'Noto Sans';
  color: var(--not-black);
  margin: 0.5em 0.5em;
  padding: 0 0.2em;

  ::placeholder {
    text-align: center;
  }
`;

export default StyledInput;
