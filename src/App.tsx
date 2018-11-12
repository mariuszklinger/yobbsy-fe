import * as React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { LinearProgress, MuiThemeProvider } from '@material-ui/core';

import ContractForm from './components/ContractForm';
import OfferList from './components/OfferList';
import Snackbar from './components/Snackbar';
import LogInForm from './components/LoginForm';
import MyAppBar from './components/AppBar';
import ContractCard from './components/ContractCard';

import SearchPage from './pages/search';
import AppService from './services/app.service';
import ContractService from './services/contract.service';

import theme from './config/theme';

const createContractForm = () => <ContractForm context="CREATE" />;
const contractDetail = () => <ContractCard contract={ContractService.contract} />;
const offerListF = () => <OfferList />;

@observer
class App extends React.Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        { AppService.isLoading && <LinearProgress style={{ position: 'absolute', zIndex: 1000, }} /> }
        <Router>
          <>
            <MyAppBar />

            <div className="app">
              <Route path="/" exact={true} render={createContractForm} />
              <Route path="/contract/:id([0-9]+)" render={contractDetail} />
              <Route path="/offers" component={offerListF} />
              <Route path="/search" component={SearchPage} />
            </div>
          </>
        </Router>

        <Snackbar
          message="Success!"
          variant="success"
        />

        <Snackbar
          message="Error occured..."
          variant="error"
        />

        <LogInForm />
      </MuiThemeProvider>
    );
  }
}

export default App;
