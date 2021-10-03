import { makeStyles } from '@material-ui/core/styles';

export const menuButtonsStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    boxShadow: theme.shadows[2],
    color: theme.palette.common.black,
  },
}));
