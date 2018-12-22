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
import FeedbackForm from './FeedbackForm';

interface IProps {
  offer: Offer.IOffer;
}

interface IState {
  feedbackFormOpened: boolean;
  accept: boolean;
}

@observer
class OfferCard extends React.Component<IProps, IState> {
  state = {
    feedbackFormOpened: false,
    accept: true,
  }

  openFeedbackForm = (accept: boolean) => () => this.setState({ feedbackFormOpened: true, accept, })
  closeFeedbackForm = () => this.setState({ feedbackFormOpened: false })

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
              onClick={this.openFeedbackForm(true)}
            >
              Accept offer
            </Button>

            <Button
              onClick={this.openFeedbackForm(false)}
            >
              Decline offer
            </Button>

            {this.state.feedbackFormOpened &&
              <FeedbackForm
                onClose={this.closeFeedbackForm}
                offer={offer}
                accept={this.state.accept}
              />
            }
          </div>
        }
      </div>
    );
  }
}

export default OfferCard;