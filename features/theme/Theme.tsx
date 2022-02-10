import { useState } from "react";

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
    height: ${({ $height }: { $height: string }) => $height};
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
  const [height, setHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight + "px" : "100vh"
  );
  const isBootyMode = useAppSelector(selectIsBootyMode);

  if (typeof window !== "undefined") {
    window.onresize = () => setHeight(window.innerHeight + "px");
  }

  return (
    <ThemeProvider theme={isBootyMode ? bootyTheme : sfwTheme}>
      <GlobalStyle $height={height} />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
