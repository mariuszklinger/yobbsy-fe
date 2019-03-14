import * as React from 'react';

import ContractCard from './../components/ContractCard';
import contractService from '../services/contract.service';
import ContractForm from 'src/components/ContractForm';

interface IProps {
  match?: any;
  editing: boolean;
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
    const { loading } = this.state;
    const editing = this.props.match.params.edit === 'edit';

    if (loading) {
      return null; // TODO: placeholder form
    }

    if (editing) {
      return <ContractForm contract={this.state.contract} context="EDIT" />
    }

    return <ContractCard contract={this.state.contract} />;
  }
}

export default ContractDetailsPage;