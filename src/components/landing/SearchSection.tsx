import * as React from 'react';
// import { observer } from 'mobx-react';

import { withStyles, StyleRulesCallback, Theme } from '@material-ui/core';
// import Modal from '../common/Modal';

// import ContractCard from './ContractCard';
// import contractSearchService from 'src/services/contract-search.service';
import ContractForm from 'src/components/ContractForm';
import { sectionStyle } from './common';

interface IProps {
  classes: any;
}

const NewContractSection = ({ classes }: IProps) => {
  return (
    <div className={classes.root}>

      <ContractForm context="SEARCH" className={classes.searchForm} />
    </div>
  );
}

const styles = (theme: Theme) => ({
  ...sectionStyle(theme),

  searchForm: {
    marginTop: -60,
  }
});

export default withStyles(styles as StyleRulesCallback<string>)(NewContractSection);