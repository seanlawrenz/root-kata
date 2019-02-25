import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Home from './components/home';
import NewDriver from './components/newDriver';
import AddTrip from './components/addTrip';
import DriverResults from './components/drivingResults';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/driver/new" component={NewDriver} />
          <Route exact path="/trip/new" component={AddTrip} />
          <Route exact path="/driver/:id" component={DriverResults} />
        </div>
      </Router>
    );
  }
}

export default App;
