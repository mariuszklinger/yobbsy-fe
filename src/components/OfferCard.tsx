import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import { Typography, StyleRulesCallback, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

import userService from 'src/services/user.service';
import offerService from 'src/services/offer.service';

import Date from './Date';
import { styles } from './ContractCard';
import FeedbackForm from './FeedbackForm';

interface IProps {
  classes: any;
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

  markAsSeen = () => {
    const { offer } = this.props;

    offerService
      .markAsSeen(this.props.offer.id)
      .then(() => offer.seen = true)
  }

  render() {
    const { offer, classes } = this.props;
    const { details, pending } = offer;

    return (
      <div className={classes.card}>
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

        { !offer.seen && userService.isHunter &&
          <Button
            variant="outlined"
            color="secondary"
            onClick={this.markAsSeen}
          >
            Mark as read
          </Button>
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

const getStyles = () => styles;
export default withStyles(getStyles as StyleRulesCallback<string>)(OfferCard);