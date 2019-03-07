import * as React from 'react';
import * as Yup from 'yup';
import { observer } from 'mobx-react';
import { Formik } from 'formik';

import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  StyleRulesCallback,
  Button,
} from '@material-ui/core';

import userService from 'src/services/user.service';
import { Typography, Switch, Theme } from '@material-ui/core';

type FormType = 'REGISTRATION' | 'LOGIN';

interface IProps {
  classes: any;
  type?: FormType;
}

interface IFormValues {
  email: string,
  password: string,
  password2: string,
  company?: string,
}

@observer
class RegisterForm extends React.Component<IProps> {
  register = (values: IFormValues) => {
    userService.register(values);
  }

  render() {
    const { classes } = this.props;

    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
          password2: '',
          company: '',
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Invalid e-mail address').required(),
          company: Yup.string().min(1, 'Too short').required(),
          password: Yup.string().min(5, 'Too Short!').required(),
          password2: Yup.string().oneOf([Yup.ref("password")], 'Password does not match').required(),

        })}
        onSubmit={this.register}
        render={({ values, errors, handleChange, handleSubmit, isValid }: any) => (
          <form
            onSubmit={handleSubmit}
            className={classes.container}
          >
            <TextField
              name="email"
              label="E-mail"
              value={values.email}
              margin="normal"
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email || null}
              className={classes.textField}
              onChange={handleChange}
            />

            <TextField
              name="password"
              label="Password"
              value={values.password}
              margin="normal"
              type="password"
              autoComplete="new-password"
              error={!!errors.password}
              helperText={errors.password || null}
              className={classes.textField}
              onChange={handleChange}
            />

            <TextField
              name="password2"
              label="Repeat password"
              value={values.password2}
              margin="normal"
              type="password"
              autoComplete="new-password"
              error={!!errors.password2}
              helperText={errors.password2 || null}
              className={classes.textField}
              onChange={handleChange}
            />

            <TextField
              name="company"
              label="Company name"
              value={values.company}
              margin="normal"
              autoComplete="company-name"
              className={classes.textField}
              onChange={handleChange}
            />

            <TextField
              label="After activation, you will get"
              value={'15 credits'}
              margin="normal"
              className={classes.textField}
              disabled
              helperText="You can use them to contact candidates"
            />

            <Button
              type="submit"
              className={classes.textField}
              disabled={!isValid}
              color="secondary"
              variant="contained"
            >
              Register
            </Button>
          </form>
        )}
      />
    );
  }
}

const styles = (theme: Theme) => ({
  container: {
    transition: '0.4s',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    flex: '1 100%',
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(RegisterForm);