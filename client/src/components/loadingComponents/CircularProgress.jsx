import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function CircularLoader() {
  return (
    <div>
      <CircularProgress color="primary" size={100} thickness="3.8" />
    </div>
  );
}
