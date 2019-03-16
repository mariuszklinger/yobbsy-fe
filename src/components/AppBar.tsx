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
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerOff from '@material-ui/icons/PowerSettingsNew';
import CardTravelIcon from '@material-ui/icons/CardTravel';

import userService from '../services/user.service';
import offerService from '../services/offer.service';
import { Theme } from '@material-ui/core';
import { ADD_FORM_ID, SEARCH_FORM_ID } from './ContractForm';
import Logo from './common/Logo';

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
        <Link to="/" className={classes.rotatedLogo}>
          <Logo className={classes.logoImg} />
        </Link>

        { !userService.isLoggedIn &&
          <a href={`#${ADD_FORM_ID}`}>
            <IconButton className={classes.icon}>
              <AddIcon />
            </IconButton>
          </a>
        }

        { userService.isEmployee &&
          <Link to="/my-contracts">
            <IconButton className={classes.icon}>
              <CardTravelIcon />
            </IconButton>
          </Link>
        }

        { (!userService.isLoggedIn || userService.isHunter) &&
          <a href={`#${SEARCH_FORM_ID}`}>
            <IconButton className={classes.icon}>
              <SearchIcon className={classes.icon} />
            </IconButton>
          </a>
        }

        { !userService.isLoggedIn &&
          <IconButton onClick={() => userService.openLoginForm()}>
            <PersonIcon className={classes.icon} />
          </IconButton>
        }

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
          <IconButton className={classes.icon} onClick={() => userService.openLoginForm()}>
            <Badge
              color="secondary"
              badgeContent={1}
            >
              <MailIcon />
            </Badge>
          </IconButton>
        }

        { userService.isLoggedIn &&
          <Link to="/settings">
            <IconButton className={classes.icon}>
              <SettingsIcon className={classes.icon} />
            </IconButton>
          </Link>
        }

        { userService.isLoggedIn &&
          <IconButton className={classes.icon} onClick={() => userService.logOut()}>
            <PowerOff />
          </IconButton>
        }
      </div>
    );
  }
}

export const APPBAR_WIDTH = 60;

const styles = (theme: Theme) => ({
  appbar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    height: '100%',
    position: 'fixed',
    textAlign: 'center',
    width: APPBAR_WIDTH,
  },
  icon: {
    color: theme.palette.common.white,
  },
  rotatedLogo: {
    transform: 'rotate(90deg)',
    width: 50,
    display: 'inline-block',
    marginTop: 36,
    marginBottom: 78,
    height: 'auto',
  },
  logoImg: {
    filter: 'grayscale(100%)',
    transition: '0.3s',
    width: 100,

    '&:hover': {
      filter: 'grayscale(0%)',
    }
  }
});

export default withStyles(styles as StyleRulesCallback<string>)(MyAppBar);

