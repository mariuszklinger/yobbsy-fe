import * as React from 'react';
import classNames from 'classnames';

import { Theme, withStyles, StyleRulesCallback } from '@material-ui/core';

import logoWhite from './logo/yobbsy-white.svg';
import logoBlack from './logo/yobbsy-black.svg';

interface IProps {
  classes: any;
  className?: string;
  variant: 'white' | 'black';
}

class Logo extends React.Component<IProps> {
  render() {
    const { classes, className, variant } = this.props;
    const logo = variant === 'white' ? logoWhite : logoBlack;

    return <img src={logo} className={classNames(classes.root, className)} />;
  }
}

const styles = (theme: Theme) => ({
  root: {
    width: 200,
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(Logo);
