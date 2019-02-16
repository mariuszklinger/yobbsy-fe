import * as React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { LinearProgress, MuiThemeProvider, CssBaseline, Theme, withStyles, StyleRulesCallback } from '@material-ui/core';

import ContractForm from './components/ContractForm';
import OfferList from './components/OfferList';
import Snackbar from './components/Snackbar';
import MyAppBar from './components/AppBar';
import LoginModal from './components/LoginModal';
import PrivateRoute from './components/PrivateRoute';

import HomePage from './pages/home.page';
import LoginPage from './pages/login.page';
import RegisterPage from './pages/register.page';
import SearchPage from './pages/search.page';
import ContractDetailsPage from './pages/contract-details.page';
import ConfirmPage from './pages/confirm.page';
import MyContractsPage from './pages/my-contracts.page';
import SettingsPage from './pages/settings.page';

import AppService from './services/app.service';

import theme from './config/theme';

const createContractForm = () => <ContractForm context="CREATE" />;

interface IProps {
  classes: any;
}

@observer
class App extends React.Component<IProps> {
  public render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        { AppService.isLoading && <LinearProgress className={classes.loadingBar} /> }
        <Router>
          <>
            <MyAppBar />

            <div className={classes.app}>
              <Route path="/" exact component={HomePage} />
              <Route path="/login" exact component={LoginPage} />
              <Route path="/register" exact component={RegisterPage} />
              <Route path="/new-contract" exact render={createContractForm} />
              <Route path="/contract/:id([0-9]+)/:edit?" component={ContractDetailsPage} />

              <PrivateRoute path="/my-contracts" employee component={MyContractsPage} />
              <PrivateRoute path="/settings" component={SettingsPage} />

              <Route path="/offers" component={OfferList} />
              <PrivateRoute path="/search" hunter component={SearchPage} />

              <Route path="/confirm-contract/:hash/:id" render={(props) => <ConfirmPage type="contract" {...props} />} />
              <Route path="/confirm-account/:hash/:id" render={(props) => <ConfirmPage type="account" {...props} />} />
            </div>
            <LoginModal />
          </>
        </Router>

        <Snackbar />

        <CssBaseline />

      </MuiThemeProvider>
    );
  }
}

const styles = (_: Theme) => ({
  '@global': {
    body: {
      backgroundColor: _.palette.common.white,
      fontFamily: 'sans-serif',
      padding: 0,
      margin: 0,
    },
  },

  app: {
    paddingLeft: 60,
  },

  loadingBar: {
    position: 'fixed !important',
    top: 0,
    left: 0,
    width: '100%',
  },
});

export default withStyles(styles as StyleRulesCallback<string>)(App);
