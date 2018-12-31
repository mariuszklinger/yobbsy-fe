import * as React from 'react';
import { observer } from 'mobx-react';

import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  StyleRulesCallback,
  Button,
} from '@material-ui/core';

import userService from 'src/services/user.service';
import { Link } from 'react-router-dom';

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
    username: 'hunter',
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

        <Link to="/register" className={classes.registerLink}>Register new account</Link>
      </form>
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
  registerLink: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    textAlign: 'right',
    marginTop: 25,
    display: 'block-inline',
    width: '100%',
  }
});

export default withStyles(styles as StyleRulesCallback<string>)(LogInForm);