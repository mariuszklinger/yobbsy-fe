import * as React from 'react';

import { withStyles, StyleRulesCallback, Typography, Theme, Button } from '@material-ui/core';
import Logo from '../common/Logo';

interface IProps {
  classes: any;
}

const RegistrationSuccess = ({ classes }: IProps) => {
  return (
    <div className={classes.root}>
      <Logo className={classes.logo} />

      <Typography variant="subtitle2" color="secondary">
        Registration complete! You will get notice when account will be available, stay tuned!
      </Typography>
    </div>
  );
}

const styles = (theme: Theme) => ({
  root: {
    padding: theme.spacing.unit,
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(RegistrationSuccess);