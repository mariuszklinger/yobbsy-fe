import * as React from 'react';
import { observer } from 'mobx-react';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { withStyles, Theme } from '@material-ui/core/styles';
import {
  TextField,
  StyleRulesCallback,
  Button,
} from '@material-ui/core';

import userService from '../../services/user.service';

interface IProps {
  classes: any;
}

@observer
class LogInForm extends React.Component<IProps> {

  logIn = (values: any) => {
    const { username, password } = values;
    userService.logIn(username, password);
  }

  render() {
    const { classes } = this.props;

    const initValues = {
      username: 'mariusz@admin.pl',
      password: 'admin',
    };

    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required(),
    });

    return (
      <Formik
        initialValues={initValues}
        validationSchema={schema}
        onSubmit={this.logIn}
        isInitialValid={true}
        render={({ values, errors, isValid, handleChange, handleSubmit }: any) => (
          <form
            onSubmit={handleSubmit}
            className={classes.root}
          >
            <TextField
              name="username"
              label="Login"
              value={values.username}
              margin="normal"
              className={classes.textField}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username || null}
            />

            <TextField
              name="password"
              label="Password"
              value={values.password}
              margin="normal"
              type="password"
              className={classes.textField}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password || null}
            />

            <Button
              type="submit"
              className={classes.textField}
              color="secondary"
              variant="contained"
              disabled={!isValid}
            >
              Log in
            </Button>
          </form>
        )}
      />
    );
  }
}

const styles = (theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    flex: '1 100%',
  },
  registerLink: {
    textAlign: 'right',
    marginTop: 25,
    display: 'block-inline',
    width: '100%',
  }
});

export default withStyles(styles as StyleRulesCallback<string>)(LogInForm);