import type { Theme } from "types/Theme";

import baseTheme from "./base";

const bootyTheme: Theme = {
  ...baseTheme,
  colors: {
    primary: "#ffeee6",
    secondary: "#330026",
    tertiary: "#b30086",
    content: "#990073",
    background: "#66004d",
    okRating: "#e600ac",
    goodRating: "#e600ac",
    greatRating: "#ff80df",
    errorFont: "#fff",
    errorBackground: "#f44336",
  },
  fontFamily: {
    body: '"Trebuchet MS", Helvetica, Verdana, sans-serif',
    header: "Arial, Helvetica, Verdana, sans-serif",
  },
};

export default bootyTheme;
