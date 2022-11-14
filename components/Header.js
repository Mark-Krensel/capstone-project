import styled from "styled-components";
import NavMenu from "./NavMenu";

export default function Header() {
  return (
    <HeaderWrapper>
      <h1>My Baby</h1>
      <NavMenu />
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  background-color: var(--background-secondary);
  display: flex;
  position: fixed;
  padding-left: 0.7em;
  z-index: 10;
  top: 0;
  height: 3.5em;
  width: 100%;
  border-bottom: 1px solid black;
`;
