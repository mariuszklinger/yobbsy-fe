import * as React from 'react';

import ContractForm from 'src/components/ContractForm';
import Top from 'src/components/landing/Top';
import MainFeatures from 'src/components/landing/MainFeatures';

class HomePage extends React.Component<{}> {
  render() {
    return (
      <>
        <Top />
        <MainFeatures />

        <ContractForm context="CREATE" />
        <ContractForm context="SEARCH" />
      </>
    );
  }
}

export default HomePage;