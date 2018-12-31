import * as React from 'react';

import { Typography } from '@material-ui/core';

import contractService from '../services/contract.service';
import ContractCard from 'src/components/ContractCard';

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
  }

  componentDidMount() {
    const { hash, id } = this.props.match.params;
    contractService
      .confirmContract(id, hash)
      .then(this.setContract);
  }

  setContract = (contract: Contract.IContractFull) => {
    this.setState({ contract, loading: false });
  }

  render() {
    const { loading, contract } = this.state;
    if (!loading) {
      return <>
        <Typography variant="title">
          Contract is now visible
        </Typography>
        <ContractCard contract={contract} />
      </>;
    }

    return '';
  }
}

export default ContractDetailsPage;