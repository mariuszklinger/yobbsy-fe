import * as React from 'react';
import { observer } from 'mobx-react';

import ContractCard from './ContractCard';

import './ContractList.scss';

interface IProps {
  store: any;
}

@observer
class ContractList extends React.Component<IProps> {
  render() {
    const { list } = this.props.store;

    const contractList = list.map((c: Contract.IContractShort) => (
      <ContractCard
        key={c.id}
        contract={c} />
    ));

    return (
      <div className="contract-list__wrapper">
        { list.length && contractList }
        { !list.length && 'No results :(' }
      </div>
    );
  }
}

export default ContractList;