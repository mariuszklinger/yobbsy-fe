import * as React from 'react';
import { observer } from 'mobx-react';

import { withStyles } from '@material-ui/core/styles';
import {
  StyleRulesCallback,
  LinearProgress
} from '@material-ui/core';

import userService from '../services/user.service';
import appService from '../services/app.service';
import Modal from './common/Modal';
import { Typography, Divider, Theme } from '@material-ui/core';
import Logo from './common/Logo';
import Button from '@material-ui/core/Button';

import LoginForm from './authModal/LoginForm';
import RegisterForm from './authModal/RegisterForm';
import RegistrationSuccess from './authModal/RegistrationSuccess';

interface IProps {
  classes: any;
  fullScreen?: boolean;
}

export enum AUTH_MODAL_MODE {
  LOGIN,
  REGISTER,
}

interface IState {
  succeed: boolean,
}

@observer
class AuthModal extends React.Component<IProps, IState> {
  state: IState =  {
    succeed: false,
  }

  showSuccessPanel = () => {
    this.setState({ succeed: true });
  }

  render() {
    const { classes } = this.props;
    const { succeed } = this.state;
    const mode = userService.authModalMode;

    // @ts-ignore
    const isRegister = mode === AUTH_MODAL_MODE.REGISTER;
    const isLogin = mode === AUTH_MODAL_MODE.LOGIN;

    return (
      <Modal
        open={userService.isLogInFormOpened}
        onBackdropClick={userService.closeLoginForm}
        onClose={userService.closeLoginForm}
        className={classes.root}
      >
        { appService.isLoading && <LinearProgress className={classes.loader} /> }

        <Typography variant="h6">
          {/* <Logo /> */}
          { isLogin && <b>Sign in</b> }
          { isRegister && <b>Register as a headhunter</b> }
        </Typography>

        <Typography variant="subtitle2">
          { isLogin && 'If you had already added your job offer, you can edit your posting' }
          { isRegister && 'After registration you will be able search for your perfect candidate' }
        </Typography>

        {succeed && <RegistrationSuccess onClose={userService.closeLoginForm} />}

        {!succeed && <>
          { isRegister && <RegisterForm onSuccess={this.showSuccessPanel} /> }
          { isLogin && <LoginForm /> }

          <Divider className={classes.divider} />

          <Button variant="outlined" color="secondary" size="small" fullWidth>
            Add your dream position
          </Button>

          <Button onClick={userService.toggleAuthModalMode} variant="text" color="secondary" size="small" fullWidth>
            { isLogin && 'Register as recruiter' }
            { isRegister && 'Back to login page' }
          </Button>
        </>}
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

export default withStyles(styles as StyleRulesCallback<string>)(AuthModal);