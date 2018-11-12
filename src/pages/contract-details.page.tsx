import * as React from 'react';

import ContractCard from './../components/ContractCard';
import contractService from '../services/contract.service';

interface IProps {
  match?: any;
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
    return this.state.loading ? 'Loading...' : <ContractCard contract={this.state.contract} />;
  }
}

export default ContractDetailsPage;