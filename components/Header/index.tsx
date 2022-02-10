/* eslint-disable @next/next/no-html-link-for-pages */
import { useUser } from "@auth0/nextjs-auth0";

import { useAppSelector, useAppDispatch } from "app/hooks";
import { changeTheme, selectIsBootyMode } from "features/theme/themeSlice";

import Switch from "react-switch";
import ReactTooltip from "react-tooltip";
import { GiHamburgerMenu } from "react-icons/gi";

import { useTheme } from "styled-components";

import {
  StyledActionContainer,
  StyledGreeting,
  StyledHeader,
  StyledIconContainer,
  StyledMenuButton,
  StyledGreetingContainer,
} from "./styled";

const Header = () => {
  const isBootyMode = useAppSelector(selectIsBootyMode);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { user } = useUser();

  const userName = user?.name?.split(" ")?.[0] || user?.nickname;

  const handleChange = () =>
    dispatch(changeTheme(isBootyMode ? "sfw" : "booty"));

  const Greeting = () => (
    <StyledGreeting>
      <p>Hi, {userName}!</p>
      <a href="/api/auth/logout">Logout</a>
    </StyledGreeting>
  );

  return (
    <StyledHeader>
      <h1>{isBootyMode ? "BOOTYDEX" : "COUNTRYDEX"}</h1>
      {userName ? (
        <StyledActionContainer>
          <Switch
            aria-label="Booty Mode Toggle"
            checked={isBootyMode}
            checkedIcon={<StyledIconContainer>💖</StyledIconContainer>}
            offColor={theme.colors.medium}
            offHandleColor={theme.colors["very-light"]}
            onChange={handleChange}
            onColor={theme.colors.light}
            onHandleColor={theme.colors["very-light"]}
            uncheckedIcon={<StyledIconContainer>☀️</StyledIconContainer>}
          />
          <StyledGreetingContainer>
            <Greeting />
          </StyledGreetingContainer>
          <StyledMenuButton
            aria-label="Toggle User Menu"
            data-event="click"
            data-for="userMenu"
            data-tip
          >
            <GiHamburgerMenu size={30} />
          </StyledMenuButton>
          <ReactTooltip
            backgroundColor={theme.colors.medium}
            clickable
            effect="solid"
            id="userMenu"
            place="bottom"
          >
            <Greeting />
          </ReactTooltip>
        </StyledActionContainer>
      ) : (
        <StyledGreeting>
          <p>Hello, stranger.</p>
          <a href="/api/auth/login">Login</a>{" "}
        </StyledGreeting>
      )}
    </StyledHeader>
  );
};

export default Header;
