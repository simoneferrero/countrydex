import type { Theme } from "types/Theme";

import baseTheme from "./base";

const bootyTheme: Theme = {
  ...baseTheme,
  colors: {
    "very-light": "#e0c8d8",
    light: "#db008f",
    medium: "#161c20",
    dark: "#5c003c",
    "very-dark": "#8f005d",
    single: "#dfb667",
    double: "#a0a0a0",
    triple: "#f2d732",
  },
};

export default bootyTheme;
