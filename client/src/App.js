import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import withAuth from './components/withAuth';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={withAuth()} />
    </Switch>
    );
  }
}

export default App;