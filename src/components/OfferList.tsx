import * as React from 'react';
import { observer } from 'mobx-react';

import OfferCard from './OfferCard';

import './ContractList.scss';

@observer
class OffertList extends React.Component {
  render() {
    // const { list } = this.props.store;
    const list:any = [];

    const offerList = list.map((c: any) => (
      <OfferCard
        key={c.id}
        offer={c} />
    ));

    return (
      <div className="contract-list__wrapper">
        { !!list.length && offerList }
        { !list.length && 'No results :(' }
      </div>
    );
  }
}

export default OffertList;