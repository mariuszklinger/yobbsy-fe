import * as React from 'react';
import * as Moment from 'moment';

// import ClockIcon from '@material-ui/icons/QueryBuilder';

import './Date.scss';

interface IProps {
  dateStr: string,
}

export default function Date({ dateStr }: IProps) {
  const formatted = Moment(dateStr, Moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
    .format('YYYY-MM-DD, HH:mm');
  return <span className="date-wrapper">{ formatted }</span>;
}
