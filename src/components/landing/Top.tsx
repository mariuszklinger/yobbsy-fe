import * as React from 'react';
// import { observer } from 'mobx-react';

import { withStyles, StyleRulesCallback, Typography, Theme, Button } from '@material-ui/core';
import Logo from '../common/Logo';
// import Modal from '../common/Modal';

// import ContractCard from './ContractCard';
// import contractSearchService from 'src/services/contract-search.service';

interface IProps {
  classes: any;
}

const Top = ({ classes }: IProps) => {
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
        <Button variant="contained" color="secondary" className={classes.addOfferButton}>
          + Add offer
        </Button>

        <Button variant="outlined" color="secondary">
          Find your candidate
        </Button>
      </div>

      {/* <Modal title="elo" open={true}><span>elo elo</span></Modal> */}
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
        marginRight: 0,
        marginBottom: theme.spacing.unit,
        maxWidth: 400,
        width: '100%',
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
      marginTop: 0,
      marginBottom: theme.spacing.unit,
      width: 200,
    }
  },
  addOfferButton: {
    marginRight: theme.spacing.unit / 2,
  }
});

export default withStyles(styles as StyleRulesCallback<string>)(Top);