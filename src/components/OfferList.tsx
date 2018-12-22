import * as React from 'react';
import { observer } from 'mobx-react';

import OfferCard from './OfferCard';

import offerService from 'src/services/offer.service';
// import './ContractList.scss';

@observer
class OffertList extends React.Component {
  componentWillMount() {
    offerService.getOffers();
  }

  render() {
    const list:any = offerService.list;

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