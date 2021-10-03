import { makeStyles } from '@material-ui/core/styles';

export const imageGridStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridListTile: {
    cursor: 'pointer',
    '& .MuiGridListTile-tile': {
      borderRadius: 12,
    },
  },
  icon: {
    color: theme.palette.secondary.dark,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  tooltip: {
    maxWidth: '15ch !important',
  },
}));
