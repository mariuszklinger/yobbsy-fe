import * as React from 'react';
import classnames from 'classnames';

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
import { Typography } from '@material-ui/core';

const styles = (theme: Theme) => ({
  root: {
    '& div': {
      overflow: 'visible',
      maxHeight: 'none',
    },

    '& > div:nth-child(2)': {
      margin: 24,
    }
  },
  content: {
    padding: theme.spacing.unit,
    maxWidth: 400,
  },
  closeCircle: {
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    cursor: 'pointer',
    fontWeight: 'bold',
    position: 'absolute',
    padding: 4,
    right: -11,
    transition: '0.3s',
    top: -10,

    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    }
  }
});

interface IProps {
  classes: any;
  // children: any;
  className?: string;
  title?: string;
}

class CustomDialog extends React.Component<IProps & DialogProps & { children?: any }> {
  render() {
    const { classes, className, title, onClose, children, ...rest } = this.props;

    return (
      <Dialog
        open={true}
        className={classnames(classes.root, className)}
        onBackdropClick={onClose}
        onClose={onClose}
        {...rest}
      >

        <CloseIcon
          className={classes.closeCircle}
          onClick={onClose} />

        <div className={classes.content}>
          <Typography variant="headline">
            {title}
          </Typography>

          { children }
        </div>

      </Dialog>
    );
  }
}

export default withStyles(styles as StyleRulesCallback<string>)(CustomDialog);