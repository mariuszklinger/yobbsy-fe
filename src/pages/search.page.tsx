import * as React from 'react';

import ContractForm from 'src/components/ContractForm';
import ContractList from 'src/components/ContractList';

import ContractSearchService from '../services/contract-search.service';
import contractService from 'src/services/contract.service';

class SearchPage extends React.Component<{}> {
  render() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <ContractForm context="SEARCH" store={contractService} />
        <ContractList store={ContractSearchService} />
      </div>
    );
  }
}

export default SearchPage;