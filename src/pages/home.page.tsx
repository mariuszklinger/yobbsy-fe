import * as React from 'react';

// import Logo from './../components/common/Logo';
import ContractForm from 'src/components/ContractForm';
import Top from 'src/components/landing/Top';

class HomePage extends React.Component<{}> {
  render() {
    return (
      <>
        <Top />

        <ContractForm context="CREATE" />
        <ContractForm context="SEARCH" />
      </>
    );
  }
}

export default HomePage;