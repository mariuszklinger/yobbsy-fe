import * as React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import {
  withStyles,
  StyleRulesCallback,
  Badge,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MailIcon from '@material-ui/icons/Mail';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import CardTravelIcon from '@material-ui/icons/CardTravel';

import userService from '../services/user.service';

import './AppBar.scss';

interface IProps {
  classes: any;
}

@observer
class MyAppBar extends React.Component<IProps> {
  render() {
    const { classes } = this.props;
    const showBadgeCount = !!(userService.userData.pending || []).length;

    return (
      <div className={classNames(classes.appbar, 'appbar-wrapper')}>

        <IconButton
          color="inherit"
        >
          <Link to="/">
            <HomeIcon style={{ color: '#FFF' }} />
          </Link>
        </IconButton>

        { userService.isEmployee &&
          <IconButton
            color="inherit"
            title="Add new contract"
          >
            <Link to="/new-contract">
              <AddIcon style={{ color: '#FFF' }} />
            </Link>
          </IconButton>
        }

        { userService.isEmployee &&
          <IconButton
            color="inherit"
            title="My contracts"
          >
            <Link to="/my-contracts">
              <CardTravelIcon style={{ color: '#FFF' }} />
            </Link>
          </IconButton>
        }

        { userService.isHunter &&
          <IconButton
            color="inherit"
          >
            <Link to="/search">
              <SearchIcon style={{ color: '#FFF' }} />
            </Link>
          </IconButton>
        }

        <IconButton
          color="inherit"
          onClick={userService.openLoginForm}
        >
          <PersonIcon style={{ color: '#FFF' }} />
        </IconButton>

        { userService.isLoggedIn &&
          <IconButton
            color="inherit"
            aria-label="4 pending messages"
          >
            { showBadgeCount &&
              <Badge
                color="secondary"
                badgeContent={(userService.userData.pending || []).length}
              >
                <Link to="/offers">
                  <MailIcon style={{ color: '#FFF' }} />
                </Link>
              </Badge>
            }

            { !showBadgeCount &&
              <Link to="/offers">
                <MailIcon style={{ color: '#FFF' }} />
              </Link>
            }
          </IconButton>
        }
        { userService.isEmployee && <b>Worker</b> }
        { userService.isHunter && <b>Hunter</b> }
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

