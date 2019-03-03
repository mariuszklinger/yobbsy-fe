import * as React from 'react';
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
import SettingsIcon from '@material-ui/icons/Settings';
import CardTravelIcon from '@material-ui/icons/CardTravel';

import userService from '../services/user.service';
import offerService from '../services/offer.service';
import { Theme } from '@material-ui/core';
import Modal from './common/Modal';

interface IProps {
  classes: any;
}

@observer
class MyAppBar extends React.Component<IProps> {
  render() {
    const { classes } = this.props;
    const offerCount = offerService.getUnreadCount;

    return (
      <div className={classes.appbar}>
        <Link to="/">
          <IconButton className={classes.icon}>
            <HomeIcon />
          </IconButton>
        </Link>

        { (userService.isEmployee || !userService.isLoggedIn) &&
          <Link to="/new-contract">
            <IconButton className={classes.icon}>
              <AddIcon />
            </IconButton>
          </Link>
        }

        { userService.isEmployee &&
          <Link to="/my-contracts">
            <IconButton className={classes.icon}>
                <CardTravelIcon />
            </IconButton>
          </Link>
        }

        { (!userService.isLoggedIn || userService.isHunter) &&
          <Link to="/search">
            <IconButton className={classes.icon}>
              <SearchIcon className={classes.icon} />
            </IconButton>
          </Link>
        }

        <IconButton onClick={userService.openLoginForm}>
          <PersonIcon className={classes.icon} />
        </IconButton>

        { userService.isLoggedIn &&
          <Link to="/offers">
            <IconButton className={classes.icon}>
              { !!offerCount &&
                <Badge
                  color="secondary"
                  badgeContent={offerCount}
                >
                  <MailIcon />
                </Badge>
              }

              { !offerCount &&
                <MailIcon />
              }
            </IconButton>
          </Link>
        }

        { !userService.isLoggedIn &&
          <Link to="/offers">
            <IconButton className={classes.icon}>
              <Badge
                color="secondary"
                badgeContent={1}
              >
                <MailIcon />
              </Badge>
            </IconButton>
          </Link>
        }

        { userService.isLoggedIn &&
          <Link to="/settings">
            <IconButton className={classes.icon}>
              <SettingsIcon className={classes.icon} />
            </IconButton>
          </Link>
        }

        { userService.isEmployee && <b>#{userService.userData.id} W</b> }
        { userService.isHunter && <b>#{userService.userData.id} H</b> }
      </div>
    );
  }
}

const styles = (theme: Theme) => ({
  appbar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    height: '100%',
    position: 'fixed',
    textAlign: 'center',
    width: theme.spacing.unit * 2,
  },
  icon: {
    color: theme.palette.common.white,
  }
});

export default withStyles(styles as StyleRulesCallback<string>)(MyAppBar);

