import * as React from 'react';
import { withStyles, StyleRulesCallback, Theme } from '@material-ui/core';

import ContractCard from './../components/ContractCard';
import contractService from '../services/contract.service';
import ContractForm from '../components/ContractForm';

interface IProps {
  match?: any;
  editing: boolean;
  classes: any;
}

interface IState {
  loading: boolean;
  contract: Contract.IContractFull,
}


class ContractDetailsPage extends React.Component<IProps, IState> {
  state = {
    loading: true,
    contract: null as any,
  }

  constructor(props: IProps) {
    super(props);

    const id = props.match.params.id;

    contractService
      .getContract(id)
      .then(this.setContract);
  }

  setContract = (contract: Contract.IContractFull) => {
    this.setState({ contract, loading: false });
  }

  render() {
    const { loading, contract } = this.state;
    const { classes } = this.props;
    const editing = this.props.match.params.edit === 'edit';

    if (loading) {
      return null; // TODO: placeholder form
    }

    if (editing) {
      return <ContractForm contract={contract} context="EDIT" />;
    }

    return <div className={classes.wrapper}>
      <ContractCard contract={contract} />
    </div>;
  }
}

const styles = (theme: Theme) => ({
  wrapper: {
    padding: theme.spacing.unit * 2,
  },
});


export default withStyles(styles as StyleRulesCallback<string>)(ContractDetailsPage);