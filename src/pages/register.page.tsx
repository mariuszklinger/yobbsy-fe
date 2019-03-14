import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { StyleRulesCallback } from '@material-ui/core';

import RegisterForm from '../components/authModal/RegisterForm';

interface IProps {
  classes: any;
}

class RegisterPage extends React.Component<IProps> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <RegisterForm onSuccess={() => alert(1)} />
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

export default withStyles(styles as StyleRulesCallback<string>)(RegisterPage);
