import * as React from 'react';
import { observer } from 'mobx-react';

import LoginForm from './LoginForm';

import { withStyles } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  StyleRulesCallback,
  LinearProgress
} from '@material-ui/core';

import userService from 'src/services/user.service';
import appService from 'src/services/app.service';

interface IProps {
  classes: any;
}

@observer
class LogInModal extends React.Component<IProps> {
  render() {
    const { classes } = this.props;

    return (
      <Dialog
        fullScreen={false}
        open={userService.isLogInFormOpened}
        onBackdropClick={userService.closeLoginForm}
        onClose={userService.closeLoginForm}
      >
        <DialogTitle
          id="responsive-dialog-title"
          className={classes.textField}
        >
          Log in or create new account. <br />
          We DO NOT share any of your personal details.
        </DialogTitle>

        { appService.isLoading && <LinearProgress /> }
        <DialogContent>
          <DialogContentText
            className={classes.textField}
          >
            Log in and start your prey for job
          </DialogContentText>
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }
}

const styles = (theme: any) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    flex: '1 100%',
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(LogInModal);