import * as React from 'react';
import Async from 'react-select/lib/Async';

import ContractService from '../services/contract.service';
import './multiselect.scss';

interface IProps {
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

    return (
      <Async
        placeholder="Desired locations"
        value={locations}
        onChange={this.onChange}
        className="multiselect"
        components={{ DropdownIndicator: () => null, }}
        isMulti={true}
        loadOptions={ContractService.getLocations}
      />
    );
  }
}

export default LocationSelect;