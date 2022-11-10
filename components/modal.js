import styled from "styled-components";

export default function Modal({ setAttribute, children }) {
  return (
    <BlurBackground onClick={() => setAttribute("")}>
      <ModalBox onClick={(event) => event.stopPropagation()}>
        <h2>Hallo, bitte text</h2>
        {children}
      </ModalBox>
    </BlurBackground>
  );
}

const ModalBox = styled.section`
  width: 90vw;
  padding: 2em;
  background-color: var(--not-black);
  border-radius: 2em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const BlurBackground = styled.div`
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  backdrop-filter: blur(30px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;
