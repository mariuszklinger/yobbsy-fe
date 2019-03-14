import * as React from 'react';
import classnames from 'classnames';

import CheckCircle from '@material-ui/icons/CheckCircleOutline';
import { withStyles, Theme } from '@material-ui/core/styles';
import {
  StyleRulesCallback,
  Typography
} from '@material-ui/core';

import success_airplane from './send_icon.svg';

interface IProps {
  className: string;
  classes: any;
  text?: string;
}

const SuccessPane = ({ classes, className, text }: IProps) => {
  return (
    <div className={classnames(className, classes.root)}>
      <CheckCircle color="secondary" className={classes.checkSign} />

      <div>
        <Typography variant="h4" color="secondary">Success!</Typography>
        <Typography variant="h6" color="secondary">{text || 'Messege sent!'}</Typography>
      </div>
    </div>
  );
}

const styles = (theme: Theme) => ({
  root: {
    backgroundImage: `url(${success_airplane})`,
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: 80,
    height: 400,
    marginLeft: -30,
    opacity: 0,
    position: 'absolute',
    textAlign: 'center',
    top: 200,
    width: '100%',
    zIndex: -1,
  },
  checkSign: {
    fontSize: 150,
    width: '100%',
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(SuccessPane);
