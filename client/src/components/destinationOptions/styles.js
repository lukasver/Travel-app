import { makeStyles } from '@material-ui/core/styles';

export const destinationOptionsStyles = makeStyles((theme) => ({
  outerPaper: {
    width: '100%',
    padding: '10px 20px',
    borderRadius: 12,
    marginBottom: 20,
  },
  innerPaper: {
    width: '100%',
    borderRadius: 12,
    border: '2px solid ' + theme.palette.primary.dark,
    marginBottom: 15,
  },
  titleText: {
    color: theme.palette.common.black,
  },
  titleUnderline: {
    backgroundImage: `linear-gradient(86deg, ${theme.palette.primary.dark} , ${theme.palette.primary.main})`,
    width: '100%',
    height: 10,
    borderRadius: '0px 0px 12px 12px',
    marginBottom: -5,
  },
}));
