import * as React from 'react';

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

import ContractService from '../services/contract.service';
import ContractSearchService from '../services/contract-search.service';
import { currencies, notices } from '../consts/dicts';

import './ContractForm.scss';
import { observer } from 'mobx-react';

interface IProps {
  classes: any;
  context: 'SEARCH' | 'CREATE';
}

interface IState {
  createAccount: boolean;
  success: boolean;
  contract: Contract.IContractFull;
}

@observer
class ContractForm extends React.Component<IProps, IState> {
  state: IState = {
    createAccount: false,
    success: true,
    contract: ContractService.contract,
  };

  inSearchContext = () => this.props.context === 'SEARCH'
  inCreateContext = () => this.props.context === 'CREATE'

  handleChange = (name: string) => (event: any) => {
    const contract = {
      ...this.state.contract,
      [name]: event.target.value,
    };

    this.setState({ contract, });
  }

  handleSwitch = (name: string) => (event: any) => {
    this.setState({ createAccount: event.target.checked });
  }

  handleMultiSelect = (key: string) => (values: any) => {
    const contract = {
      ...this.state.contract,
      [key]: [ ...values ]
    };

    this.setState({ contract, });
  }

  onSubmit = (event: any) => {
    const submitAction = this.inCreateContext() ?
      ContractService.save : ContractSearchService.search;

    submitAction(this.state.contract);
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;
    const { contract } = this.state;

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
            className={classes.textField}
            margin="normal"
            onChange={this.handleChange('salary')}
            helperText="Minimal accepting salary (monthly)"
          />

          <TextField
            className={classes.textField}
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

          <TagSelect selected={contract.skills} onChange={this.handleMultiSelect('skills')} />
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

          { this.inCreateContext() &&
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

          { this.inCreateContext() &&
            <Typography
              className={classes.textField}
              style={{ textAlign: 'left' }}
              variant="subtitle1"
            >
              Create account?
              <Switch
                checked={this.state.createAccount}
                onChange={this.handleSwitch('createAccount')}
                value="createAccount"
                color="secondary"
              />
            </Typography>
          }

          { this.inCreateContext() && this.state.createAccount && <>
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
                label="Repeat assword"
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
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    flex: 'auto',
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(ContractForm);
