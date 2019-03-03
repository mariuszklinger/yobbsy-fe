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
import withMobileDialog from '@material-ui/core/withMobileDialog';

import userService from 'src/services/user.service';
import appService from 'src/services/app.service';
import Modal from './common/Modal';
import { Typography, Divider, Theme } from '@material-ui/core';
import Logo from './common/Logo';
import Button from '@material-ui/core/Button';
import RegisterForm from './RegisterForm';

interface IProps {
  classes: any;
  fullScreen?: boolean;
}

enum MODE {
  LOGIN,
  REGISTER,
}

interface IState {
  mode: MODE,
}

@observer
class LogInModal extends React.Component<IProps, IState> {
  state: IState =  {
    mode: MODE.LOGIN,
  }

  toggleMode = () => {
    this.setState(
      (prev: IState) => ({ mode: prev.mode === MODE.LOGIN ? MODE.REGISTER : MODE.LOGIN })
    );
  }

  render() {
    const { classes, fullScreen } = this.props;
    const { mode } = this.state;

    // @ts-ignore
    const isRegister = mode === MODE.REGISTER;
    const isLogin = mode === MODE.LOGIN;

    return (
      <Modal
        // open={true}
        fullScreen={!!fullScreen}
        open={userService.isLogInFormOpened}
        onBackdropClick={userService.closeLoginForm}
        onClose={userService.closeLoginForm}
        className={classes.root}
      >
        { appService.isLoading && <LinearProgress className={classes.loader} /> }

        <Typography variant="headline">
          {/* <Logo /> */}
          { isLogin && 'Log in' }
          { isRegister && 'Register as a headhunter' }
        </Typography>

        <Typography variant="subtitle2">
          { isLogin && 'If you had already added your job offer, you can edit your posting' }
          { isRegister && 'After registration you will be able search for your perfect candidate' }
        </Typography>

        { isRegister && <RegisterForm /> }
        { isLogin && <LoginForm /> }

        <Divider className={classes.divider} />

        <Button variant="outlined" color="secondary" size="small" fullWidth>
          Add your dream position
        </Button>

        <Button onClick={this.toggleMode} variant="text" color="secondary" size="small" fullWidth>
          { isLogin && 'Register as recruiter' }
          { isRegister && 'Back to login page' }
        </Button>
      </Modal>
    );
  }
}

const styles = (theme: Theme) => ({
  root: {
  },
  divider: {
    marginTop: 15,
    marginBottom: 15,
  },
  loader: {
    overflow: 'hidden !important',
  },
});

export default withMobileDialog({breakpoint: 'xs'})(withStyles(styles as StyleRulesCallback<string>)(LogInModal));