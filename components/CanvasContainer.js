import styled from "styled-components";

const CanvasContainer = styled.div`
  max-height: 50vh;

  width: 100%;

  @media screen and (min-width: 800px) {
    width: 800px;
    margin: 0 80%;
  }
`;

export { CanvasContainer };
