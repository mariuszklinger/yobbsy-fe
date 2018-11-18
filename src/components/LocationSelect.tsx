import * as React from 'react';
import Async from 'react-select/lib/Async';
import { withStyles, StyleRulesCallback } from '@material-ui/core';

import ContractService from '../services/contract.service';
import './multiselect.scss';
import classNames from 'classnames';

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
        className={classNames('multiselect', classes.textField)}
        components={{ DropdownIndicator: () => null, }}
        isMulti={true}
        loadOptions={ContractService.getLocations}
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
    flex: 'auto',
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(LocationSelect);
