import * as React from 'react';
import { observer } from 'mobx-react';

import OfferCard from './OfferCard';

import offerService from '../services/offer.service';
import { StyleRulesCallback, withStyles } from '@material-ui/core';

interface IProps {
  classes: any;
}

@observer
class OffertList extends React.Component<IProps> {
  componentWillMount() {
    offerService.getOffers();
  }

  render() {
    const { classes } = this.props;
    const list: Offer.IOffer[] = offerService.list;

    const offerList = list.map((c: any) => (
      <OfferCard
        key={c.id}
        offer={c} />
    ));

    return (
      <div className={classes.list}>
        { !!list.length && offerList }
        { !list.length && 'No results :(' }
      </div>
    );
  }
}

const styles = (theme: any) => ({
  list: {
    paddingTop: theme.spacing.unit,
  }
});

export default withStyles(styles as StyleRulesCallback<string>)(OffertList);