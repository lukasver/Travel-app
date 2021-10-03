import React from 'react';
import clsx from 'clsx';
import { PropTypes } from 'prop-types';

import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';

import { modalStyles } from './styles';

export default function MyModal(props) {
  const { classes, open, handleClose, children } = props;
  const defaultClasses = modalStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={clsx([defaultClasses.centeredModal, classes?.centeredModal])}
      open={open}
      onClose={(e) => handleClose(e)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>{children}</Fade>
    </Modal>
  );
}

MyModal.prototypes = {
  classes: PropTypes.object,
  open: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]).isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired, // must be able to hold a ref
};
