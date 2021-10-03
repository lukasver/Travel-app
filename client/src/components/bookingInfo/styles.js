import { makeStyles } from '@material-ui/core/styles';

export const bookingStyles = makeStyles((theme) => ({
  mainContainer: {
    marginBottom: 15,
  },
  cardComponent: {
    borderRadius: '10px 10px 0px 0px',
  },
  cardContent: {},
  titleOverline: {
    backgroundImage: `linear-gradient(86deg, ${theme.palette.primary.light} , ${theme.palette.primary.light})`,
    width: '100%',
    height: 6,
    borderRadius: '12px 12px 0px 0px',
    marginBottom: -5,
  },
  titleUnderline: {
    backgroundImage: `linear-gradient(86deg, ${theme.palette.primary.light} , ${theme.palette.primary.light})`,
    width: '100%',
    height: 6,
    borderRadius: '0px 0px 12px 12px',
    marginBottom: -5,
  },
}));
