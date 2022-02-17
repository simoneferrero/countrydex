import type { Theme } from "types/Theme";

import baseTheme from "./base";

const sfwTheme: Theme = {
  ...baseTheme,
  colors: {
    primary: "#ffeee6",
    secondary: "#331100",
    tertiary: "#802b00",
    content: "#b33c00",
    background: "#662200",
    okRating: "#ff661a",
    goodRating: "#ff884d",
    greatRating: "#ffaa80",
    errorFont: "#fff",
    errorBackground: "#f44336",
  },
  fontFamily: {
    body: '"Trebuchet MS", Helvetica, Verdana, sans-serif',
    header: "Arial, Helvetica, Verdana, sans-serif",
  },
};

export default sfwTheme;
