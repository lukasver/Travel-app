import React from 'react';

import Pagination from '@material-ui/lab/Pagination';
import Box from '@material-ui/core/Box';

import { paginatorStyles } from './styles';

export default function Paginator(props) {
  const classes = paginatorStyles();
  return (
    <Box
      mb={2}
      width="100%"
      display="flex"
      component="div"
      alignContent="center"
      justifyContent="center"
    >
      <Pagination
        shape="rounded"
        onChange={props.handlePageChange}
        className={classes.customPages}
        {...props}
      />
    </Box>
  );
}
