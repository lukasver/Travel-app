import React, { useState, useEffect } from 'react';
import { matchSorter } from 'match-sorter';

import FilterListOutlinedIcon from '@material-ui/icons/FilterListOutlined';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';

import FlightOptions from '../destinationAccordeon';
import { flightStyles } from './styles';
import Paginator from '../paginator';
import { useTranslation } from 'react-i18next';


function Flights(props) {
  const classes = flightStyles();
  const { t, i18n } = useTranslation(['global']);

  const FLIGHTS_PER_PAGE = 10;
  const [options, setOptions] = useState([]);
  const [sortedBy, setSortedBy] = useState('initial');

  // =============== PAGINATION ================ //
  const indexOfLastFlight = props.currentPage * FLIGHTS_PER_PAGE;
  const indexOfFirstFlight = indexOfLastFlight - FLIGHTS_PER_PAGE;
  const totalPages = Math.ceil(options?.length / FLIGHTS_PER_PAGE);

  const flightOptions = options?.slice(indexOfFirstFlight, indexOfLastFlight);
  // =============== ============ ================ //

  const handlePageChange = (_e, page) => {
    props.setCurrentPage(page);
  };

  const handleClickTitle = (e) => {
    const { id } = e.target;
    if (id === sortedBy) {
      setOptions((prevOptions) =>
        matchSorter(options, '', {
          keys: [id],
          sorter: (rankedItems) => [...rankedItems].reverse(),
        })
      );
      setSortedBy(null);
      notifyOrderBy(id, props.setNotify, { t, lang: i18n?.language });
    } else {
      setOptions((prevOptions) => matchSorter(options, '', { keys: [id] }));
      setSortedBy(id);
      notifyOrderBy(id, props.setNotify, { t, lang: i18n?.language });
    }
  };

  useEffect(() => {
    setOptions(props.destinationSelected?.options);
  }, [props.destinationSelected]);

  return (
    <div>
      <Collapse in={Boolean(props.destinationSelected)}>
        <Typography gutterBottom align="left" color="textSecondary">
          {t('Flights.sort')}
        </Typography>
        <Box component="div" display="flex" width="100%" mb={1}>
          <Box
            display="flex"
            component="div"
            justifyContent="space-evenly"
            width="48.5%"
          >
            <Typography
              name="origen"
              className={classes.tableHeader}
              id="origin"
              onClick={handleClickTitle}
              variant="subtitle2"
            >
              {t('Flights.origin')}
            </Typography>
            <Typography
              className={classes.tableHeader}
              id="destination"
              onClick={handleClickTitle}
              variant="subtitle2"
            >
              {t('Flights.destination')}
            </Typography>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            className={classes.verticalDivider}
          />
          <Box
            display="flex"
            component="div"
            justifyContent="space-evenly"
            flexGrow={1}
          >
            <Typography
              className={classes.tableHeader}
              id="date"
              onClick={handleClickTitle}
              variant="subtitle2"
            >
              {t('Flights.date')}
            </Typography>
            <Typography
              className={classes.tableHeader}
              id="availability"
              onClick={handleClickTitle}
              variant="subtitle2"
            >
              {t('Flights.seats')}
            </Typography>
            <Typography
              className={classes.tableHeader}
              id="price"
              onClick={handleClickTitle}
              variant="subtitle2"
            >
              {t('Flights.price')}
            </Typography>
          </Box>
        </Box>
        {flightOptions?.map((flightOption) => (
          <FlightOptions
            flight={flightOption}
            setNotify={props.setNotify}
            booking={props.booking}
            setBooking={props.setBooking}
            destinationSelected={props.destinationSelected}
            setDestinationSelected={props.setDestinationSelected}
            changedSorting={sortedBy}
          />
        ))}
        <Box component="div" display="flex" justifyContent="flex-end">
          <Fab
            variant="extended"
            size="small"
            color="secondary"
            aria-label="collapse"
            className={classes.collapseButton}
            onClick={(e) => props.setDestinationSelected(null)}
          >
            <FilterListOutlinedIcon className={classes.extendedIcon} />
            {t('Common.close')}
          </Fab>
        </Box>
        {props?.options?.options?.length >= 10 && (
          <Paginator
            handlePageChange={handlePageChange}
            count={totalPages}
            defaultPage={1}
            page={props.currentPage}
          />
        )}
      </Collapse>
    </div>
  );
}

function notifyOrderBy(id, notifier, { t, lang }) {
  if (!id || !notifier) return;
  const mapping = {
    price: lang === 'es' ? 'precio' : 'price',
    date: lang === 'es' ? 'fecha' : 'date',
    origin: lang === 'es' ? 'origen' : 'origin',
    destination: lang === 'es' ? 'destino' : 'destination',
    availability: lang === 'es' ? 'asientos disponibles' : 'availability',
  };
  notifier({
    isOpen: true,
    type: 'info',
    message: t('Alerts.sortOrder', { by: `${mapping[id] || null}` }),
  });
  return;
}

export default Flights;
