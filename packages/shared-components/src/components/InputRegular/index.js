import { withStyles } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import InputRegular from "./InputRegular";

let theme = createTheme();

const styles = () => ({
  wide: {
    minWidth: "48vw",
  },
  [theme.breakpoints.up("xs")]: {
    root: {
      margin: "15px 2px",
      width: "95vw",
    },
    resize: {
      fontSize: 30,
    },
  },
  [theme.breakpoints.up("sm")]: {
    root: {
      margin: "15px 5px",
      width: "48vw",
    },
    resize: {
      fontSize: 29,
    },
  },
  [theme.breakpoints.up("md")]: {
    root: {
      margin: "15px 10px",
      width: "35vw",
    },
    resize: {
      fontSize: 23,
    },
  },
  [theme.breakpoints.up("lg")]: {
    root: {
      margin: "15px 12px",
      width: "22vw",
    },
    resize: {
      fontSize: 18,
    },
  },
  [theme.breakpoints.up("xl")]: {
    root: {
      margin: "15px",
      width: "20vw",
    },
    resize: {
      fontSize: 18,
    },
  },
});

export default withStyles(styles)(InputRegular);
