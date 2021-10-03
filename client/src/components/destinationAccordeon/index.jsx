import React, { useEffect, useContext } from 'react';

import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@material-ui/core/Accordion';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

import { useTranslation, Trans } from 'react-i18next';
import { bookingConfirmAlert, bookFlightSeats } from '../../utils/alerts';
import { flightOptionsContext, userContext } from '../../contexts/';
import PlaneTicket from './PlaneTicket';
import { accordeonStyles } from './styles';
import ScheduleIcon from '@material-ui/icons/Schedule';
import {
  getHumanizedDuration,
  getLocalFormattedDate,
  getCityFromAirportCode,
} from '../../utils/functions';

function DestinationAccordeon(props) {
  const classes = accordeonStyles();
  const { t, i18n } = useTranslation(['global']);
  const { getReturnFlights } = useContext(
    flightOptionsContext
  ).providerReturnFlightsResults;
  const { budget } = useContext(userContext);
  const {
    flight,
    booking,
    setBooking,
    setNotify,
    destinationSelected,
    setDestinationSelected,
    changedSorting,
  } = props;
  const [openAccordeon, setOpenAccordeon] = React.useState(false);

  const handleCloseAccordeon = () => {
    setOpenAccordeon(false);
  };

  const handleToggleAccordeon = () => {
    setOpenAccordeon((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (openAccordeon) {
      handleCloseAccordeon();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changedSorting]);

  const handleBookFlightOption = async () => {
    // if originating flight already booked, book return flight.
    if (
      booking.originatingFlight &&
      !booking.returnFlight &&
      !booking.oneWayTrip
    ) {
      // else book originating flight
      setBooking((prevValue) => ({
        ...prevValue,
        returnFlight: flight,
      }));
      handleCloseAccordeon();
      setDestinationSelected(null);
      return setNotify({
        isOpen: true,
        type: 'success',
        message: t('Alerts.booking.successReturn'),
      });
    } else {
      const { value: passengerQuantity } = await bookFlightSeats(
        flight.availability,
        t
      );
      if (passengerQuantity) {
        const response = await bookingConfirmAlert(t);
        if (response.isDismissed) {
          return setNotify({
            isOpen: true,
            type: 'info',
            message: t('Alerts.booking.noBooked'),
          });
        } else {
          setBooking((prevValue) => ({
            ...prevValue,
            passengers: Number(passengerQuantity),
            originatingFlight: flight,
            oneWayTrip: response.isDenied
              ? true
              : response.isConfirmed
                ? false
                : prevValue.oneWayTrip,
          }));
          if (response.isDenied) {
            handleCloseAccordeon();
            setDestinationSelected(null);
          } else if (response.isConfirmed) {
            getReturnFlights({
              variables: {
                returnFlightsOptionsBudget: budget,
                returnFlightsOptionsOrigin: flight.destination,
                returnFlightsOptionsDate: flight.date,
                returnFlightsOptionsDestination: flight.origin,
                returnFlightsOptionsPassengers: Number(passengerQuantity),
              },
            });
            handleCloseAccordeon();
            setDestinationSelected(null);
          }
          return setNotify({
            isOpen: true,
            type: 'success',
            message: t('Alerts.booking.success'),
          });
        }
      }
    }
  };

  React.useEffect(() => {
    if (!destinationSelected) {
      handleCloseAccordeon();
    }
  }, [destinationSelected]);

  return (
    <div className={classes.root}>
      <Accordion expanded={openAccordeon}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
          onClick={(e) => flight.availability && handleToggleAccordeon(e)}
        >
          <Box
            className={classes.columnLeft}
            component="div"
            display="flex"
            width="100%"
            justifyContent="center"
            alignContent="center"
            alignItems="center"
          >
            <Tooltip
              placement="top"
              title={`Origen: ${getCityFromAirportCode(flight.origin)}`}
            >
              <Chip
                className={classes.chipsInverted}
                style={{ border: '2px inset black' }}
                color="primary"
                icon={<FlightTakeoffIcon />}
                label={flight.origin || 'EZE'}
                size="small"
              />
            </Tooltip>
            <Divider className={classes.horizontalDivider} />
            <Tooltip
              placement="top"
              title={`Destino: ${getCityFromAirportCode(flight.destination)}`}
            >
              <Chip
                size="small"
                className={classes.chips}
                style={{ border: '2px inset black' }}
                onDelete={(e) => { }}
                clickeable={false}
                color="primary"
                deleteIcon={<FlightLandIcon />}
                label={flight.destination || 'GRU'}
              />
            </Tooltip>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            className={classes.verticalDivider}
          />
          <Box
            component="div"
            display="flex"
            width="100%"
            justifyContent="center"
          >
            <Tooltip
              placement="top"
              title={t('Flights.departureIn', { date: getHumanizedDuration({ isoDate: flight.date, lang: i18n?.language }) })}
            >
              <Chip
                size="small"
                className={classes.chipsInverted}
                style={{ border: '1px inset black', width: 100 }}
                color="primary"
                icon={<ScheduleIcon />}
                label={<b>{getLocalFormattedDate(flight.date)}</b>}
              />
            </Tooltip>
            <span style={{ width: 10 }} />
            <Tooltip placement="top" title={t('Common.seats')}>
              <Chip
                size="small"
                className={classes.chipsSquared}
                style={{ border: '1px inset black', width: 150 }}
                color="primary"
                label={
                  !flight.availability ? (
                    t('Flights.full')
                  ) : (
                    <Trans
                      t={t}
                      components={[
                        <b />
                      ]}
                    >
                      {Number(flight.availability) === 1 ? t('Flights.seatsAvailable')
                        : t('Flights.seatsAvailable_plural', { count: flight.availability })}
                    </Trans>
                  )
                }
              />
            </Tooltip>
            <span style={{ width: 10 }} />
            <Tooltip placement="top" title={t('Flights.pricePerPAX')}>
              <Chip
                size="small"
                className={classes.chips}
                style={{ border: '1px inset black', width: 100 }}
                color="primary"
                deleteIcon={<MonetizationOnOutlinedIcon />}
                onDelete={(e) => { }}
                clickeable={false}
                label={<b>${flight.price}</b>}
              />
            </Tooltip>
          </Box>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div style={{ width: '100%' }}>
            <PlaneTicket
              {...props}
              isReturnFlight={Boolean(
                booking.originatingFlight &&
                !booking.returnFlight &&
                !booking.oneWayTrip
              )}
            />
          </div>
        </AccordionDetails>
        <Divider />
        <AccordionActions className={classes.accordeonActions}>
          <Button
            className={classes.actionButtons}
            size="small"
            onClick={handleCloseAccordeon}
          >
            {t('Common.cancel')}
          </Button>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={handleBookFlightOption}
          >
            {t('Common.book')}
          </Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}

export default DestinationAccordeon;
