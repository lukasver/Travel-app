import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import CircularLoader from '../loadingComponents/CircularProgress';
import { modalLoadingStyles } from './styles';
import { useTranslation } from 'react-i18next';

export default function ModalLoading(props) {
  const defaultClasses = modalLoadingStyles();
  const { t, i18n } = useTranslation(['global']);

  return (
    <Paper elevation={3} className={defaultClasses.paper}>
      <Typography
        variant="h5"
        color="primary"
        align="center"
        className={defaultClasses.title}
      >
        {t('Modal.loading.title')} {props.name && i18n?.language === 'es' ? ' para' : 'for'}
      </Typography>
      {props.name && (
        <Typography
          variant="h4"
          color="primary"
          align="center"
          className={defaultClasses.title}
        >
          {props.name}
        </Typography>
      )}
      <Box
        component="div"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <CircularLoader />
      </Box>
    </Paper>
  );
}
