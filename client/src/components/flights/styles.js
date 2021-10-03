import { makeStyles } from '@material-ui/core/styles';

export const flightStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
    fontSize: 14,
  },
  collapseButton: {
    marginTop: 4,
    borderRadius: '8px !important',
    boxShadow: theme.shadows[1] + ' !important',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    '& > *': {
      fontSize: '12px !important',
    },
  },
  verticalDivider: {
    backgroundColor: theme.palette.primary.light,
  },
  tableHeader: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));
