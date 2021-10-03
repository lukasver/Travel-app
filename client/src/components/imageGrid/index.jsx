import React, { useState, useEffect } from 'react';

import GridListTileBar from '@material-ui/core/GridListTileBar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ListSubheader from '@material-ui/core/ListSubheader';
import GridListTile from '@material-ui/core/GridListTile';
import IconButton from '@material-ui/core/IconButton';
import ExploreIcon from '@material-ui/icons/Explore';
import GridList from '@material-ui/core/GridList';
import Tooltip from '@material-ui/core/Tooltip';

import { getDestImage, getSelectedDestinations } from './utils';
import { getCityFromAirportCode } from '../../utils/functions';
import { imageGridStyles } from './styles';
import { useTranslation } from 'react-i18next';

export default function ImageGrid(props) {
  const { options, returnOptions } = props;
  const classes = imageGridStyles();
  const sm = useMediaQuery('(max-width:600px)');
  const { t } = useTranslation(['global']);

  const [ownOptions, setOwnOptions] = useState(null);

  const handleInfoClick = (e) => {
    e.stopPropagation();
    //TODO: link to some information about destination
  };

  const handleTileClick = (destination) => (e) => {
    e.stopPropagation();
    if (destination === props.destinationSelected?.destination) return;
    props.setDestinationSelected({
      destination,
      options: getSelectedDestinations(destination, ownOptions?.options),
    });
    props.setCurrentPage(1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    props.setNotify({
      isOpen: true,
      type: 'info',
      message: t('Alerts.showing', { destination: getCityFromAirportCode(destination) }),
    });
  };

  const optionsQuantity = ownOptions?.destinations?.length;

  useEffect(() => {
    if (returnOptions) {
      setOwnOptions(returnOptions);
    } else if (options) {
      setOwnOptions(options);
    }
  }, [options, returnOptions]);

  return (
    <GridList
      cellHeight={300}
      cols={sm ? 1 : optionsQuantity < 2 ? 1 : 4}
      className={classes.gridList}
    >
      {optionsQuantity & (7 === 0) && (
        <GridListTile key="Subheader" cols={1} style={{ height: 'auto' }}>
          <ListSubheader component="div">A tu medida!</ListSubheader>
        </GridListTile>
      )}
      {ownOptions?.destinations?.map((destination) => (
        <GridListTile
          key={destination.name}
          cols={options?.destinations < 2 ? 4 : 1}
          rows={1}
          className={classes.gridListTile}
          onClick={handleTileClick(destination.destination)}
        >
          <img src={getDestImage(destination)} alt={destination.name} />
          <GridListTileBar
            title={`${t('ImageGrid.travelTo')} ${destination.name}`}
            subtitle={null}
            actionIcon={
              <Tooltip
                title={t('ImageGrid.knowMore')}
                classes={{ tooltip: classes.tooltip }}
                placement="bottom"
              >
                <IconButton className={classes.icon} onClick={handleInfoClick}>
                  <ExploreIcon />
                </IconButton>
              </Tooltip>
            }
          />
        </GridListTile>
      ))}
    </GridList>
  );
}
