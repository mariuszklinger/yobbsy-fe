import * as React from 'react';
import { observer } from 'mobx-react';

import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  StyleRulesCallback,
  LinearProgress
} from '@material-ui/core';

import userService from 'src/services/user.service';
import appService from 'src/services/app.service';
import offerService from 'src/services/offer.service';

interface IProps {
  classes: any;
  offer: Offer.IOffer;
  accept: boolean
  onClose: () => void;
}

interface IState {
  message: string;
}

@observer
class FeedbackForm extends React.Component<IProps, IState> {
  state: IState = {
    message: '',
  }

  handleChange = (name: string) => (event: any) => {
    const form = {
      ...this.state,
      [name]: event.target.value,
    };

    this.setState({ ...form });
  }

  handleSubmit = (event: any) => {
    const { message } = this.state;
    const { onClose, accept, offer: { id } } = this.props;

    offerService
      .answer(id, accept, message)
      .then(offerService.getOffers)
      .then(onClose);

    event.preventDefault();
  }

  render() {
    const { classes, onClose, offer } = this.props;

    return (
      <Dialog
        fullScreen={false}
        open={true}
        onBackdropClick={userService.closeLoginForm}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          className={classes.textField}
        >
          Response to: <b>{offer.details.title}</b>
          <pre>
            {offer.description}
          </pre>
        </DialogTitle>

        { appService.isLoading && <LinearProgress /> }
        <DialogContent>
          <DialogContentText
            className={classes.textField}
          >
            Do you like the offer? Could it be better?
          </DialogContentText>

          <form
            className={classes.container}
            onSubmit={this.handleSubmit}
          >
            <TextField
              label="Message"
              value={this.state.message}
              margin="normal"
              rows="5"
              multiline={true}
              className={classes.textField}
              onChange={this.handleChange('message')}
            />

            <Button
              type="submit"
              className={classes.textField}
              color="secondary"
              variant="contained"
            >
              Send
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}

const styles = (theme: any) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    flex: '1 100%',
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(FeedbackForm);