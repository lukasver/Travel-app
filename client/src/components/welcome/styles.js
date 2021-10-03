import { makeStyles } from '@material-ui/core/styles';

export const welcomeStyles = makeStyles((theme) => ({
  paperMainContainer: {
    flexBasis: '100%',
    padding: '1.5%',
    boxShadow: theme.shadows[20],
    '@media (max-width: 600px)': {
      '& h5': {
        fontSize: '0.8rem',
      },
    },
  },
  paperTop: {
    border: '2px solid ' + theme.palette.primary.main,
    backgroundImage: `linear-gradient(180deg, ${theme.palette.secondary.light} , ${theme.palette.secondary.main})`,
    borderRadius: 30,
    marginBottom: 10,
  },
  paperBottom: {
    border: '2px solid ' + theme.palette.primary.light,
    borderRadius: 30,
    cursor: 'pointer',
    backgroundImage: `linear-gradient(86deg, ${theme.palette.primary.dark} , ${theme.palette.primary.main})`,
    '&:hover': {
      backgroundImage: `linear-gradient(140deg, ${theme.palette.primary.main} , ${theme.palette.primary.light})`,
    },
  },
  bodyText: {
    color: theme.palette.common.black,
  },
}));
