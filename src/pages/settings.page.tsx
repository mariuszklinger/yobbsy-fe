import * as React from 'react';
import * as Yup from 'yup';
import { withStyles, StyleRulesCallback, Theme, WithStyles, Typography, TextField, Switch } from '@material-ui/core';
import { Formik } from 'formik';

import MediumHeader from '../components/common/MediumHeader';
import Button from '@material-ui/core/Button';

const styles = (theme: Theme) => ({
  root: {
    paddingLeft: 4 * theme.spacing.unit,
    paddingRight: 4 * theme.spacing.unit,
    paddingTop: 2 * theme.spacing.unit,
    maxWidth: 600,

    [theme.breakpoints.down(700)]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
});

interface IProps extends WithStyles<typeof styles> {}

interface IFormValues {
  password: string;
  password2: string;
  notification: boolean;
  newsletter: boolean;
}

const schema = Yup.object().shape({
  password: Yup.string().max(50, 'Maximum length is 50'),
  password2: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords do not match')
    .test('password_repeat', 'Passwords do not match', function (value) {
      return !!this.resolve(Yup.ref('password')) ? !!value : true;
    }),
});

class Settings extends React.Component<IProps> {
  render() {
    const { classes } = this.props;

    const initValues: IFormValues = {
      password: '',
      password2: '',
      notification: true,
      newsletter: false,
    };

    return (
      <div className={classes.root}>

        <MediumHeader>Settings</MediumHeader>

        <Formik<IFormValues>
          initialValues={initValues}
          validationSchema={schema}
          onSubmit={() => alert('elo mordo!')}
          isInitialValid
          render={({ values, errors, isValid, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
            <form
              className={''}
              onSubmit={handleSubmit}
            >
              <MediumHeader variant="h5">Change password</MediumHeader>

              <TextField
                name="title"
                label="New password"
                type="password"
                margin="normal"
                fullWidth
                value={values.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password || 'Your dream job position'}
              />

              <TextField
                name="title"
                label="Repeat new password"
                type="password"
                margin="normal"
                fullWidth
                value={values.password2}
                onChange={handleChange}
                error={!!errors.password2}
                helperText={errors.password2 || 'Your dream job position'}
              />

              <Button
                disabled={!isValid || isSubmitting}
                color="secondary"
                variant="contained"
                type="submit"
              >
                Update
              </Button>

              <MediumHeader variant="h5">Notifications</MediumHeader>

              <Typography
                style={{ textAlign: 'left' }}
                variant="subtitle1"
              >
                E-mail notification
                <Switch
                  name="notification"
                  checked={values.notification}
                  color="secondary"
                  onChange={handleChange}
                />
              </Typography>

              <Typography
                style={{ textAlign: 'left' }}
                variant="subtitle1"
              >
                Newsletter
                <Switch
                  name="newsletter"
                  checked={values.newsletter}
                  color="secondary"
                  onChange={handleChange}
                />
              </Typography>

              <MediumHeader variant="h5">Delete Account</MediumHeader>
              <Button
                disabled={!isValid || isSubmitting}
                color="secondary"
                variant="contained"
                type="submit"
              >
                Delete all your data
              </Button>
            </form>
          )}
        />
      </div>
    );
  }
}

export default withStyles(styles as StyleRulesCallback<string>)(Settings);