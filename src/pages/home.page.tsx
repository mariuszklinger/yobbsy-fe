import * as React from 'react';

import Top from 'src/components/landing/Top';
import MainFeatures from 'src/components/landing/MainFeatures';
import ContractSection from 'src/components/landing/ContractSection';
import SearchSection from 'src/components/landing/SearchSection';
import ExtraFeatures from 'src/components/landing/ExtraFeatures';

class HomePage extends React.Component<{}> {
  render() {
    return (
      <>
        <Top />
        <MainFeatures />

        <ContractSection />
        <ExtraFeatures />
        <SearchSection />
      </>
    );
  }
}

export default HomePage;