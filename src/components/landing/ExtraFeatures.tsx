import * as React from 'react';
// import { observer } from 'mobx-react';

import { withStyles, StyleRulesCallback, Theme } from '@material-ui/core';
import features from '../../assets/second.png';

// import ContractCard from './ContractCard';
// import contractSearchService from 'src/services/contract-search.service';
import { featureSectionStyle } from './common';

interface IProps {
  classes: any;
}

const MainFeatures = ({ classes }: IProps) => {
  return (
    <div className={classes.root}>
      <img src={features} className={classes.placeholderimg} />
    </div>
  );
}

const styles = (theme: Theme) => ({
  ...featureSectionStyle(theme),
});

export default withStyles(styles as StyleRulesCallback<string>)(MainFeatures);