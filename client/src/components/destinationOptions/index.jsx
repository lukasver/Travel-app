import React from 'react';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { destinationOptionsStyles } from './styles';
import BookingInformation from '../bookingInfo';
import DestinationsGrid from '../imageGrid';
import FlightsComponent from '../flights';
import NavBar from '../navBar';
import { useTranslation } from 'react-i18next';


const Container = (props) => (
  <Grid style={{ marginTop: 90 }} container {...props} />
);

export default function Destinations(props) {
  const classes = destinationOptionsStyles();
  const { t } = useTranslation(['global']);

  return (
    <>
      <NavBar user={props.user} />
      <Container>
        <Paper elevation={2} className={classes.outerPaper}>
          <Paper elevation={1} className={classes.innerPaper}>
            <Typography
              align="center"
              variant="h4"
              className={classes.titleText}
            >
              {props.booking?.originatingFlight
                ? t('DestinationOptions.returnFlight')
                : props.options?.destinations?.length === 1
                  ? t('DestinationOptions.visit', { destination: props.options?.destinations[0]?.name })
                  : t('DestinationOptions.chooseFlight')}
            </Typography>
            <div className={classes.titleUnderline} />
          </Paper>
          <BookingInformation {...props} />
          <FlightsComponent {...props} />
          {!(
            props.booking?.originatingFlight && props.booking?.returnFlight
          ) && (
              <DestinationsGrid
                setCurrentPage={props.setCurrentPage}
                {...props}
              />
            )}
        </Paper>
      </Container>
    </>
  );
}
