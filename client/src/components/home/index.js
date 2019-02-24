import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <Fragment>
    <h1>You are on the home page.</h1>
    <button type="button">
      <Link to="/driver/new">Add New Driver</Link>
    </button>
  </Fragment>
);

export default Home;
