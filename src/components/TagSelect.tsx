import * as React from 'react';
import AsyncCreatable from 'react-select/lib/AsyncCreatable';
import { withStyles, StyleRulesCallback } from '@material-ui/core';
import classNames from 'classnames';

import ContractService from '../services/contract.service';

import './multiselect.scss';
import { observer } from 'mobx-react';

interface IProps {
  classes: any;
  selected: Contract.ISkill[];
  onChange: (values: any) => void;
}

@observer
class TagSelect extends React.Component<IProps> {

  ref: null; // TODO: ogarnac focus po wyborze

  getValues = () => this.props.selected.map((record: Contract.ISkill) => record.tag);

  render() {
    const { classes, onChange } = this.props;

    return (
      <AsyncCreatable
        ref={(el: any) => this.ref = el}
        placeholder="Job keyword"
        value={this.getValues()}
        onChange={onChange}
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
    flex: 'auto',
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(TagSelect);