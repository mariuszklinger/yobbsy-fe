import * as React from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import { TextField, Dialog, DialogTitle, DialogContent, DialogContentText, StyleRulesCallback, Button, LinearProgress } from '@material-ui/core';
import userService from 'src/services/user.service';
import appService from 'src/services/app.service';

type FormType = 'REGISTRATION' | 'LOGIN';

interface IProps {
  classes: any;
  type?: FormType;
}

interface IState {
  username: string;
  password: string;
  password2: string;
  type: FormType;
}

@observer
class LogInForm extends React.Component<IProps, IState> {
  state: IState = {
    username: 'mariusz',
    password: 'admin',
    password2: '',
    type: 'LOGIN'
  }

  constructor(props: IProps) {
    super(props);

    this.state = {
      ...this.state,
      type: props.type,
    };
  }

  logIn = (event: any) => {
    const { username, password } = this.state;
    userService.logIn(username, password);

    event.preventDefault();
  }

  handleChange = (name: string) => (event: any) => {
    const form = {
      ...this.state,
      [name]: event.target.value,
    };

    this.setState({ ...form });
  }

  render() {
    const { username, password } = this.state;
    const { classes } = this.props;

    return (
      <Dialog
        fullScreen={false}
        open={userService.isLogInFormOpened}
        onBackdropClick={userService.closeLoginForm}
        onClose={userService.closeLoginForm}
        aria-labelledby="responsive-dialog-title"
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

          <form
            onSubmit={this.logIn}
            className={classes.container}
          >
            <TextField
              label="Login"
              value={username}
              margin="normal"
              className={classes.textField}
              onChange={this.handleChange('username')}
            />

            <TextField
              label="Password"
              value={password}
              margin="normal"
              type="password"
              autoComplete="asd"
              className={classes.textField}
              onChange={this.handleChange('password')}
            />

            <Button
              type="submit"
              className={classes.textField}
              color="secondary"
              variant="contained"
            >
              Log in
            </Button>
          </form>
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

export default withStyles(styles as StyleRulesCallback<string>)(LogInForm);