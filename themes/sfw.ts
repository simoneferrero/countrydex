import type { Theme } from "types/Theme";

import baseTheme from "./base";

const sfwTheme: Theme = {
  ...baseTheme,
  colors: {
    veryLight: "#e1d8c8",
    light: "#dcba82",
    medium: "#a88e63",
    dark: "#5c5852",
    veryDark: "#5c4d36",
    single: "#dfb667",
    double: "#a0a0a0",
    triple: "#f2d732",
    errorFont: "#fff",
    errorBackground: "#f44336",
  },
};

export default sfwTheme;
