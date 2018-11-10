import * as React from 'react';
import AsyncCreatable from 'react-select/lib/AsyncCreatable';
import { withStyles, StyleRulesCallback } from '@material-ui/core';
import classNames from 'classnames';

import ContractService from '../services/contract.service';

import './multiselect.scss';


interface IProps {
  classes: any;
  selected: any[];
  onChange: (values: any) => void;
}

class TagSelect extends React.Component<IProps> {
  state = {
    locations: [] as any,
  }

  ref: null; // TODO: ogarnac focus po wyborze

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
      <AsyncCreatable
        ref={(el: any) => this.ref = el}
        placeholder="Job keyword"
        value={locations}
        onChange={this.onChange}
        className={classNames('multiselect', classes.textField)}
        components={{ DropdownIndicator: () => null }}
        isMulti={true}
        loadOptions={ContractService.getTags}
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
    flex: 'auto',
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(TagSelect);