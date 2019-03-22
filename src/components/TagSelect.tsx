import * as React from 'react';
import { observer } from 'mobx-react';
import AsyncCreatable from 'react-select/lib/AsyncCreatable';
import { withStyles, StyleRulesCallback } from '@material-ui/core';

import ContractService from '../services/contract.service';
import getStyles from '../styles/multiselect';

interface IProps {
  classes: any;
  selected: Contract.ISkill[];
  onChange: (values: any) => void;
}

@observer
class TagSelect extends React.Component<IProps> {
  getValues = () => this.props.selected.map((record: Contract.ISkill) => record.tag);

  render() {
    const { classes, onChange } = this.props;

    return (
      <AsyncCreatable
        placeholder="Job keyword"
        onChange={onChange}
        className={classes.multiselect}
        components={{ DropdownIndicator: () => null }}
        isMulti
        loadOptions={ContractService.getTags}
        value={this.getValues()}
      />
    );
  }
}

export default withStyles(getStyles as StyleRulesCallback<string>)(TagSelect);