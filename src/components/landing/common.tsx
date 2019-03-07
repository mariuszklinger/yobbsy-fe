import { Theme } from '@material-ui/core';

export const sectionStyle = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing.unit,

    [theme.breakpoints.down(600)]: {
      paddingLeft: 0,
      paddingRight: 0,
      backgroundColor: theme.palette.common.white,
    },
  },
});

export const featureSectionStyle = (theme: Theme) => ({
  root: {
    minHeight: '60vh',
    maxWidth: '100vw',
    overflow: 'hidden',
  },
  placeholderimg: {
    height: 550,
  }
});