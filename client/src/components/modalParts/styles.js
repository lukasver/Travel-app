import { makeStyles } from '@material-ui/core/styles';

export const introStyles = makeStyles((theme) => ({
  introModalPaper: {
    width: 500,
    height: 'fit-content',
    boxShadow: theme.shadows[5],
    border: '1px solid ' + theme.palette.primary.light,
    backgroundImage: `linear-gradient(180deg, ${theme.palette.secondary.light} , ${theme.palette.secondary.main})`,
    borderRadius: 12,
    '&:hover': {
      boxShadow: theme.shadows[12],
    },
  },
  header: {
    padding: '1.5%',
    backgroundImage: `linear-gradient(86deg, ${theme.palette.primary.main} , ${theme.palette.primary.dark})`,
    height: 40,
    width: '100%',
    borderRadius: '10px 10px 0px 0px',
    borderBottom: '2px solid ' + theme.palette.primary.light,
    '& h6': {
      textTransform: 'uppercase',
      marginTop: -3,
    },
  },
  body: {
    padding: '1.5%',
    height: 'auto',
    width: '100%',
  },
  bottom: {
    width: '100%',
    borderTop: '2px solid ' + theme.palette.primary.light,
  },
  bottomButton: {
    borderRadius: '0px 0px 10px 10px',
  },
  tooltip: {
    marginTop: 20,
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    width: 'fit-content',
  },
  tooltipOff: {
    display: 'none',
  },
}));

export const modalLoadingStyles = makeStyles((theme) => ({
  paper: {
    borderRadius: 10,
    backgroundColor: theme.palette.common.black,
    padding: 30,
  },
  title: {
    margin: '5px 0px 15px 0px',
  },
}));
