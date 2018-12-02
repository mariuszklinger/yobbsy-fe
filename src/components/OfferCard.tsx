import * as React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import './ContractCard.scss';
import userService from 'src/services/user.service';
import { observer } from 'mobx-react';

interface IProps {
  offer: Offer.IOffer;
}

@observer
class OfferCard extends React.Component<IProps> {
  render() {
    const { offer } = this.props;
    const { details } = offer;

    return (
      <div className="contract-card">
        <Typography
          align="left"
          variant="h5"
        >
          <Link to={`/contract/${details.id}`}>
            <b>{ details.title }</b>
          </Link>
        </Typography>

        <Typography
          align="left"
          variant="h6"
        >
          { offer.modified }
          { offer.description }
        </Typography>

        { userService.isEmployee &&
          <Button
            variant="outlined"
            color="secondary"
          >
            Accept offer
          </Button>
        }

        { userService.isEmployee &&
          <Button
          >
            Decline offer
          </Button>
        }

      </div>
    );
  }
}

export default OfferCard;