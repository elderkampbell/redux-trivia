import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Play from './pages/Play';
import Config from './pages/Config';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/play" component={ Play } />
          <Route exact path="/config" component={ Config } />
        </Switch>
      </div>
    );
  }
}

export default App;
