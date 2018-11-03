import * as React from 'react';
import AsyncCreatable from 'react-select/lib/AsyncCreatable';

import ContractService from '../services/contract.service';
import './multiselect.scss';

interface IProps {
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

    return (
      <AsyncCreatable
        ref={(el: any) => this.ref = el}
        placeholder="Job keyword"
        value={locations}
        onChange={this.onChange}
        className="multiselect"
        components={{ DropdownIndicator: () => null }}
        isMulti={true}
        loadOptions={ContractService.getTags}
      />
    );
  }
}

export default TagSelect;