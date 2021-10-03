import { makeStyles } from '@material-ui/core/styles';

export const paginatorStyles = makeStyles((theme) => ({
  customPages: {
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: theme.palette.primary.light,
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    '& .MuiPaginationItem-rounded': {
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
      },
    },
  },
}));
