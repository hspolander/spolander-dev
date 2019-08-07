import { withStyles } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Autocomplete from './Autocomplete';

let theme = createMuiTheme();

const styles = () => ({
  root:{
    display: 'inline-block',
  },
  [theme.breakpoints.up('xs')]: {
    root: {
      margin: '15px 2px',
      width: '95vw',
    },
    resize: {
      fontSize: 30,
    },
  },
  [theme.breakpoints.up('sm')]: {
    root: {
      margin: '15px 5px',
      width: '48vw',
    },
    resize: {
      fontSize: 29,
    },
  },
  [theme.breakpoints.up('md')]: {
    root: {
      margin: '15px 10px',
      width: '35vw',
    },
    resize: {
      fontSize: 23,
    },
  },
  [theme.breakpoints.up('lg')]: {
    root: {
      margin: '15px 12px',
      width: '22vw',
    },
    resize: {
      fontSize: 18,
    },
  },
  [theme.breakpoints.up('xl')]: {
    root: {
      margin: '15px',
      width: '20vw',
    },
    resize: {
      fontSize: 18,
    },
  },
  input: {
    display: 'flex',
  },
  valueContainer: {
    display: 'flex',
    flewWrap: 'wrap',
    zIndex: 1,
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  indicatorsContainer: {
    cursor: 'pointer',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  noOptionsMessage: { padding: theme.spacing(1, 2) },
  loadingMessage: { padding: theme.spacing(1, 2) },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 100,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
});

export default withStyles(styles)(Autocomplete);
