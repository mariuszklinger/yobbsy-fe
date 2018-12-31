import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { StyleRulesCallback } from '@material-ui/core';

import LoginForm from 'src/components/LoginForm';

interface IProps {
  classes: any;
}

class LoginPage extends React.Component<IProps> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <LoginForm />
      </div>
    );
  }
}

const styles = (theme: any) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 500,
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(LoginPage);
