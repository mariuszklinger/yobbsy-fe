import * as React from 'react';
import { Typography } from '@material-ui/core';

import ContractList from 'src/components/ContractList';
import contractSearchService from '../services/contract-search.service';

class MyContractsPage extends React.Component<{}> {
  constructor(props: any) {
    super(props);

    contractSearchService.clearList();
    contractSearchService.getMyContracts();
  }

  render() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <ContractList
          store={contractSearchService}
          editable={true}
        >
          <Typography
            align="left"
            variant="h2"
            style={{
              fontWeight: 'bold',
              paddingLeft: '50px',
              marginBottom: '50px',
              borderBottom: '5px solid #f50057'
            }}
          >
            Your posted jobs
          </Typography>
        </ContractList>
      </div>
    );
  }
}

export default MyContractsPage;