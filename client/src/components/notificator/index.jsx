import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function Notificator(props) {
  const { notify, setNotify, alert = false } = props;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setNotify({
      ...notify,
      isOpen: false,
    });
  };

  return (
    <Snackbar
      open={notify?.isOpen}
      autoHideDuration={props.duration || 3000}
      anchorOrigin={{
        vertical: props.vertical || 'bottom',
        horizontal: props.horizontal || 'left',
      }}
      TransitionComponent={TransitionUp}
      onClose={props.handleClose || handleClose}
      action={
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="primary"
            onClick={props.handleClose || handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
      message={alert ? false : notify.message}
    >
      {alert ? (
        <Alert
          severity={notify.type}
          onClose={props.handleClose || handleClose}
        >
          {notify.message}
        </Alert>
      ) : null}
    </Snackbar>
  );
}

Notificator.propTypes = {
  notify: PropTypes.shape({
    isOpen: PropTypes.bool,
    message: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  setNotify: PropTypes.func.isRequired,
  duration: PropTypes.number, // sets the autoHide duration in miliseconds,
  horizontal: PropTypes.oneOf(['center', 'left', 'right']),
  vertical: PropTypes.oneOf(['bottom', 'top']),
  handleClose: PropTypes.func, // optional custom closing function
  alert: PropTypes.bool, // optional, if true shows messages as alerts with colours
};
