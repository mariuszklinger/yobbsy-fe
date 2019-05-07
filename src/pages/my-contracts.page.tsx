import * as React from 'react';
import { withStyles, StyleRulesCallback } from '@material-ui/core';

import ContractList from '../components/ContractList';
import contractSearchService from '../services/contract-search.service';
import ContractForm from '../components/ContractForm';
import MediumHeader from '../components/common/MediumHeader';

interface IProps {
  classes: any;
}

class MyContractsPage extends React.Component<IProps> {
  constructor(props: any) {
    super(props);

    contractSearchService.clearList();
    contractSearchService.getMyContracts();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <ContractForm
          context="CREATE"
          callback={contractSearchService.getMyContracts}
        />

        <div className={classes.offerList}>
          <MediumHeader>
            Your posted jobs
          </MediumHeader>

          <ContractList
            editable
          />
        </div>
      </div>
    );
  }
}

const styles = (theme: any) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  offerList: {
    backgroundColor: '#efefef',
    boxShadow: 'inset 6px 0px 20px 2px #e2e2e2',
    flex: 1,
    padding: theme.spacing.unit * 2,
    minHeight: '100vh',
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(MyContractsPage);