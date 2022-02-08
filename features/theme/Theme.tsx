import { useAppSelector } from "app/hooks";
import { selectIsBootyMode } from "./themeSlice";

import { createGlobalStyle, ThemeProvider } from "styled-components";

import sfwTheme from "themes/sfw";
import bootyTheme from "themes/booty";

const GlobalStyle = createGlobalStyle`
  html,
  body {
    background-color: ${({ theme }) => theme.colors["very-light"]};
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    height: 100vh;
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: fixed;
    width: 100vw;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: inherit;
    font-style: italic;
    font-weight: 700;
    text-decoration: none;
  }
`;

const AppTheme = ({ children }: { children: React.ReactNode }) => {
  const isBootyMode = useAppSelector(selectIsBootyMode);

  return (
    <ThemeProvider theme={isBootyMode ? bootyTheme : sfwTheme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
