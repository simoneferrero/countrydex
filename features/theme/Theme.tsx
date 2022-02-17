import type { Theme } from "types/Theme";

import { useState } from "react";

import { useAppSelector } from "app/hooks";
import { isBootyModeSelector } from "./themeSlice";

import { createGlobalStyle, css, ThemeProvider } from "styled-components";

import sfwTheme from "themes/sfw";
import bootyTheme from "themes/booty";

const GlobalStyle = createGlobalStyle`
${({ $height, theme }: { $height: string; theme: Theme }) => css`
  html,
  body {
    background-color: ${theme.colors.primary};
    font-family: ${theme.fontFamily.body};
    height: ${$height};
    margin: 0;
    overflow: hidden;
    padding: 0;
    position: fixed;
    width: 100vw;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    font-family: ${theme.fontFamily.header};
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
`}
`;

const AppTheme = ({ children }: { children: React.ReactNode }) => {
  const [height, setHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight + "px" : "100vh"
  );
  const isBootyMode = useAppSelector(isBootyModeSelector);

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
