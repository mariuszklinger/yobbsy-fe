import * as React from 'react';
import { Typography, withStyles, StyleRulesCallback } from '@material-ui/core';

import ContractList from 'src/components/ContractList';
import contractSearchService from '../services/contract-search.service';

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
        <Typography
          align="left"
          variant="h5"
        >
          Your posted jobs
        </Typography>

        <ContractList
          editable
        />
      </div>
    );
  }
}

const styles = (theme: any) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(MyContractsPage);