import * as React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LinearProgress } from '@material-ui/core';

import ContractForm from './components/ContractForm';
import SearchPage from './pages/search';

import AppService from './services/app.service';
import { observer } from 'mobx-react';

const createContractForm = () => <ContractForm context="CREATE" />;

@observer
class App extends React.Component {
  public render() {
    return (
      <>
        { AppService.isLoading && <LinearProgress /> }
        <Router>
          <div className="App">
            <Route path="/" exact={true} render={createContractForm} />
            <Route path="/search" component={SearchPage} />
          </div>
        </Router>
      </>
    );
  }
}

export default App;
