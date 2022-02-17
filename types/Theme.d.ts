export interface Theme {
  borderRadius: string;
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  fontFamily: {
    body: string;
    header: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  transition: string;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    content: string;
    background: string;
    okRating: string;
    goodRating: string;
    greatRating: string;
    errorFont: string;
    errorBackground: string;
  };
}
