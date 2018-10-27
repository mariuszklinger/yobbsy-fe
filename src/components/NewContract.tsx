import * as React from 'react';
import Async from 'react-select/lib/Async';
import AsyncCreatable from 'react-select/lib/AsyncCreatable';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField, MenuItem, StyleRulesCallback, Switch, Typography } from '@material-ui/core';

import axios from 'axios';

import './NewContract.scss';

interface IProps {
  classes: any;
}

const currencies = [
  {
    value: 'USD',
    label: 'USD ($)',
  },
  {
    value: 'EUR',
    label: 'EUR (€)',
  },
  {
    value: 'BTC',
    label: 'BTC (฿)',
  },
  {
    value: 'JPY',
    label: 'JPY (¥)',
  },
  {
    value: 'PLN',
    label: 'PLN',
  },
];

const filterList = (list: any, inputValue: string) => {

  const l = list.filter(({ name } : any) =>
    name
      .toLowerCase()
      .includes(inputValue.toLowerCase())
  )
  .map((obj: any) => ({ value: obj.name, label: `${obj.name}, ${obj.country}` }));
  return l;
}

const loadOptions = (inputValue: string, callback: any) => {
  axios.get(`http://localhost:8000/core/location?name=${inputValue}`).then(({ data }) => {
    callback(filterList(data.results, inputValue));
  });
};

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
    tags: [] as any,
  };

  handleChange = (name: string) => (event: any) => {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleSwitch = (name: string) => (event: any) => {
    this.setState({ [name]: event.target.checked });
  }

  handleMultiSelect = (key: string) => (tags: any) => {
    this.setState({ tags: [ ...tags ]});
  }

  onSubmit = (event: any) => {
    event.preventDefault();
  }

  render() {
    const { classes }:any = this.props;
    const { tags }:any = this.props;

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

          <AsyncCreatable
            placeholder="Job keywords"
            value={tags}
            onChange={this.handleMultiSelect('tags')}
            components={{ DropdownIndicator: () => null }}
            className="new-contract__tag-select"
            isMulti={true}
            loadOptions={loadOptions}
            allowCreateWhileLoading={true}
          />

          <Async
            placeholder="Desired locations"
            value={tags}
            onChange={this.handleMultiSelect('locations')}
            className="new-contract__tag-select"
            components={{ DropdownIndicator: () => null }}
            isMulti={true}
            loadOptions={loadOptions}
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

          <TextField
            label="Notice period"
            value={this.state.notice}
            className={classes.textField}
            type="number"
            margin="normal"
            onChange={this.handleChange('notice')}
            helperText="How fast you can start new job? (months)"
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
              label="Email"
              className={classes.textField}
              type="email"
              name="email"
              autoComplete="email"
              margin="normal"
              fullWidth={true}
              onChange={this.handleChange('email')}
            />

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
