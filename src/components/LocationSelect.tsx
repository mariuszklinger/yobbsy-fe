import * as React from 'react';
import Async from 'react-select/lib/Async';
import { withStyles, StyleRulesCallback } from '@material-ui/core';

import ContractService from '../services/contract.service';
import getStyles from '../styles/multiselect';

interface IProps {
  classes: any;
  selected: any[];
  onChange: (values: any) => void;
}

class LocationSelect extends React.Component<IProps> {
  state = {
    locations: [] as any,
  }

  componentDidMount() {
    this.setState({ locations: this.props.selected });
  }

  onChange = (values: any) => {
    this.setState({ locations: [ ...values ] });
    this.props.onChange(values);
  }

  render() {
    const { locations } = this.state;
    const { classes } = this.props;

    return (
      <Async
        placeholder="Desired locations"
        value={locations}
        onChange={this.onChange}
        className={classes.multiselect}
        components={{ DropdownIndicator: () => null, }}
        isMulti={true}
        loadOptions={ContractService.getLocations}
      />
    );
  }
}

export default withStyles(getStyles as StyleRulesCallback<string>)(LocationSelect);
