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
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme: Theme) => ({
  root: {
    '& div': {
      overflow: 'visible',
    },
  },
  closeCircle: {
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    right: -11,
    position: 'absolute',
    top: -10,
    padding: 4,
    fontWeight: 'bold',
  }
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
        className={classes.root}
        fullScreen={false}
        open={true}
        // onBackdropClick={userService.closeLoginForm}
        // onClose={userService.closeLoginForm}
        {...rest}
      >
        <CloseIcon
          className={classes.closeCircle}
          onClick={() => alert(1)} />
        <DialogTitle>
          {title}
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            { children }
          </DialogContentText>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles as StyleRulesCallback<string>)(CustomDialog);