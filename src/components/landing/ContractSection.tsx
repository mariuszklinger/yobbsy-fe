import * as React from 'react';
// import { observer } from 'mobx-react';

import { withStyles, StyleRulesCallback, Theme } from '@material-ui/core';
// import Modal from '../common/Modal';

// import ContractCard from './ContractCard';
// import contractSearchService from 'src/services/contract-search.service';
import ContractForm from 'src/components/ContractForm';

interface IProps {
  classes: any;
}

const ContractSection = ({ classes }: IProps) => {
  return (
    <div className={classes.root}>

      <ContractForm context="CREATE" />
    </div>
  );
}

const styles = (theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing.unit,
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(ContractSection);