import * as React from 'react';
import { observer } from 'mobx-react';
import { withStyles, StyleRulesCallback, AppBar, Toolbar, Typography, Badge } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import userService from '../services/user.service';

@observer
class MyAppBar extends React.Component {
  render() {

    return (
      <AppBar>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap={true}>
            Material-UI
          </Typography>
          <div>
            <Link to="/">Home</Link>
            <Link to="/search">SEARCH</Link>

            <Button
              size="small"
              variant="outlined"
              onClick={userService.openLoginForm}
            >
              Log In
            </Button>
            {!!userService.userData.email && userService.userData.email}

            <IconButton
              color="inherit"
              aria-label="4 pending messages"
            >
              <Badge
                color="secondary"
                badgeContent={(userService.userData.pending || []).length}
              >
                <MailIcon />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = (theme: any) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    flex: 'auto',
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(MyAppBar);

