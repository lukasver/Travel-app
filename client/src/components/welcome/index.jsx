import React from 'react';
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import { useTranslation, Trans } from 'react-i18next';
import { welcomeStyles } from './styles';

export default function WelcomeComponent({ handleClick }) {
  const classes = welcomeStyles();
  const { t } = useTranslation(['global']);
  return (
    <Box component="div" display="flex" flexDirection="column" width="100%">
      <Paper
        elevation={1}
        className={clsx([classes.paperMainContainer, classes.paperTop])}
      >
        <Typography variant="h3">{t('Welcome.title')}</Typography>
        <Divider style={{ margin: '10px 0px' }} />
        <Typography variant="h6" className={classes.bodyText}>
          {t('Welcome.subtitle.one')}
          <br />
          {t('Welcome.subtitle.two')}
        </Typography>
      </Paper>
      <Paper
        onClick={handleClick('intro')}
        elevation={1}
        className={clsx([classes.paperMainContainer, classes.paperBottom])}
      >
        <Typography variant="h5">
        <Trans
          t={t}
          components={[
            <b />,
            <b />,
          ]}
        >
          {t('Welcome.button.title')}
        </Trans>
        </Typography>
        <Typography variant="h5">{t('Welcome.button.subtitle')}</Typography>
      </Paper>
    </Box>
  );
}
