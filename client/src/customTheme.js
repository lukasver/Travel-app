import { createMuiTheme } from '@material-ui/core/styles';

export const myCustomTheme = createMuiTheme({
  palette: {
    tertiary: {
      light: '#787a9b',
      main: '#4b4e6d',
      dark: '#212642',
    },
    secondary: {
      light: '#ffffff',
      main: '#ede7e3',
      dark: '#bbb5b1',
    },
    primary: {
      light: '#61d3be',
      main: '#25a18e',
      dark: '#007261',
    },
  },
});

myCustomTheme.overrides = {
  MuiTooltip: {
    tooltip: {
      backgroundColor: myCustomTheme.palette.common.black,
      color: myCustomTheme.palette.common.white,
      fontSize: '0.7rem',
    },
  },
};
