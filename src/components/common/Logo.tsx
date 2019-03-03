import * as React from 'react';
import classNames from 'classnames';

import { Theme, withStyles, StyleRulesCallback } from '@material-ui/core';

import logo from '../../assets/yobbsy.svg';

interface IProps {
  classes: any;
  className?: string;
}

class Logo extends React.Component<IProps> {
  render() {
    const { classes, className } = this.props;
    return <img src={logo} className={classNames(classes.root, className)} width={200} />;
  }
}

const styles = (theme: Theme) => ({
  root: {
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(Logo);
