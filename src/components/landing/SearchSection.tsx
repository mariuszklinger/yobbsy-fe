import * as React from 'react';

import { withStyles, StyleRulesCallback, Theme } from '@material-ui/core';

import ContractForm from '../ContractForm';
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