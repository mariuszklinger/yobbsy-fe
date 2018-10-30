import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { TextField, MenuItem, StyleRulesCallback, Switch, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import LocationSelect from './LocationSelect';
import TagSelect from './TagSelect';

import ContractService from '../services/contract.service';
import { currencies, notices } from '../consts/dicts';

import './NewContract.scss';

interface IProps {
  classes: any;
}

class NewContract extends React.Component<IProps> {
  state = {
    createAccount: false,
    description: '',
    salary: 60000,
    currency: 'USD',
    notice: 0,
    email: '',
    password: '',
    password2: '',
    tags: [{ value: '1', label: 'java' }] as any,
    locations: [] as any,
  };

  handleChange = (name: string) => (event: any) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSwitch = (name: string) => (event: any) => {
    this.setState({ [name]: event.target.checked });
  }

  handleMultiSelect = (key: string) => (values: any) => {
    this.setState({ [key]: [ ...values ]});
  }

  onSubmit = (event: any) => {
    ContractService.saveContract(this.state);
    event.preventDefault();
  }

  render() {
    const { classes }:any = this.props;

    return (
      <div className="new-contract__wrapper">
        <form className={classes.container} onSubmit={this.onSubmit}>
          <TextField
            label="Job title"
            className={classes.textField}
            type="text"
            margin="normal"
            fullWidth={true}
            value={this.state.description}
            onChange={this.handleChange('description')}
            helperText="Your dream job position"
          />

          <TextField
            label="Salary"
            value={this.state.salary}
            className={classes.textField}
            type="number"
            margin="normal"
            onChange={this.handleChange('salary')}
            helperText="Minimal accepting salary "
          />

          <TextField
            className={classes.textField}
            select={true}
            label="Currency"
            value={this.state.currency}
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

          <TagSelect selected={this.state.tags} onChange={this.handleMultiSelect('tags')} />
          <LocationSelect onChange={this.handleMultiSelect('locations')} />

          <TextField
            label="Notice period"
            value={this.state.notice}
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

          <TextField
            label="Email"
            className={classes.textField}
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            fullWidth={true}
            onChange={this.handleChange('email')}
            helperText="E-mail will be hidden from recruiter"
          />

          <Typography className={classes.textField} style={{ textAlign: 'left' }} variant="subheading">
            Create account?
            <Switch
              checked={this.state.createAccount}
              onChange={this.handleSwitch('createAccount')}
              value="createAccount"
            />
          </Typography>
          {/* <Typography variant="subtitle2">You will be able easly manage your posts </Typography> */}

          { this.state.createAccount && <>
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
            { this.state.password && (
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

          <Button type="submit" fullWidth={true} variant="outlined">Post your dream job</Button>
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
  chip: {
    margin: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(NewContract);
