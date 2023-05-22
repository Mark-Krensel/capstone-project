import Link from 'next/link';
import { signOut, useSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { SignIn, SignOut, HamburgerMenu } from './icons';
import { Button, Settings } from './';

export default function NavMenu() {
  const { pathname } = useRouter();
  const { data: session } = useSession();

  const [showHamburgerMenu, setHamburgerMenu] = useState(false);
  const toggleHamburgerMenu = () => {
    setHamburgerMenu(!showHamburgerMenu);
  };

  const [settingsIsOpen, setSettingsIsOpen] = useState(false);

  const openDialog = () => {
    setSettingsIsOpen(true);
  };

  const closeDialog = () => {
    setSettingsIsOpen(false);
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
                <StyledNavLink active={pathname === '/'} onClick={toggleHamburgerMenu}>
                  Home
                </StyledNavLink>
              </Link>
            </li>
            <li>
              <Link href="/weight" passHref>
                <StyledNavLink active={pathname === '/weight'} onClick={toggleHamburgerMenu}>
                  Weight
                </StyledNavLink>
              </Link>
            </li>
            <li>
              <Link href="/height" passHref>
                <StyledNavLink active={pathname === '/height'} onClick={toggleHamburgerMenu}>
                  Height
                </StyledNavLink>
              </Link>
            </li>
            <li>
              <Link href="/feedingtime" passHref>
                <StyledNavLink active={pathname === '/feedingtime'} onClick={toggleHamburgerMenu}>
                  Feeding
                </StyledNavLink>
              </Link>
            </li>
            <li>
              <Link href="" passHref>
                <StyledNavLink
                  // active={pathname === ''}
                  onClick={() => {
                    openDialog(), toggleHamburgerMenu();
                  }}
                >
                  Settings
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
        {settingsIsOpen && <Settings closeDialog={closeDialog} />}
      </NavWrapper>
    );
  }
  return (
    <NavWrapper>
      <SignInNavButton>
        <SignIn alt="sign in" aria-label="sign in" fontSize="2.5rem" onClick={signIn} />
      </SignInNavButton>
    </NavWrapper>
  );
}

const NavWrapper = styled.nav`
  color: var(--not-white);
  position: absolute;
  right: 0;
  background-color: var(--not-black);
  border-bottom-left-radius: 9px;
  border-top-left-radius: 9px;
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
    padding: 0.2em 0.3em;
    margin: 0 0.5em;

    &:hover {
      background-color: var(--background-hover);
    }
  }
  li:last-child {
    border-bottom-left-radius: 9px;
    border-bottom-right-radius: 9px;
    padding-top: 0.2em;
    padding-bottom: 0.4em;
    border-top: var(--not-white) 1px solid;
  }
`;
const StyledNavLink = styled.a`
  color: var(--not-white);
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
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
