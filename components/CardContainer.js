import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1em;
  margin-top: 3.5em;
  max-height: calc(100vh - 3.5em);
  overflow-y: scroll;
`;

export { CardContainer };
