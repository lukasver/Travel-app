import { makeStyles } from '@material-ui/core/styles';

export const navBarStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    border: '2px solid ' + theme.palette.primary.dark,
    boxShadow: theme.shadows[3],
  },
  divider: {
    marginLeft: 2,
    marginRight: 10,
    height: 40,
    marginTop: 13,
  },
  customPopover: {
    marginTop: 40,
  },
  logoLarge: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: 10,
  },
}));
