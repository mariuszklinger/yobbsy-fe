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
      maxHeight: 'none',
    },

    [theme.breakpoints.down(600)]: {
      '& > div:nth-child(2)': {
        margin: '24 !important',
      }
    },
  },
  content: {
    padding: theme.spacing.unit,
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
    },

    [theme.breakpoints.down(600)]: {
      fontSize: 30,
    },
  },
  customPaper: {
    overflow: 'visible',

    [theme.breakpoints.down(360)]: {
      margin: '0 !important',
    },
  }
});

interface IProps {
  classes: any;
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
        scroll="body"
        maxWidth="xs"
        classes={{ paper: classes.customPaper  }}
        {...rest}
      >

        <CloseIcon
          className={classes.closeCircle}
          onClick={onClose} />

        <div className={classes.content}>
          <Typography variant="h6">
            {title}
          </Typography>

          { children }
        </div>

      </Dialog>
    );
  }
}

export default withStyles(styles as StyleRulesCallback<string>)(CustomDialog);