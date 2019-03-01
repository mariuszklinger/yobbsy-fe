import * as React from 'react';

import ContractForm from 'src/components/ContractForm';
import Top from 'src/components/landing/Top';
import MainFeatures from 'src/components/landing/MainFeatures';
import ContractSection from 'src/components/landing/ContractSection';

class HomePage extends React.Component<{}> {
  render() {
    return (
      <>
        <Top />
        <MainFeatures />

        <ContractSection />
        <ContractForm context="SEARCH" />
      </>
    );
  }
}

export default HomePage;