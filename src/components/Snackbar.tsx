import * as React from 'react';

import { observer } from 'mobx-react';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

import AppService from '../services/app.service';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = (theme: any) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

@observer
class MySnackbar extends React.Component<any> {
  hide = () => AppService.hideToaster(this.props.variant)

  render() {
    const { classes, className, message, onClose, variant, open, ...other } = this.props;
    const Icon = variantIcon[variant];

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={AppService[variant]}
        autoHideDuration={3000}
        onClose={this.hide}
      >
        <SnackbarContent
          className={classNames(classes[variant], className)}
          message={
            <span className={classes.message}>
              <Icon className={classNames(classes.icon, classes.iconVariant)} />
              {message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              color="inherit"
              className={classes.close}
              onClick={onClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
          {...other}
        />
      </Snackbar>
    );
  }
}

// MySnackbarContent.propTypes = {
//   classes: PropTypes.object.isRequired,
//   className: PropTypes.string,
//   message: PropTypes.node,
//   onClose: PropTypes.func,
//   variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
// };

export default withStyles(styles)(MySnackbar);
