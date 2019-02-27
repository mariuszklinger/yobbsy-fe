import * as React from 'react';
// import { observer } from 'mobx-react';

import { withStyles, StyleRulesCallback, Typography, Theme, Button } from '@material-ui/core';
import Logo from '../common/Logo';

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
    </div>
  );
}

const styles = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    backgroundImage: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
    minHeight: '60vh',
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
  },
  buttonRow: {
    marginTop: theme.spacing.unit,
  },
  lead: {
    color: theme.palette.common.white,
  },
  features: {
    color: '#d9b9ff',
  },
  logo: {
    marginBottom: theme.spacing.unit * 2,
  },
  addOfferButton: {
    marginRight: theme.spacing.unit / 2,
  }
});

export default withStyles(styles as StyleRulesCallback<string>)(Top);