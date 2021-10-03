import { makeStyles } from '@material-ui/core/styles';

export const modalStyles = makeStyles((theme) => ({
  centeredModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '20%',
  },
}));
