import * as React from 'react';
import classnames from 'classnames';
import { withStyles, Theme } from '@material-ui/core/styles';
import {
  StyleRulesCallback,
  Typography
} from '@material-ui/core';

interface IProps {
  children: any;
  className?: string;
  id?: string;
  classes: any;
}

class MediumHeader extends React.Component<IProps> {
  render() {
    const { id, children, classes, className } = this.props;

    return (
      <Typography
        id={id}
        align="left"
        variant="h4"
        className={classnames(classes.header, className)}
      >
      {children}
      </Typography>
    );
  }
}

const styles = (theme: Theme) => ({
  header: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },

});

export default withStyles(styles as StyleRulesCallback<string>)(MediumHeader);
