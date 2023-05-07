import styled from 'styled-components';

const ColorRoundCase = styled.div`
  border-radius: 50%;
  background-color: ${(props) => props.inputColor};
  border: 2px var(--not-white) solid;
  height: 2em;
  width: 2em;
  margin: 0.5em 0;
`;

export { ColorRoundCase };
