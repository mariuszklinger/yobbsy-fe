import * as React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';

import { toJS } from 'mobx';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  MenuItem,
  StyleRulesCallback,
  Switch,
  Typography
} from '@material-ui/core';

import LocationSelect from './LocationSelect';
import TagSelect from './TagSelect';

import ContractService, { IContractService } from '../services/contract.service';
import ContractSearchService from '../services/contract-search.service';
import userService from '../services/user.service';

import { currencies, notices } from '../consts/dicts';

import './ContractForm.scss';

interface IProps {
  classes: any;
  context: 'SEARCH' | 'CREATE';
  store: IContractService;
}

interface IState {
  createAccount: boolean;
}

@observer
class ContractForm extends React.Component<IProps, IState> {
  state: IState = {
    createAccount: false,
  };

  inSearchContext = () => this.props.context === 'SEARCH'
  inCreateContext = () => this.props.context === 'CREATE'

  handleChange = (name: string) => (event: any) => {
    const { store } = this.props;
    const contract = {
      ...store.contract,
      [name]: event.target.value,
    };

    store.setContract(contract);
  }

  handleSwitch = (event: any) => {
    this.setState({ createAccount: event.target.checked });
  }

  handleMultiSelect = (key: string) => (values: any) => {
    const { store } = this.props;
    const contract = {
      ...store.contract,
      [key]: [ ...values ]
    };

    store.setContract(contract);
  }

  handleSkillSelect = (values: any) => {
    const { store } = this.props;
    const skills = [...values]
      .map((record: any) => ({ proficiency: 10, tag: toJS(record)}));

    const contract = {
      ...store.contract,
      skills,
    };

    store.setContract(contract);
  }

  onSubmit = (event: any) => {
    const save = ContractService.save;
    const search = ContractSearchService.search;
    const action = this.inCreateContext() ? save : search;

    action();
    event.preventDefault();
  }

  createAccountEnabled = () => {
    return this.inCreateContext() && !userService.isLoggedIn;
  }

  render() {
    const { classes } = this.props;
    const { contract } = this.props.store;

    return (
      <div className="contract-form__wrapper">
        <form
          className={classes.container}
          onSubmit={this.onSubmit}
        >
          <Typography
            align="left"
            variant="h5"
            className={classes.textField}
            style={{ fontWeight: 'bold' }}
          >
            { this.inSearchContext() && 'Find your candidate'}
            { this.inCreateContext() && 'Post your dream job'}
          </Typography>

          <TextField
            label="Job title"
            className={classes.textField}
            type="text"
            margin="normal"
            fullWidth={true}
            value={contract.title}
            onChange={this.handleChange('title')}
            helperText="Your dream job position"
          />

          { this.inCreateContext() &&
            <TextField
              label="Description"
              className={classes.textField}
              type="text"
              multiline={true}
              rowsMax="4"
              margin="normal"
              fullWidth={true}
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
            onChange={this.handleChange('salary')}
            helperText="Minimal accepting salary (monthly)"
          />

          <TextField
            className={classNames(classes.textField50percent, classes.currency)}
            select={true}
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
            select={true}
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
              fullWidth={true}
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
              Create password?
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
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              fullWidth={true}
              onChange={this.handleChange('password')}
            />
            { contract.password && (
              <TextField
                label="Repeat password"
                className={classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                fullWidth={true}
                onChange={this.handleChange('password')}
              />
            )}
          </>}

          <Button
            type="submit"
            className={classes.textField}
            fullWidth={true}
            variant="outlined"
          >
            { this.inSearchContext() && 'Search'}
            { this.inCreateContext() && 'Submit'}
          </Button>
        </form>
      </div>
    );
  }
}

const styles = (theme: any) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  textField: {
    flex: 'auto',
  },

  textField50percent: {
    flex: '0 1 calc(50% - 10px)',
  },

  salary: {
  },

  currency: {
    marginLeft: '10px',
  }
});

export default withStyles(styles as StyleRulesCallback<string>)(ContractForm);
