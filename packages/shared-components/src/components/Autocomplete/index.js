import { withStyles } from '@material-ui/styles';
import Autocomplete from './Autocomplete';

const styles = theme => ({
  [theme.breakpoints.up('xs')]: {
    root: {
      width: '95vw',
    },
    resize: {
      fontSize: 30,
    },
  },
  [theme.breakpoints.up('sm')]: {
    root: {
      width: '56vw',
    },
    resize: {
      fontSize: 29,
    },
  },
  [theme.breakpoints.up('md')]: {
    root: {
      width: '35vw',
    },
    resize: {
      fontSize: 23,
    },
  },
  [theme.breakpoints.up('lg')]: {
    root: {
      width: '22vw',
    },
    resize: {
      fontSize: 18,
    },
  },
  [theme.breakpoints.up('xl')]: {
    root: {
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
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
});

export default withStyles(styles)(Autocomplete);
