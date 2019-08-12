export const breakpoints = {
  mobile: 320,
  phablet: 550,
  tablet: 750,
  desktop: 980
};

export const media = {
  mobile: `@media (min-width: ${breakpoints.mobile}px)`,
  phablet: `@media (min-width: ${breakpoints.phablet}px)`,
  tablet: `@media (min-width: ${breakpoints.tablet}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop}px)`
};

export const fonts = {
  light: {
    fontFamily: "Oswald, sans-serif",
    fontWeight: "300"
  },
  regular: {
    fontFamily: "Oswald, sans-serif",
    fontWeight: "400"
  },
  bold: {
    fontFamily: "Oswald, sans-serif",
    fontWeight: "700"
  }
};

export const colors = {
  primary: "#C99F6C",
  secondary: "#7C4D1C",
  medium: "#dddddd",
  dark: "#aaaaaa",
  error: "#D0021B",
  player1: "#ffffff",
  player2: "#000000",
  hover: "#87CEEB",
  king: "#FFDF00"
};

export const children = child => {
  return `:nth-child(1n) ${child}`;
};

export const appMaxWidth = "320px";

// Defaults
export const defaultButton = {
  ...fonts.regular,
  backgroundColor: colors.dark,
  boxShadow: "0 8px 10px 0 rgba(73,130,163,0.19)",
  color: "#fff",
  fontSize: "16px",
  padding: "11px",
  width: "100%",
  minHeight: "45px"
};

export const defaultInputText = {
  ...fonts.regular,
  backgroundColor: "#fff",
  border: "1px solid #b8b8b8",
  borderRadius: "2px",
  color: "#000",
  fontSize: "14px",
  height: "36px",
  padding: "10px",
  width: "100%"
};

export const defaultFormLabel = {
  display: "block",
  textAlign: "left"
};
