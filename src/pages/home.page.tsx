import * as React from 'react';

import Top from '../components/landing/Top';
import MainFeatures from '../components/landing/MainFeatures';
import ContractSection from '../components/landing/ContractSection';
import SearchSection from '../components/landing/SearchSection';
import ExtraFeatures from '../components/landing/ExtraFeatures';

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