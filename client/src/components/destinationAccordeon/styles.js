import { makeStyles } from '@material-ui/core/styles';

const lightColor = '#f4f4f4';
const borderRadius = 12;

export const accordeonStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: 4,
  },
  accordeonActions: {
    backgroundColor: theme.palette.secondary.main,
  },
  actionButtons: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  horizontalDivider: {
    width: 100,
    margin: '0px 20px',
    backgroundColor: theme.palette.primary.light,
  },
  verticalDivider: {
    backgroundColor: theme.palette.primary.lightf,
  },
  columnLeft: {},
  column2: {
    flexGrow: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  chips: {
    borderRadius: '0px 20px 20px 0px',
  },
  chipsInverted: {
    borderRadius: '20px 0px 0px 20px',
  },
  chipsSquared: {
    borderRadius: '0px 0px 0px 0px',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export const ticketStyles = makeStyles(({ palette, breakpoints }) => ({
  card: {
    overflow: 'visible',
    background: 'none',
    display: 'flex',
    minWidth: 343,
    minHeight: 150,
    filter: 'drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.3))',
    '& $moveLeft, $moveRight': {
      transition: '0.3s',
    },
    '&:hover': {
      '& $moveLeft': {
        transform: 'translateX(-8px)',
      },
      '& $moveRight': {
        transform: 'translateX(8px)',
      },
    },
    [breakpoints.up('sm')]: {
      minWidth: 400,
    },
  },
  rotate: {
    transform: 'rotate(180deg)',
  },
  left: {
    borderTopLeftRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    flexBasis: '33.33%',
    display: 'flex',
    backgroundColor: palette.primary.main,
  },
  media: {
    margin: 'auto',
    width: 140,
    height: 140,
    borderRadius: '50%',
  },
  right: {
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    flex: 1,
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: lightColor,
  },
  label: {
    padding: '0 8px',
    maxWidth: '12ch',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  subheader: {
    fontSize: 12,
    margin: 0,
    color: palette.text.secondary,
  },
  path: {
    flex: 1,
    flexBasis: 72,
    padding: '0 4px',
  },
  line: {
    position: 'relative',
    margin: '20px 0 16px',
    borderBottom: '1px dashed rgba(0,0,0,0.38)',
  },
  plane: {
    position: 'absolute',
    display: 'inline-block',
    padding: '0 4px',
    fontSize: 32,
    backgroundColor: lightColor,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(90deg)',
    color: palette.primary.dark,
  },
  flight: {
    fontSize: 14,
    lineHeight: '24px',
    minWidth: 48,
    padding: '0 8px',
    borderRadius: 40,
    backgroundColor: palette.primary.light,
    color: palette.common.black,
    display: 'block',
  },
  moveLeft: {},
  moveRight: {},
}));
