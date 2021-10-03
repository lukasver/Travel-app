import React from 'react';
import clsx from 'clsx';

import VerticalTicketRip from '@mui-treasury/components/rip/verticalTicket';
import { useVerticalRipStyles } from '@mui-treasury/styles/rip/vertical';
import AirplanemodeActive from '@material-ui/icons/AirplanemodeActive';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Globe from '../../images/globe.png';
import { useTranslation } from 'react-i18next';

import { getCityFromAirportCode } from '../../utils/functions';
import { ticketStyles } from './styles';

const mainColor = '#AEADB3';
const lightColor = '#f4f4f4';

export const PlaneTicketCardDemo = React.memo(function PlaneTicketCard(props) {
  const classes = ticketStyles();
  const { flight, isReturnFlight } = props;
  const ripStyles = useVerticalRipStyles({
    size: 24,
    rightColor: lightColor,
    tearColor: mainColor,
    leftColor: '#25a18e',
  });

  const { t } = useTranslation(['global']);
  const originName = getCityFromAirportCode(flight.origin).split('-');
  const destinationName = getCityFromAirportCode(flight.destination).split('-');

  return (
    <Card
      className={clsx([classes.card, isReturnFlight && classes.rotate])}
      elevation={0}
    >
      <div className={clsx(classes.left, classes.moveLeft)}>
        <CardMedia
          className={clsx([classes.media, isReturnFlight && classes.rotate])}
          style={{ transform: 'scale(0.8)' }}
          image={Globe}
        />
      </div>
      <VerticalTicketRip
        classes={{
          ...ripStyles,
          left: clsx(ripStyles.left, classes.moveLeft),
          right: clsx(ripStyles.right, classes.moveRight),
        }}
      />
      <div className={clsx(classes.right, classes.moveRight)}>
        <div
          className={clsx([classes.label, isReturnFlight && classes.rotate])}
        >
          <h2 className={classes.heading}>{flight.origin}</h2>
          <p className={classes.subheader}>
            {originName[0]}
            <br />
            {originName[1]}
          </p>
        </div>
        <div className={clsx([classes.path, isReturnFlight && classes.rotate])}>
          <div className={classes.line}>
            <AirplanemodeActive className={classes.plane} />
          </div>
          <span className={classes.flight}>{t('Flights.nonStop')}</span>
        </div>
        <div
          className={clsx([classes.label, isReturnFlight && classes.rotate])}
        >
          <h2 className={classes.heading}>{flight.destination}</h2>
          <p className={classes.subheader}>
            {destinationName[0]}
            <br />
            {destinationName[1]}
          </p>
        </div>
      </div>
    </Card>
  );
});

export default PlaneTicketCardDemo;
