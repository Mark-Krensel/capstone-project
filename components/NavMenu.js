import styled from "styled-components";

export default function NavMenu() {
  return <NavWrapper></NavWrapper>;
}

const NavWrapper = styled.nav`
  background-color: var(--not-black);
  li {
    color: var(--not-white);
  }
`;
