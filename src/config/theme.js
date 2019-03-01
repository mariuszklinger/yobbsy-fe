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
      main: '#1d0f42',
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
      }
    },
  },
});

export { theme as default };