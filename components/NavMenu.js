import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function NavMenu() {
  const { pathname } = useRouter();

  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const toggleHamburgerMenu = () => {
    setHamburgerMenu(!hamburgerMenu);
  };

  return (
    <NavWrapper>
      <NavButton onClick={toggleHamburgerMenu}>MENU</NavButton>
      {hamburgerMenu && (
        <BurgerMenu>
          <li>
            <Link href="/" passHref>
              <StyledNavLink active={pathname === "/"}>Home</StyledNavLink>
            </Link>
          </li>
          <li>
            <Link href="/weight" passHref>
              <StyledNavLink active={pathname === "/weight"}>
                Weight
              </StyledNavLink>
            </Link>
          </li>
        </BurgerMenu>
      )}
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  color: var(--not-white);
  position: absolute;
  right: 0;
`;

const NavButton = styled.div`
  background-color: var(--not-black);
  padding: 0.7em;

  cursor: pointer;
`;
const BurgerMenu = styled.ul`
  z-index: 15;

  li {
    background-color: var(--not-black);
    width: 5em;
    height: 1.7em;
    text-align: right;
    padding-right: 0.8em;
  }
  &:hover {
    background-color: var(--background-hover);
  }
`;
const StyledNavLink = styled.a`
  color: var(--not-white);
  text-decoration: ${({ active }) => (active ? "underline" : "none")};
`;
