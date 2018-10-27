import * as React from 'react';
import './App.css';
import NewContract from './components/NewContract';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <NewContract />
      </div>
    );
  }
}

export default App;
