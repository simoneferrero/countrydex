/* eslint-disable @next/next/no-html-link-for-pages */
import Switch from "react-switch";

import { useAppSelector, useAppDispatch } from "app/hooks";
import { changeTheme, selectIsBootyMode } from "features/theme/themeSlice";

import styled, { useTheme } from "styled-components";

const StyledHeader = styled.header`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors["very-light"]};
  display: flex;
  height: 4rem;
  justify-content: space-between;
  left: 0;
  padding: 0 2rem;
  position: fixed;
  top: 0;
  transition: background-color 0.3s ease-in-out;
  width: 100%;
  z-index: 1;
`;

const StyledUserContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const StyledIcon = styled.span`
  position: absolute;
  top: 2px;
  ${({ isLeft }: { isLeft?: boolean }) =>
    isLeft ? "left: 4px;" : "right: 4px;"}
`;

const StyledAuthBox = styled.div`
  text-align: right;

  p {
    margin: 0;
    margin-left: 2rem;
  }
`;

interface Props {
  userName?: string | null;
}

const Header = ({ userName }: Props) => {
  const isBootyMode = useAppSelector(selectIsBootyMode);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const handleChange = () =>
    dispatch(changeTheme(isBootyMode ? "sfw" : "booty"));

  return (
    <StyledHeader>
      <h1>{isBootyMode ? "BOOTYDEX" : "COUNTRYDEX"}</h1>
      {userName ? (
        <StyledUserContainer>
          <Switch
            aria-label="Booty Mode Toggle"
            checked={isBootyMode}
            checkedIcon={<StyledIcon isLeft>💖</StyledIcon>}
            offColor={theme.colors.medium}
            offHandleColor={theme.colors["very-light"]}
            onChange={handleChange}
            onColor={theme.colors.light}
            onHandleColor={theme.colors["very-light"]}
            uncheckedIcon={<StyledIcon>☀️</StyledIcon>}
          />
          <StyledAuthBox>
            <p>Welcome, {userName}.</p>
            <a href="/api/auth/logout">Logout</a>
          </StyledAuthBox>
        </StyledUserContainer>
      ) : (
        <StyledAuthBox>
          <p>Hello, stranger.</p>
          <a href="/api/auth/login">Login</a>{" "}
        </StyledAuthBox>
      )}
    </StyledHeader>
  );
};

export default Header;
