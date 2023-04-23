import styled from 'styled-components';

const CardContainer = styled.div`
  position: relative;
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1em;
  margin: 3.5em auto 0 auto;
  /* max-height: calc(100vh - 3.5em); */
  max-width: 1250px;
  overflow-y: scroll;
`;

export { CardContainer };
