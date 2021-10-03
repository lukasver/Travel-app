import React from 'react';

import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import TimelineContent from '@material-ui/lab/TimelineContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Timeline from '@material-ui/lab/Timeline';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import FaceIcon from '@material-ui/icons/Face';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { useTranslation } from 'react-i18next';
import { intlStations } from '../../utils/stations';
import { introStyles } from './styles';

const states = intlStations;

export default function ModalIntroComp(props) {
  const classes = introStyles();
  const { handleChange, handleSubmit, disableSubmit, values } = props;
  const { t } = useTranslation(['global']);

  const timelineOptions = getListOfOptions(handleChange, t);

  return (
    <Paper elevation={3} className={classes.introModalPaper}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item className={classes.header}>
          <Typography align="center" variant="h6">
            {t('Modal.intro.title')}
          </Typography>
        </Grid>
        <Grid item className={classes.body} justify="flex-start">
          <Typography variant={'body1'} align="center" gutterBottom>
            {t('Modal.intro.subtitle')}
          </Typography>
          <Divider />
          <MyTimeline classes={classes} options={timelineOptions} />
        </Grid>
        <Grid item className={classes.bottom}>
          <Tooltip
            placement="bottom"
            classes={{
              tooltip: disableSubmit ? classes.tooltip : classes.tooltipOff,
            }}
            title={
              values.budget < 0
                ? t('Common.invalidBudget')
                : disableSubmit && t('Common.incompleteFields')
            }
          >
            <span>
              <Button
                disabled={disableSubmit}
                fullWidth
                color="primary"
                variant="contained"
                className={classes.bottomButton}
                startIcon={<LocalOfferIcon />}
                onClick={(e) => handleSubmit(e)}
              >
                {t('Modal.intro.seeOffers')}
              </Button>
            </span>
          </Tooltip>
        </Grid>
      </Grid>
    </Paper>
  );
}

const MyAutocomplete = (props) => {
  const { options, id, handleChange } = props;

  return (
    <Autocomplete
      id={id}
      options={options}
      noOptionsText="Ingresar provincia válida"
      autoHighlight
      getOptionLabel={(option) => option.name}
      onInputChange={(e, value, reason) => {
        if (reason !== 'clear') {
          e = { ...e, target: { id: e.target?.id?.split('-')[0], value } };
          handleChange(e);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password',
          }}
        />
      )}
    />
  );
};

const MyTimeline = (props) => {
  const { options } = props;

  return (
    <Timeline>
      {options.map((option, index) =>
        option?.align === 'right' ? (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot
                color={option?.timelineDotColor}
                variant={option?.timelineDotVariant}
              >
                {option?.icon}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Box>
                <Typography
                  align="center"
                  variant={props.textVariant || 'subtitle2'}
                >
                  {option?.title}
                </Typography>
                {option?.input}
              </Box>
            </TimelineContent>
          </TimelineItem>
        ) : (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              <Box>
                <Typography
                  align="center"
                  variant={props.textVariant || 'subtitle2'}
                >
                  {option?.title}
                </Typography>
                {option?.input}
              </Box>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                color={option?.timelineDotColor}
                variant={option?.timelineDotVariant}
              >
                {option?.icon}
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent></TimelineContent>
          </TimelineItem>
        )
      )}
    </Timeline>
  );
};

const getListOfOptions = (handler, t) => {
  return [
    {
      title: t('Modal.intro.inputs.name'),
      input: (
        <TextField
          autoFocus
          onChange={handler}
          size="small"
          color="primary"
          variant="outlined"
          id="name"
          inputProps={{
            autoComplete: 'name',
          }}
        />
      ),
      icon: <FaceIcon />,
      align: 'right',
      timelineDotColor: 'primary',
      timelineDotVariant: 'outlined',
    },
    {
      title: t('Modal.intro.inputs.from'),
      input: (
        <MyAutocomplete handleChange={handler} options={states} id="origin" />
      ),
      icon: <FlightTakeoffIcon />,
      align: 'left',
      timelineDotColor: 'primary',
    },
    {
      title: t('Modal.intro.inputs.budget'),
      input: (
        <TextField
          onChange={handler}
          id="budget"
          type={'number'}
          size="small"
          color="primary"
          inputProps={{ type: 'number' }}
          variant="outlined"
          placeholder="Max Round-trip"
          inputProps={{
            min: '0',
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      ),
      icon: <AttachMoneyIcon />,
      align: 'right',
      timelineDotColor: 'primary',
      timelineDotVariant: 'outlined',
    },
  ];
};
