import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },

  spacing: {
    unit: 30,
  },

  palette: {
    primary: {
      main: '#490b91',
      light: '#6732a5',
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
      }
    },
  },
});

export { theme as default };