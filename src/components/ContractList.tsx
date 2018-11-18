import * as React from 'react';
import { observer } from 'mobx-react';

import ContractCard from './ContractCard';

import './ContractList.scss';

interface IProps {
  store: any;
  children?: any;
  editable?: boolean;
}

@observer
class ContractList extends React.Component<IProps> {
  render() {
    const { list } = this.props.store;
    const { children, editable } = this.props;

    const contractList = list.map((c: Contract.IContractShort) => (
      <ContractCard
        key={c.id}
        contract={c}
        editable={editable} />
    ));

    return (
      <div className="contract-list__wrapper">
        { children }
        { !!list.length && contractList }
        { !list.length && 'No results :(' }
      </div>
    );
  }
}

export default ContractList;