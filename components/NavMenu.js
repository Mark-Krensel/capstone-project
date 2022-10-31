import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import HamburgerMenu from "./icons/HamburgerMenu";

export default function NavMenu() {
  const { pathname } = useRouter();

  const [showHamburgerMenu, setHamburgerMenu] = useState(false);
  const toggleHamburgerMenu = () => {
    setHamburgerMenu(!showHamburgerMenu);
  };

  return (
    <NavWrapper>
      <NavButton onClick={toggleHamburgerMenu} open={showHamburgerMenu}>
        <HamburgerMenu height={28} width={28} alt="burger menu" />
      </NavButton>
      {showHamburgerMenu && (
        <BurgerMenu>
          <li>
            <Link href="/" passHref>
              <StyledNavLink
                active={pathname === "/"}
                onClick={toggleHamburgerMenu}
              >
                Home
              </StyledNavLink>
            </Link>
          </li>
          <li>
            <Link href="/weight" passHref>
              <StyledNavLink
                active={pathname === "/weight"}
                onClick={toggleHamburgerMenu}
              >
                Weight
              </StyledNavLink>
            </Link>
          </li>
          <li>
            <Link href="/addData" passHref>
              <StyledNavLink
                active={pathname === "/addData"}
                onClick={toggleHamburgerMenu}
              >
                New Data
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
  border-bottom-left-radius: ${(props) => (props.open ? "0" : "7px")};

  border-top-left-radius: 7px;

  cursor: pointer;
`;
const BurgerMenu = styled.ul`
  z-index: 15;
  border-radius: 5px;

  li {
    background-color: var(--not-black);
    width: auto;
    height: auto;
    text-align: right;
    padding: 0.2em 0.8em;

    &:hover {
      background-color: var(--background-hover);
    }
  }
  li:last-child {
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
  }
`;
const StyledNavLink = styled.a`
  color: var(--not-white);
  text-decoration: ${({ active }) => (active ? "underline" : "none")};
`;
