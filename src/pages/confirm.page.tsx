import * as React from 'react';

import { Typography } from '@material-ui/core';

import contractService from '../services/contract.service';
import userService from '../services/user.service';
import ContractCard from '../components/ContractCard';

interface IProps {
  match?: any;
  type: 'account' | 'contract';
}

interface IState {
  loading: boolean;
  contract: Contract.IContractFull,
}

interface IConfirmationResponse {
  contract: Contract.IContractShort,
  user_data: User.IUser,
}

class ConfirmationPage extends React.Component<IProps, IState> {
  state = {
    loading: true,
    contract: null as any,
  }

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    const { hash, id } = this.props.match.params;
    const { type } = this.props;

    const method = type === 'account' ? contractService.confirmAccount : contractService.confirmContract;
    method(id, hash)
      .then(this.onConfirm);
  }

  onConfirm = ({ data }: { data: IConfirmationResponse }) => {
    const { contract, user_data } = data;

    this.setContract(contract);
    userService.setUserData({ data: user_data });
  }

  setContract = (contract: Contract.IContractFull) => {
    this.setState({ contract, loading: false });
  }

  render() {
    const { contract, loading } = this.state;
    const { type } = this.props;

    if (!loading) {
      return <>
        <Typography variant="title">
          { type === 'account' && 'Your account is now active'}
          { type === 'contract' && 'Your contract is now active'}

          <ContractCard contract={contract} />
        </Typography>
      </>;
    }

    return '';
  }
}

export default ConfirmationPage;