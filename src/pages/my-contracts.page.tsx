import * as React from 'react';
import { Typography, withStyles, StyleRulesCallback } from '@material-ui/core';

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
        <ContractForm context="CREATE" />

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
    padding: theme.spacing.unit * 2,
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(MyContractsPage);