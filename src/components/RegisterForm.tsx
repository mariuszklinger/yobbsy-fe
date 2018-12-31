import * as React from 'react';
import { observer } from 'mobx-react';
import { Formik } from 'formik';

import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  StyleRulesCallback,
  Button,
} from '@material-ui/core';

import userService from 'src/services/user.service';
import { Typography, Switch } from '@material-ui/core';

type FormType = 'REGISTRATION' | 'LOGIN';

interface IProps {
  classes: any;
  type?: FormType;
}

interface IFormValues {
  email: string,
  password: string,
  password2: string,
  hunter: boolean,
  company?: string,
}

@observer
class RegisterForm extends React.Component<IProps> {
  register = (values: IFormValues) => {
    console.log('elo');
    console.log(values);
  }

  componentDidMount() {
    userService.closeLoginForm();
  }

  render() {
    const { classes } = this.props;

    return (
      <Formik
        initialValues={{
          email: '',
          password: '',
          password2: '',
          hunter: false,
          company: '',
        }}
        onSubmit={this.register}
        render={({ values, handleChange, handleSubmit }: any) => (
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
              className={classes.textField}
              onChange={handleChange}
            />

            <Typography
              className={classes.textField}
              style={{ textAlign: 'left' }}
              variant="subtitle1"
            >
              Are you a recruiter?
              <Switch
                name="hunter"
                checked={values.hunter}
                onChange={handleChange}
                value={values.hunter}
                color="secondary"
              />
            </Typography>

            {values.hunter && (
            <>
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
                label="After activation, you will get some starting credits"
                value={15}
                margin="normal"
                className={classes.textField}
                disabled
                helperText="You can use them to contact candidates"
              />
            </>
            )}

            <Button
              type="submit"
              className={classes.textField}
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

export default withStyles(styles as StyleRulesCallback<string>)(RegisterForm);