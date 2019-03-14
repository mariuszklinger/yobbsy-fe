import * as React from 'react';
// import { observer } from 'mobx-react';

import { withStyles, StyleRulesCallback, Theme } from '@material-ui/core';
import table_img from './extraFeatures/table_img.svg';

// import ContractCard from './ContractCard';
// import contractSearchService from 'src/services/contract-search.service';
import { featureSectionStyle } from './common';

interface IProps {
  classes: any;
}

const MainFeatures = ({ classes }: IProps) => {
  return (
    <div className={classes.root}>
      <div className={classes.features}>
        blabla
      </div>
    </div>
  );
}

const styles = (theme: Theme) => ({
  root: {
    ...featureSectionStyle(theme),
    backgroundImage: `url(${table_img})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom center',
  },
  features: {
    backgroundColor: 'white',
  }
});

export default withStyles(styles as StyleRulesCallback<string>)(MainFeatures);