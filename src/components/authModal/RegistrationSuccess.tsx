import * as React from 'react';

import { withStyles, StyleRulesCallback, Typography, Theme, Button } from '@material-ui/core';
import Logo from '../common/Logo';

interface IProps {
  classes: any;
  onClose: () => void;
}

const RegistrationSuccess = ({ classes, onClose }: IProps) => {
  return (
    <div className={classes.root}>
      {/* <Logo className={classes.logo} /> */}

      <Typography variant="subtitle2" color="secondary">
        Registration complete! You will get notice when account will be available, stay tuned!
      </Typography>

      <Button
        size="small"
        color="secondary"
        variant="contained"
        onClick={onClose}
        fullWidth
      >
        Close
      </Button>
    </div>
  );
}

const styles = (theme: Theme) => ({
  root: {
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(RegistrationSuccess);