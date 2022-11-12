import styled from "styled-components";

export default function Modal({ setShownAttribute, children }) {
  return (
    <BlurBackground onClick={() => setShownAttribute("")}>
      <ModalBox onClick={(event) => event.stopPropagation()}>
        {children}
      </ModalBox>
    </BlurBackground>
  );
}

const ModalBox = styled.section`
  width: 90vw;
  padding: 1em;
  background-color: var(--not-white);
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
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;
