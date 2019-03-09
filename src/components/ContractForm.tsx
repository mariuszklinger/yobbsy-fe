import * as React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';

import { toJS } from 'mobx';

import Button from '@material-ui/core/Button';
import { withStyles, Theme } from '@material-ui/core/styles';
import {
  TextField,
  MenuItem,
  StyleRulesCallback,
  Switch,
  Typography
} from '@material-ui/core';

import LocationSelect from './LocationSelect';
import TagSelect from './TagSelect';

import ContractService from '../services/contract.service';
import ContractSearchService from '../services/contract-search.service';
import userService from '../services/user.service';

import { currencies, notices } from '../consts/dicts';
import { AUTH_MODAL_MODE } from './AuthModal';
import { Formik, FormikActions } from 'formik';
import * as Yup from 'yup';
import { getEmptyContract } from './../services/contract.service';

interface IProps {
  classes: any;
  context: 'SEARCH' | 'CREATE' | 'EDIT';
}

interface IFormValues extends Contract.IContractFull {
  setPassword: boolean;
  password: string;
  passwordRepeated: string;
}

export const SEARCH_FORM_ID = 'search-contract-form';
export const ADD_FORM_ID = 'add-contract-form';

const schema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Write few words about your dream position'),
  email: Yup.string().email('Invalid email').required('E-mail is required'),
  notice: Yup.string().required('Notice is required'),
  salary: Yup.number().typeError('Provide valid number').required('Salary is required'),
  currency: Yup.string().required('Currency is required'),
  password: Yup.string(),
  passwordRepeated: Yup.string().oneOf([Yup.ref('password'), ''], 'Passwords do not match').test('password_repeat', 'omg', function (value) {
    console.log(this.resolve(Yup.ref('password')));
    return !!this.resolve(Yup.ref('password')) ? !!value : true;
  }),
});

@observer
class ContractForm extends React.Component<IProps> {

  inInSearchMode = () => this.props.context === 'SEARCH'
  inInCreateMode = () => this.props.context === 'CREATE'
  inInEditMode = () => this.props.context === 'EDIT'
  createAccountEnabled = () => this.inInCreateMode() && !userService.isLoggedIn;

  handleLocationSelect = (setFieldValue: any) => (locations: Contract.ILocation[]) => {
    setFieldValue('locations', [...locations]);
  }

  handleSkillSelect = (setFieldValue: any) => (values: any) => {
    const skills = [...values]
      .map((record: any) => ({ proficiency: 10, tag: toJS(record)}));

    setFieldValue('skills', skills);
  }

  onSubmit = (values: IFormValues, { setSubmitting }: FormikActions<IFormValues>) => {
    setSubmitting(true);
    const save = ContractService.save;
    const search = ContractSearchService.search;

    // search function requires active hunter account
    const notHunter = !userService.isHunter;
    if (this.inInSearchMode() && notHunter) {
      userService.openLoginForm(AUTH_MODAL_MODE.REGISTER);
      return;
    }

    const action = this.inInCreateMode() || this.inInEditMode() ? save : search;
    action(values).then(() => setSubmitting(false));
  }

  render() {
    const { classes } = this.props;
    const searchMode = this.inInSearchMode();

    const initValues = {
      ...getEmptyContract(),
      setPassword: true,
      password: '',
      passwordRepeated : '',

      salary: 5000,
      currency: 'USD',
      title: 'CEO of stuff',
      description: 'I know everything, have a lot experience, give me the job. Lorem ipsum solor et al mirl.',
      locations: [
        { label: 'Miami, United States', name: 'Miami', country: 'United States' },
        { label: 'Gdańsk, Poland', name: 'Gdańsk', country: 'Poland' },
      ],
      notice: 0,
      skills: [
        {
          proficiency: 10,
          tag: { value: '1', label: 'java', name: 'java' },
        },
        {
          proficiency: 10,
          tag: { value: '2', label: 'javascript', name: 'javascript' },
        }
      ],
      email: 'dasdas21312zaaada@asdsada.pl',
    };

    return (
      <div className={classes.root}>
      <Formik<IFormValues>
        initialValues={initValues}
        validationSchema={schema}
        onSubmit={this.onSubmit}
        isInitialValid
        render={({ values, errors, isValid, handleChange, handleSubmit, setFieldValue, isSubmitting }) => (
          <form className={classes.container} onSubmit={handleSubmit}>
            <Typography
              id={searchMode ? SEARCH_FORM_ID : ADD_FORM_ID}
              align="left"
              variant="h4"
              className={classes.header}
            >
              { this.inInSearchMode() && 'Find your candidate'}
              { this.inInEditMode() && 'Edit your offer'}
              { this.inInCreateMode() && 'Post your dream job'}
            </Typography>

            <TextField
              name="title"
              label="Job title"
              className={classes.textField}
              type="text"
              margin="normal"
              fullWidth
              value={values.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title || 'Your dream job position'}
            />

            { this.inInCreateMode() &&
              <TextField
                name="description"
                label="Description"
                className={classes.textField}
                type="text"
                multiline
                rowsMax="4"
                margin="normal"
                fullWidth
                value={values.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description || 'Provide some extra info'}
              />
            }

            <TextField
              name="salary"
              label="Salary"
              value={values.salary}
              className={classNames(classes.textField50percent, classes.salary)}
              margin="normal"
              type="number"
              onChange={handleChange}
              error={!!errors.salary}
              helperText={errors.salary || 'Minimal accepting salary (monthly)'}
            />

            <TextField
              name="currency"
              className={classNames(classes.textField50percent, classes.currency)}
              select
              label="Currency"
              value={values.currency}
              onChange={handleChange}
              error={!!errors.currency}
              helperText={errors.currency || 'Please select your currency'}
              margin="normal"
              style={{ textAlign: 'left' }}
            >
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TagSelect
              selected={values.skills}
              onChange={this.handleSkillSelect(setFieldValue)}
            />

            <LocationSelect
              selected={values.locations}
              onChange={this.handleLocationSelect(setFieldValue)}
            />

            <TextField
              name="notice"
              label="Notice period"
              value={values.notice}
              className={classes.textField}
              type="number"
              margin="normal"
              onChange={handleChange}
              error={!!errors.notice}
              helperText={errors.notice || 'How fast you can start new job? (months)'}
              select
              fullWidth
            >
              {notices.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            { this.createAccountEnabled() &&
              <TextField
                name="email"
                label="Email"
                className={classes.textField}
                type="email"
                value={values.email}
                autoComplete="email"
                margin="normal"
                fullWidth
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email || 'E-mail will be hidden from recruiter'}
              />
            }

            { this.createAccountEnabled() &&
              <Typography
                className={classes.textField}
                style={{ textAlign: 'left' }}
                variant="subtitle1"
              >
                Set your own password?
                <Switch
                  name="setPassword"
                  checked={values.setPassword}
                  onClick={(_: any) => setFieldValue('setPassword', !values.setPassword)}
                  color="secondary"
                />
              </Typography>
            }

            { this.createAccountEnabled() && values.setPassword && <>
              <TextField
                name="password"
                value={values.password}
                label="Password"
                className={classes.textField}
                autoComplete="password"
                type="password"
                margin="normal"
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password || ''}
                fullWidth
              />
              { values.password && (
                <TextField
                  name="passwordRepeated"
                  value={values.passwordRepeated}
                  label="Repeat password"
                  className={classes.textField}
                  type="password"
                  margin="normal"
                  autoComplete="password"
                  error={!!errors.passwordRepeated}
                  helperText={errors.passwordRepeated}
                  fullWidth
                  onChange={handleChange}
                />
              )}
            </>}

            <div className={classes.actionWrapper}>
              <Button
                disabled={!isValid || isSubmitting}
                color="secondary"
                variant="contained"
                type="submit"
              >
                { this.inInSearchMode() && 'Search'}
                { this.inInCreateMode() && 'Submit'}
                { this.inInEditMode() && 'Update'}
              </Button>
            </div>
          </form>
        )}
        />
      </div>
    );
  }
}

const styles = (theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    maxWidth: 600,
    marginBottom: -2 * theme.spacing.unit,

    [theme.breakpoints.down(700)]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    display: 'flex',
    flexWrap: 'wrap',
    padding: 2 * theme.spacing.unit,
    paddingLeft: 3 * theme.spacing.unit,
    paddingRight: 3 * theme.spacing.unit,

    [theme.breakpoints.down(700)]: {
      padding: theme.spacing.unit,
    },
  },
  actionWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
  },
  textField: {
    // flex: 'auto',
  },
  header: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  textField50percent: {
    flex: '0 1 calc(50% - 10px)',
  },
  currency: {
    marginLeft: 10,
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(ContractForm);
