/* eslint-disable @next/next/no-html-link-for-pages */
import { useUser } from "@auth0/nextjs-auth0";

import { useAppSelector, useAppDispatch } from "app/hooks";
import { changeTheme, isBootyModeSelector } from "features/theme/themeSlice";

import Switch from "react-switch";
import { FiLogIn, FiLogOut } from "react-icons/fi";

import { useTheme } from "styled-components";

import {
  StyledActionContainer,
  StyledGreeting,
  StyledHeader,
  StyledIconContainer,
  StyledMenuButton,
} from "./styled";

const LOG_IN_URL = "/api/auth/login";
const LOG_OUT_URL = "/api/auth/logout";

const Header = () => {
  const isBootyMode = useAppSelector(isBootyModeSelector);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { user } = useUser();

  const userName = user?.name?.split(" ")?.[0] || user?.nickname;

  const handleChange = () =>
    dispatch(changeTheme(isBootyMode ? "sfw" : "booty"));

  return (
    <StyledHeader>
      <h1>{isBootyMode ? "BOOTYDEX" : "COUNTRYDEX"}</h1>
      {userName ? (
        <StyledActionContainer>
          <Switch
            aria-label="Booty Mode Toggle"
            checked={isBootyMode}
            checkedIcon={<StyledIconContainer>💖</StyledIconContainer>}
            offColor={theme.colors.content}
            offHandleColor={theme.colors.primary}
            onChange={handleChange}
            onColor={theme.colors.tertiary}
            onHandleColor={theme.colors.primary}
            uncheckedIcon={<StyledIconContainer>☀️</StyledIconContainer>}
          />
          <StyledGreeting>
            <p>Hi, {userName}!</p>
            <a href={LOG_OUT_URL}>Log out</a>
          </StyledGreeting>
          <StyledMenuButton aria-label="Log out" href={LOG_OUT_URL}>
            <FiLogOut size={30} />
          </StyledMenuButton>
        </StyledActionContainer>
      ) : (
        <>
          <StyledGreeting>
            <p>Hello, stranger.</p>
            <a href={LOG_IN_URL}>Log in/Sign up</a>
          </StyledGreeting>
          <StyledMenuButton aria-label="Log in/Sign up" href={LOG_IN_URL}>
            <FiLogIn size={30} />
          </StyledMenuButton>
        </>
      )}
    </StyledHeader>
  );
};

export default Header;
