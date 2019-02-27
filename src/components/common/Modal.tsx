import * as React from 'react';


import { withStyles, Theme } from '@material-ui/core/styles';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  StyleRulesCallback,
} from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog';

const styles = (theme: Theme) => ({
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

interface IProps {
  classes: any;
  // children: any;
  className?: string;
  title: string;
}

class CustomDialog extends React.Component<IProps & DialogProps & { children?: any }> {
  render() {
    const { classes, className, title, children, ...rest } = this.props;

    return (
      <Dialog
        fullScreen={false}
        open={true}
        // onBackdropClick={userService.closeLoginForm}
        // onClose={userService.closeLoginForm}
        {...rest}
      >
        <DialogTitle
          id="responsive-dialog-title"
          className={classes.textField}
        >
          {title}
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            className={classes.textField}
          >
            { children }
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles as StyleRulesCallback<string>)(CustomDialog);