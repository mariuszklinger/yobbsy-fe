import * as React from 'react';

import ContractForm from '../components/ContractForm';
import ContractList from '../components/ContractList';

class SearchPage extends React.Component<{}> {
  render() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <ContractForm context="SEARCH" />
        <ContractList />
      </div>
    );
  }
}

export default SearchPage;