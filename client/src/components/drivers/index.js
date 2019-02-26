import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { APIRequest } from '../../utils';

class Drivers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers: [],
      loading: true,
      error: {
        isError: false,
        message: '',
      },
    };
  }

  async componentDidMount() {
    const data = await APIRequest('/driver');
    if (data.success) {
      this.setState({
        ...this.state,
        loading: false,
        drivers: data.drivers,
        error: {
          isError: false,
        },
      });
    } else {
      this.setState({
        ...this.state,
        loading: false,
        error: {
          isError: true,
          message: 'Cannot get drivers',
        },
      });
    }
  }

  render() {
    const {
      loading,
      drivers,
      error: { isError, message },
    } = this.state;
    return (
      <Fragment>
        <h2>List of drivers</h2>
        {loading && <p>Loading...</p>}
        {!loading && drivers.length === 0 && <p>No drivers on record</p>}
        {!loading && drivers.length > 0 && (
          <Fragment>
            {drivers.map(driver => (
              <div key={driver._id}>
                <Link to={`driver/${driver._id}`}>{driver.name}</Link>
                <br />
              </div>
            ))}
          </Fragment>
        )}
        {!loading && isError && <p>Error: {message}</p>}
      </Fragment>
    );
  }
}

export default Drivers;
