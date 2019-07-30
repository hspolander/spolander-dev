import { withStyles } from '@material-ui/styles';
import InputRegular from './InputRegular';

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
});

export default withStyles(styles)(InputRegular);
