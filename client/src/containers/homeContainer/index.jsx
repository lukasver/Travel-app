import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import {
  fetchingDataError,
  finalBookingConfirmation,
  challengeEnding,
  noMatchingOriginToast,
  noReturnFlightsAlert,
} from '../../utils/alerts';
import { BUDGET_QUERY, RETURN_FLIGHTS_QUERY } from '../../gql/queries';
import { POST_BOOKING, UPDATE_AVAILABILITY } from '../../gql/mutations';
import { flightOptionsContext, userContext } from '../../contexts';
import ModalLoading from '../../components/modalParts/Loading';
import Destinations from '../../components/destinationOptions';
import { validateSubmit, isBookingCompleted } from './utils';
import ModalIntro from '../../components/modalParts/Intro';
import WelcomeComponent from '../../components/welcome';
import Notificator from '../../components/notificator';
import { useKeyPress } from '../../utils/customHooks';
import { homeContainerStyles } from './styles';
import Modal from '../../components/modal';
import features from '../../utils/features';
import { useTranslation } from 'react-i18next';

const initialModalStates = {
  intro: false,
  loading: false,
};
const initialValues = {
  name: '',
  origin: null,
  budget: 0,
};
const initialNotificatorState = {
  isOpen: false,
  message: '',
  type: '',
};

const initialBookingValues = {
  oneWayTrip: false,
  originatingFlight: null,
  returnFlight: null,
  passengers: 0,
};

const initialBookingOptions = {
  originOptions: null,
  returnOptions: null,
};

export default function HomeContainer() {
  const classes = homeContainerStyles();
  const history = useHistory();
  const [openModals, setOpenModals] = useState(initialModalStates);
  const [flightOptionCurrentPage, setFlightOptionCurrentPage] = useState(1);
  const [values, setValues] = useState(initialValues);
  const [bookingOptions, setBookingOptions] = useState(initialBookingOptions);
  const [booking, setBooking] = useState(initialBookingValues);
  const [notify, setNotify] = useState(initialNotificatorState);
  const [destinationSelected, setDestinationSelected] = useState(null);
  const [user, setUser] = useState({ userName: '', budget: 0 });
  const enter = useKeyPress('Enter');
  const [postBooking] = useMutation(POST_BOOKING);
  const [updateFlightAvailability] = useMutation(UPDATE_AVAILABILITY);
  const { t } = useTranslation(['global']);

  const [
    getBudgetQuery,
    { loading: loadingQuery, error: queryError, data: queryResults },
  ] = useLazyQuery(BUDGET_QUERY);
  const [
    getReturnFlights,
    {
      loading: loadingReturnFlights,
      error: errorReturnFlights,
      data: returnFlightsResults,
    },
  ] = useLazyQuery(RETURN_FLIGHTS_QUERY);

  const providerQueryResults = { getBudgetQuery, loadingQuery, queryError, queryResults };

  const providerReturnFlightsResults = {
    getReturnFlights,
    loadingReturnFlights,
    errorReturnFlights,
    returnFlightsResults,
  }

  const handleClick = (modalType) => (e) => {
    setOpenModals((prevState) => ({ ...prevState, [modalType]: true }));
    return;
  };

  const handleCloseModals = (e, type) => {
    if (!type) {
      setOpenModals(initialModalStates);
    } else {
      setOpenModals((prevState) => ({ ...prevState, [type]: false }));
    }
    setValues(initialValues);
  };

  const handleCleanBooking = () => {
    setBooking(initialBookingValues);
    setBookingOptions((prevValue) => ({ ...prevValue, returnOptions: null }));
    setNotify({
      isOpen: true,
      message: 'Los vuelos reservados han sido removidos',
      type: 'info',
    });
  };

  const handleConfirmBooking = async () => {
    if (isBookingCompleted(booking)) {
      const bookingDetails = {
        origin_date: booking.originatingFlight?.date,
        origin_origin: booking.originatingFlight?.origin,
        origin_destination: booking.originatingFlight?.destination,
        return_date: booking.returnFlight?.date,
        return_origin: booking.returnFlight?.origin,
        return_destination: booking.returnFlight?.destination,
        passengers: booking.passengers
      }
      const { value: userEmail } = await finalBookingConfirmation(t);
      if (userEmail) {
        // Save booking in Supabase db
        if (features.database === 'true') {
          await Promise.all([
            postBooking({
              variables: {
                postBookingInput: {
                  ...bookingDetails,
                  price:
                    (booking.originatingFlight?.price +
                      (booking.returnFlight?.price || 0)) *
                    booking.passengers,
                  client: userEmail,
                  one_way: booking.oneWayTrip,
                },
              },
            }),
            updateFlightAvailability({
              variables: {
                updateFlightsAvailabilityInput: bookingDetails
              }
            })
          ])
        } else {
          await updateFlightAvailability({
            variables: {
              updateFlightsAvailabilityInput: bookingDetails
            }
          })
        }
        await challengeEnding(t);
        await history.go(0);
      }
    } else {
      setNotify({
        isOpen: true,
        message: 'La reserva no se encuentra completa aún',
        type: 'error',
      });
    }
  };

  const handleIntroSubmit = () => {
    if (validateSubmit(values, initialValues) || values?.budget < 0) {
      setNotify({
        isOpen: true,
        message:
          values?.budget < 0
            ? 'Por favor, ingresa un presupuesto mayor a 0'
            : t('Common.incompleteFields'),
        type: 'error',
      });
      return;
    }
    getBudgetQuery({
      variables: {
        budgetOptionsBudget: values?.budget,
        budgetOptionsOrigin: values?.origin,
      },
    });
    setOpenModals((prevState) => ({ ...prevState, loading: true }));
    setNotify({
      isOpen: true,
      message: 'Buscando opciones para tu viaje...',
      type: 'info',
    });
  };

  const handleIntroChange = (e) => {
    let { id, value } = e.target;
    if (id === 'budget') value = Number(value);
    setValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  useEffect(() => {
    if (!loadingQuery && (queryError || queryResults)) {
      setOpenModals((prevState) => ({
        ...prevState,
        loading: false,
        intro: queryResults ? false : true,
      }));
      setNotify(initialNotificatorState);
      if (queryResults) {
        setUser({ ...user, userName: values.name, budget: values.budget });
        setBookingOptions((prevState) => ({
          ...prevState,
          originOptions: queryResults?.budget_options,
        }));
        setValues(initialValues);
      }
      if (queryResults && !queryResults.budget_options.matchOrigin) {
        setTimeout(() => {
          noMatchingOriginToast(t);
        }, 200);
      }
    }
    if (queryError) {
      fetchingDataError(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingQuery, queryError]);

  useEffect(() => {
    if (enter && openModals.intro && values.budget !== 0) {
      handleIntroSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enter]);

  useEffect(() => {
    if (returnFlightsResults && !loadingReturnFlights) {
      setBookingOptions((prevState) => ({
        ...prevState,
        returnOptions: returnFlightsResults?.return_flights_options,
      }));
      if (!returnFlightsResults.return_flights_options.options.length) {
        noReturnFlightsAlert(t).then((result) => {
          if (result.isConfirmed) {
            setBooking((prevValues) => ({ ...prevValues, oneWayTrip: true }));
          } else if (result.isDenied) {
            setBooking(initialBookingValues);
            setBookingOptions((prevState) => ({
              ...prevState,
              originOptions: queryResults?.budget_options,
              returnOptions: null,
            }));
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnFlightsResults]);

  return (
    <flightOptionsContext.Provider
      value={{ providerQueryResults, providerReturnFlightsResults }}
    >
      <userContext.Provider value={user}>
        <Container>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ height: '100vh' }}
          >
            {queryResults ? (
              <Destinations
                user={user}
                options={bookingOptions.originOptions}
                returnOptions={bookingOptions.returnOptions}
                destinationSelected={destinationSelected}
                setDestinationSelected={setDestinationSelected}
                booking={booking}
                setBooking={setBooking}
                notify={notify}
                setNotify={setNotify}
                currentPage={flightOptionCurrentPage}
                setCurrentPage={setFlightOptionCurrentPage}
                handleCleanBooking={handleCleanBooking}
                handleConfirmBooking={handleConfirmBooking}
              />
            ) : (
              <WelcomeComponent handleClick={handleClick} />
            )}
          </Grid>
        </Container>
        <Notificator
          notify={notify}
          setNotify={setNotify}
          loading={loadingQuery}
          horizontal="center"
          vertical="bottom"
        />
        <Modal
          open={openModals.intro}
          handleClose={handleCloseModals}
          children={
            <ModalIntro
              handleSubmit={handleIntroSubmit}
              handleChange={handleIntroChange}
              values={values}
              disableSubmit={validateSubmit(values, initialValues)}
            />
          }
        />
        <Modal
          open={openModals.loading}
          handleClose={handleCloseModals}
          classes={classes.centeredModal}
          children={<ModalLoading name={values?.name} />}
        />
      </userContext.Provider>
    </flightOptionsContext.Provider>
  );
}
