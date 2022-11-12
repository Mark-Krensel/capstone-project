import Link from "next/link";
import { signOut, useSession, signIn } from "next-auth/react";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import HamburgerMenu from "./icons/XHamburgerMenu";
import SignIn from "./icons/SignIn";
import SignOut from "./icons/SignOut";
import { Button } from "./Button";

export default function NavMenu() {
  const { pathname } = useRouter();
  const { data: session } = useSession();

  const [showHamburgerMenu, setHamburgerMenu] = useState(false);
  const toggleHamburgerMenu = () => {
    setHamburgerMenu(!showHamburgerMenu);
  };

  if (session) {
    return (
      <NavWrapper>
        <NavButton onClick={toggleHamburgerMenu} open={showHamburgerMenu}>
          <HamburgerMenu fontSize="40px" alt="burger menu" />
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
              <SignOutButton
                onClick={() => {
                  signOut(), toggleHamburgerMenu();
                }}
              >
                <StyledSignOut />
                {` sign out`}
              </SignOutButton>
            </li>
          </BurgerMenu>
        )}
      </NavWrapper>
    );
  }
  return (
    <NavWrapper>
      <SignInNavButton>
        <SignIn
          alt="sign in"
          aria-label="sign in"
          fontSize="2.5rem"
          onClick={signIn}
        />
      </SignInNavButton>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  color: var(--not-white);
  position: absolute;
  right: 0;
  background-color: var(--not-black);
  border-bottom-left-radius: 7px;
  border-top-left-radius: 7px;
`;

const NavButton = styled(Button)`
  padding: 0.7em 0.7em;
  max-height: 2.1em;
`;

const SignOutButton = styled(Button)``;

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
    padding-bottom: 0.4em;
    border-top: var(--not-white) 1px solid;
  }
`;
const StyledNavLink = styled.a`
  color: var(--not-white);
  text-decoration: ${({ active }) => (active ? "underline" : "none")};
`;

const SignInNavButton = styled(Button)`
  z-index: 15;
  padding: 0.75em 0.6em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSignOut = styled(SignOut)`
  position: relative;
  right: 0.2em;
  top: 0.1em;
`;
