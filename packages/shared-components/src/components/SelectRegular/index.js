import { withStyles } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import SelectRegular from "./SelectRegular";

const theme = createTheme();

const styles = () => ({
  root: {
    textAlign: "left",
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
  label: {
    top: "-8px",
    left: "13px",
  },
});

export default withStyles(styles)(SelectRegular);
