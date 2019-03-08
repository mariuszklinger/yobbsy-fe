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

interface IProps {
  classes: any;
  context: 'SEARCH' | 'CREATE' | 'EDIT';
}

interface IState {
  createAccount: boolean;
}

export const SEARCH_FORM_ID = 'search-contract-form';
export const ADD_FORM_ID = 'add-contract-form';

@observer
class ContractForm extends React.Component<IProps, IState> {
  state: IState = {
    createAccount: false,
  };

  inInSearchMode = () => this.props.context === 'SEARCH'
  inInCreateMode = () => this.props.context === 'CREATE'
  inInEditMode = () => this.props.context === 'EDIT'

  handleChange = (name: string) => (event: any) => {
    const contract = {
      ...ContractService.contract,
      [name]: event.target.value,
    };

    ContractService.setContract(contract);
  }

  handleSwitch = (event: any) => {
    this.setState({ createAccount: event.target.checked });
  }

  handleMultiSelect = (key: string) => (values: any) => {
    const contract = {
      ...ContractService.contract,
      [key]: [ ...values ]
    };

    ContractService.setContract(contract);
  }

  handleSkillSelect = (values: any) => {
    const skills = [...values]
      .map((record: any) => ({ proficiency: 10, tag: toJS(record)}));

    const contract = {
      ...ContractService.contract,
      skills,
    };

    ContractService.setContract(contract);
  }

  onSubmit = (event: any) => {
    event.preventDefault();

    const save = ContractService.save;
    const search = ContractSearchService.search;

    // search function requires active hunter account
    const notHunter = !userService.isHunter;
    if (this.inInSearchMode() && notHunter) {
      userService.openLoginForm(AUTH_MODAL_MODE.REGISTER);
      return;
    }

    const action = this.inInCreateMode() || this.inInEditMode() ? save : search;
    action();
  }

  createAccountEnabled = () => {
    return this.inInCreateMode() && !userService.isLoggedIn;
  }

  render() {
    const { classes } = this.props;
    const { contract } = ContractService;

    const searchMode = this.inInSearchMode();

    return (
      <div className={classes.root}>
        <form
          className={classes.container}
          onSubmit={this.onSubmit}
        >
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
            label="Job title"
            className={classes.textField}
            type="text"
            margin="normal"
            fullWidth
            value={contract.title}
            onChange={this.handleChange('title')}
            helperText="Your dream job position"
          />

          { this.inInCreateMode() &&
            <TextField
              label="Description"
              className={classes.textField}
              type="text"
              multiline
              rowsMax="4"
              margin="normal"
              fullWidth
              value={contract.description}
              onChange={this.handleChange('description')}
              helperText="Provide some extra info"
            />
          }

          <TextField
            label="Salary"
            value={contract.salary}
            className={classNames(classes.textField50percent, classes.salary)}
            margin="normal"
            type="number"
            onChange={this.handleChange('salary')}
            helperText="Minimal accepting salary (monthly)"
          />

          <TextField
            className={classNames(classes.textField50percent, classes.currency)}
            select
            label="Currency"
            value={contract.currency}
            onChange={this.handleChange('currency')}
            helperText="Please select your currency"
            margin="normal"
            style={{ textAlign: 'left' }}
          >
            {currencies.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TagSelect selected={contract.skills} onChange={this.handleSkillSelect} />
          <LocationSelect selected={contract.locations} onChange={this.handleMultiSelect('locations')} />

          <TextField
            label="Notice period"
            value={contract.notice}
            className={classes.textField}
            type="number"
            margin="normal"
            onChange={this.handleChange('notice')}
            helperText="How fast you can start new job? (months)"
            select
          >
            {notices.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          { this.createAccountEnabled() &&
            <TextField
              label="Email"
              className={classes.textField}
              type="email"
              name="email"
              value={contract.email}
              autoComplete="email"
              margin="normal"
              fullWidth
              onChange={this.handleChange('email')}
              helperText="E-mail will be hidden from recruiter"
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
                checked={this.state.createAccount}
                onChange={this.handleSwitch}
                value="createAccount"
                color="secondary"
              />
            </Typography>
          }

          { this.createAccountEnabled() && this.state.createAccount && <>
            <TextField
              label="Password"
              className={classes.textField}
              type="password"
              name="password1"
              margin="normal"
              fullWidth
              onChange={this.handleChange('password')}
            />
            { contract.password && (
              <TextField
                label="Repeat password"
                className={classes.textField}
                type="password"
                name="password2"
                autoComplete="email"
                margin="normal"
                fullWidth
                onChange={this.handleChange('password2')}
              />
            )}
          </>}

          <div className={classes.actionWrapper}>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
            >
              { this.inInSearchMode() && 'Search'}
              { this.inInCreateMode() && 'Submit'}
              { this.inInEditMode() && 'Update'}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const styles = (theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    maxWidth: 600,
    height: 800,
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
    flex: 'auto',
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
