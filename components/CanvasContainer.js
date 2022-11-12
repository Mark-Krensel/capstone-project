import styled from "styled-components";

const CanvasContainer = styled.div`
  max-height: 50vh;
  width: 100%;
  backdrop-filter: blur(10px);
  display: block;
  margin: -15px auto 0.5em auto;
  border-bottom: 1px solid var(--text-primary);
  @media (min-width: 840px) {
    width: 800px;
    margin: 1em 100%;
  }
`;

export { CanvasContainer };
