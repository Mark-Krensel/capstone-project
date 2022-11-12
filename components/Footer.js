import styled from "styled-components";
import AddMenu from "./AddMenu";

export default function Footer() {
  return (
    <FooterWrapper>
      <AddMenu />
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 10;
  bottom: 2em;
  width: 100%;
  margin: 0 auto;
`;
