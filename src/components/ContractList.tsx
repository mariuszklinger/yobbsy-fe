import * as React from 'react';
import { observer } from 'mobx-react';

import { withStyles, StyleRulesCallback } from '@material-ui/core';

import ContractCard from './ContractCard';
import contractSearchService from '../services/contract-search.service';
import Fade from 'react-reveal/Fade';

interface IProps {
  classes: any;
  children?: any;
  editable?: boolean;
}

@observer
class ContractList extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    contractSearchService.clearList();
  }

  render() {
    const { list } = contractSearchService;
    const { classes, editable } = this.props;

    const contractList = list.map((c: Contract.IContractShort) =>
      <Fade key={c.id}>
        <ContractCard
          contract={c}
          editable={editable} />
      </Fade>
    );

    return (
      <div className={classes.list}>
        { !!list.length && contractList }
        { !list.length && 'No results :(' /* TODO: loader */}
      </div>
    );
  }
}

const styles = (theme: any) => ({
  list: {
    paddingTop: theme.spacing.unit,
  }
});

export default withStyles(styles as StyleRulesCallback<string>)(ContractList);