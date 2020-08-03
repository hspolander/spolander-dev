import palette from "./palette";
import muiOverrides from "./muiOverrides";
import breakpoints from "./breakpoints";

const theme = {
  breakpoints,
};

const lightTheme = {
  ...theme,
  palette: palette.light,
  overrides: muiOverrides.lightTheme,
};
const darkTheme = {
  ...theme,
  palette: palette.dark,
  overrides: muiOverrides.darkTheme,
};

export { lightTheme, darkTheme };
