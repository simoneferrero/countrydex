export interface Theme {
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  sizing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  transition: string;
  colors: {
    "very-light": string;
    light: string;
    medium: string;
    dark: string;
    "very-dark": string;
    single: string;
    double: string;
    triple: string;
  };
}

/*
primary
secondary
font
background
heading
error
errorBackground
*/
