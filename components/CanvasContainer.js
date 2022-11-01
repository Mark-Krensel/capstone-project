import styled from "styled-components";

const CanvasContainer = styled.div`
  max-height: 50vh;
  width: 95vw;
  backdrop-filter: blur(10px);
  display: block;
  margin: 3.5em auto 0 auto;
  border-bottom: 1px solid var(--text-primary);
  @media (min-width: 840px) {
    width: 800px;
  }
`;

export { CanvasContainer };
