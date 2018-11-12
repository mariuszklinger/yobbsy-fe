import * as React from 'react';

import ContractForm from 'src/components/ContractForm';
import ContractList from 'src/components/ContractList';

import ContractSearchService from '../services/contract-search.service';

class SearchPage extends React.Component<{}> {
  render() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <ContractForm context="SEARCH" />
        <ContractList store={ContractSearchService} />
      </div>
    );
  }
}

export default SearchPage;