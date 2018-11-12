import * as React from 'react';
import { observer } from 'mobx-react';
import {
  withStyles,
  StyleRulesCallback,
  Badge } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

import userService from '../services/user.service';

import './AppBar.scss';
import classNames from 'classnames';

interface IProps {
  classes: any;
}

@observer
class MyAppBar extends React.Component<IProps> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.appbar, 'appbar-wrapper')}>

        <IconButton
          color="inherit"
        >
          <Link to="/">
            <HomeIcon style={{ color: '#FFF' }} />
          </Link>
        </IconButton>

        <IconButton
          color="inherit"
        >
          <Link to="/search">
            <SearchIcon style={{ color: '#FFF' }} />
          </Link>
        </IconButton>

        <IconButton
          color="inherit"
          onClick={userService.openLoginForm}
        >
          <PersonIcon style={{ color: '#FFF' }} />
        </IconButton>

        <IconButton
          color="inherit"
          aria-label="4 pending messages"
        >
          <Badge
            color="secondary"
            hidden={(userService.userData.pending || []).length > 0}
            badgeContent={(userService.userData.pending || []).length}
          >
            <Link to="/offers">
              <MailIcon style={{ color: '#FFF' }} />
            </Link>
          </Badge>
        </IconButton>
      </div>
    );
  }
}

const styles = (theme: any) => ({
  appbar: {
    backgroundColor: theme.palette.primary.main,
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(MyAppBar);

