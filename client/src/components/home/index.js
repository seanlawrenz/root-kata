import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Drivers from '../drivers';

const Home = () => (
  <Fragment>
    <h1>You are on the home page.</h1>
    <button type="button" style={{ marginRight: '2em' }}>
      <Link to="/driver/new">Add New Driver</Link>
    </button>
    <button type="button">
      <Link to="/trip/new">Add Trip</Link>
    </button>
    <br />
    <br />
    <Drivers />
  </Fragment>
);

export default Home;
