export interface Theme {
  borderRadius: string;
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
    veryLight: string;
    light: string;
    medium: string;
    dark: string;
    veryDark: string;
    single: string;
    double: string;
    triple: string;
    errorFont: string;
    errorBackground: string;
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
