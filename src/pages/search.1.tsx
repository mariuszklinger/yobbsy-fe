import * as React from 'react';

import ContractForm from 'src/components/ContractForm';
import ContractList from 'src/components/ContractList';

import ContractService from '../services/contract.service';

class SearchPage extends React.Component<{}> {
  render() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <ContractForm context="SEARCH" />
        <ContractList store={ContractService} />
      </div>
    );
  }
}

export default SearchPage;