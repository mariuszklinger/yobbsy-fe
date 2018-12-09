import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import userService from 'src/services/user.service';
// import offerService from 'src/services/offer.service';

import Date from './Date';
import './ContractCard.scss';

interface IProps {
  offer: Offer.IOffer;
}

@observer
class OfferCard extends React.Component<IProps> {
  render() {
    const { offer } = this.props;
    const { details, pending } = offer;

    return (
      <div className="contract-card">
        <Typography
          align="left"
          variant="h5"
        >
          <Link to={`/contract/${details.id}`}>
            { pending && <b>{ details.title }</b> }
            { !pending && details.title }
          </Link>
        </Typography>

        <Typography
          align="left"
          variant="h6"
        >
          <Date dateStr={ offer.modified } />
          <p>
            <ChatBubbleOutlineIcon />{ offer.description }
          </p>
        </Typography>

        { !offer.pending &&
          <div>
            <p><CheckCircleOutlineIcon /> { offer.feedback }</p>
          </div>
        }

        { offer.pending && userService.isEmployee &&
          <div>
            <Button
              variant="outlined"
              color="secondary"
            >
              Accept offer
            </Button>

            <Button
            >
              Decline offer
            </Button>
          </div>
        }
      </div>
    );
  }
}

export default OfferCard;