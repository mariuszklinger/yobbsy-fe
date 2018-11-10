import * as React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import { LinearProgress, MuiThemeProvider } from '@material-ui/core';

import ContractForm from './components/ContractForm';
import Snackbar from './components/Snackbar';
import LogInForm from './components/LoginForm';
import MyAppBar from './components/AppBar';

import SearchPage from './pages/search';
import AppService from './services/app.service';

import theme from './config/theme';

const createContractForm = () => <ContractForm context="CREATE" />;

@observer
class App extends React.Component {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        { AppService.isLoading && <LinearProgress /> }
        <Router>
          <div className="App">
            <MyAppBar />

            <Route path="/" exact={true} render={createContractForm} />
            <Route path="/search" component={SearchPage} />
          </div>
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
