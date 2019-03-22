import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },

  breakpoints: {
    values: {
      lg: 1280,
      md: 960,
      sm: 700,
      xl: 1920,
      xs: 0,
    },
  },

  spacing: {
    unit: 30,
  },

  palette: {
    primary: {
      main: '#111d29',
      light: '#5e4e8f',
    },
    secondary: {
      main: '#fe8101',
    },
  },

  overrides: {
    // Name of the component ⚛️ / style sheet
    MuiButton: {
      // Name of the rule
      root: {
        // Some CSS
        // color: 'white',
        minWidth: 230,
      },

      raised: {
        color: 'white',
      },
    },
  },
});

export { theme as default };
