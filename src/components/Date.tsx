import * as React from 'react';
import moment from 'moment';

import { StyleRulesCallback, withStyles } from '@material-ui/core';

interface IProps {
  classes: any,
  dateStr: string,
}

export function Date({ dateStr, classes }: IProps) {
  const formatted = moment(dateStr, moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
    .format('YYYY-MM-DD, HH:mm');
  return <span className={classes.dateWrapper}>{ formatted }</span>;
}

const styles = (theme: any) => ({
  dateWrapper: {
    fontSize: 12,
    color: theme.palette.grey[500],
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(Date);