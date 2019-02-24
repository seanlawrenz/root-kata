import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Home from './components/home';
import NewDriver from './components/newDriver';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/driver/new" component={NewDriver} />
        </div>
      </Router>
    );
  }
}

export default App;
