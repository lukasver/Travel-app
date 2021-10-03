import React, { useContext } from 'react';

import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';

import { bookingStyles } from './styles';
import {
  getCityFromAirportCode,
  getLocalFormattedDate,
} from '../../utils/functions';
import { userContext } from '../../contexts';
import { useTranslation } from 'react-i18next';


function BookingInformation(props) {
  const classes = bookingStyles();
  const { budget } = useContext(userContext);
  const { t } = useTranslation(['global']);

  const {
    originatingFlight,
    returnFlight,
    passengers,
    oneWayTrip,
  } = props.booking;

  const roundTripPrice =
    (returnFlight?.price + originatingFlight?.price) * passengers;
  const oneWayPrice = originatingFlight?.price * passengers;

  return originatingFlight && passengers ? (
    <Box component="div" width="100%" className={classes.mainContainer}>
      <Card className={classes.cardComponent}>
        <div className={classes.titleOverline} />
        <CardContent className={classes.cardContent}>
          <Typography
            style={{ textTransform: 'uppercase', textDecoration: 'underline' }}
            align="center"
            variant="h5"
            gutterBottom
          >
            {t('BookingInfo.yourBooking')}
          </Typography>
          <Typography
            align="left"
            variant="h6"
            color="textSecondary"
            gutterBottom
          >
            {oneWayTrip ? t('BookingInfo.yourFlight') : t('BookingInfo.firstLeg')}
          </Typography>
          <FlightSummary booking={originatingFlight} passengers={passengers} />
          <Divider fullWidth style={{ marginBottom: 8 }} />
          {!oneWayTrip && (
            <Typography align="left" variant="h6" color="textSecondary">
              {returnFlight ? t('BookingInfo.secondLeg') : t('BookingInfo.chooseSecondLeg')}
            </Typography>
          )}
          <FlightSummary booking={returnFlight} passengers={passengers} />
          {returnFlight && <Divider fullWidth style={{ marginBottom: 8 }} />}
          {oneWayTrip && (
            <Typography
              align="right"
              style={{ marginRight: 10, paddingTop: 8 }}
            >
              <b>{t('BookingInfo.finalPrice', { price: oneWayPrice.toFixed(2) })}</b>
            </Typography>
          )}
          {returnFlight && (
            <Tooltip
              title={getBudgetResult(budget, roundTripPrice)}
              placement="top-end"
            >
              <Typography
                align="right"
                style={{ marginRight: 10, paddingTop: 8 }}
              >
                <b>{t('BookingInfo.finalPrice', { price: roundTripPrice.toFixed(2) })}</b>
              </Typography>
            </Tooltip>
          )}
        </CardContent>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Tooltip title={t('Common.commingSoon')} placement="top">
            <span>
              <Button disabled variant="outlined" color="primary">
                {t('BookingInfo.changeOrigin')}
              </Button>
            </span>
          </Tooltip>
          <Button
            variant="text"
            color="textSecondary"
            onClick={props.handleCleanBooking}
          >
            {t('BookingInfo.cleanFlights')}
          </Button>
          <Button
            disabled={!oneWayTrip && !returnFlight}
            variant="contained"
            color="primary"
            onClick={props.handleConfirmBooking}
          >
            {t('Common.confirmBooking')}
          </Button>
        </CardActions>
      </Card>
      <div className={classes.titleUnderline} />
    </Box>
  ) : null;
}

const FlightSummary = (props) => {
  const { t } = useTranslation(['global']);
  return (
    <Box
      component="div"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
      mb={1}
    >
      {props.booking ? (
        <>
          <Typography align="left">
            <b>{t('Flights.departure')}: </b>
            <Tooltip
              title={`Aeropuerto: ${props.booking?.origin}`}
              placement="top"
            >
              <span>{getCityFromAirportCode(props.booking?.origin)}</span>
            </Tooltip>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <b>{t('Flights.arrival')}: </b>
            <Tooltip
              title={`Aeropuerto: ${props.booking?.destination}`}
              placement="top"
            >
              <span>{getCityFromAirportCode(props.booking?.destination)}</span>
            </Tooltip>
          </Typography>
          <Typography>
            <b>{t('Flights.date')}:</b> {getLocalFormattedDate(props.booking?.date)}
          </Typography>
          <Typography>
            <b>{t('Flights.passengers')}:</b> {props.passengers}
          </Typography>
          <Tooltip
            title={`Precio por tramo por ${props.passengers} pasajeros`}
            placement="top"
          >
            <Typography>
              <b>{t('Flights.price')}:</b> $
              {(props.booking?.price * props.passengers).toFixed(2)}
            </Typography>
          </Tooltip>
        </>
      ) : null}
    </Box>
  );
};

function getBudgetResult(budget, bookingPrice) {
  if (budget > bookingPrice) {
    return `Mejoramos tu presupuesto en $${(budget - bookingPrice).toFixed(
      0
    )} 🎉`;
  } else if (budget.toFixed(0) === bookingPrice.toFixed(0)) {
    return `Igualamos tu presupuesto ✨`;
  } else {
    return `Nos excedimos de tu presupuesto en $${Math.abs(
      budget - bookingPrice
    ).toFixed(0)} 💸`;
  }
}

export default BookingInformation;
