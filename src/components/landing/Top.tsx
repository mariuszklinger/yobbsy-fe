import * as React from 'react';

import { withStyles, StyleRulesCallback, Typography, Theme, Button } from '@material-ui/core';
import Logo from '../common/Logo';
import { ADD_FORM_ID } from '../ContractForm';
import { SEARCH_FORM_ID } from './../ContractForm';

interface IProps {
  classes: any;
}

function scrollTo(id: string) {
  const element = document.getElementById(id);
  element.scrollIntoView();
}

const Top = ({ classes }: IProps) => {

  const scrollToNewContract = () => scrollTo(ADD_FORM_ID);
  const scrollToSearchContract = () => scrollTo(SEARCH_FORM_ID);

  return (
    <div className={classes.root}>
      <Logo className={classes.logo} />

      <Typography
        className={classes.lead}
        variant="h3"
        color="textSecondary"
      >
        Leave your <b>job requirements</b><br />and forget the rest!
      </Typography>

      <ul>
        <li>
          <Typography className={classes.features} variant="h6">no more useless connection request</Typography>
        </li>
        <li>
          <Typography className={classes.features} variant="h6">fully <b>anonymous</b> - no one will know your identity until both sides reveal</Typography>
        </li>
        <li>
          <Typography className={classes.features} variant="h6">job offers perfectly tailored for you</Typography>
        </li>
      </ul>

      <div className={classes.buttonRow}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.addOfferButton}
          onClick={scrollToNewContract}
        >
          + Add offer
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={scrollToSearchContract}
        >
          Find your candidate
        </Button>
      </div>
    </div>
  );
}

const styles = (theme: Theme) => ({
  root: {
    backgroundImage: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
    minHeight: '60vh',
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    boxShadow: '0px 9px 20px 2px #ccc',

    '& li': {
      color: theme.palette.common.white,
    },

    [theme.breakpoints.down(600)]: {
      padding: theme.spacing.unit,
    },
  },
  buttonRow: {
    marginBottom: theme.spacing.unit * 1,
    marginTop: theme.spacing.unit * 2,

    [theme.breakpoints.down(600)]: {
      textAlign: 'center',

      '& > button': {
        fontSize: 16,
        marginRight: 0,
        marginBottom: 22,
        maxWidth: 400,
        height: 45,
        width: 240,
      },
    }
  },
  lead: {
    color: theme.palette.common.white,

    [theme.breakpoints.down(600)]: {
      fontSize: 24,
      lineHeight: 1.4,
    }
  },
  features: {
    color: '#b3a9d4',
  },
  logo: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,

    [theme.breakpoints.down(600)]: {
      // marginTop: 0,
      marginBottom: theme.spacing.unit,
      width: 200,
    }
  },
  addOfferButton: {
    marginRight: theme.spacing.unit / 2,
  }
});

export default withStyles(styles as StyleRulesCallback<string>)(Top);