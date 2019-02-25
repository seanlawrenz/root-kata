import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { APIRequest, tripReducer } from '../../utils';

class DrivingResults extends Component {
  constructor(props) {
    super(props);
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.id = id;

    this.state = {
      loading: true,
      tripInfo: [],
      name: '',
    };
  }

  async componentDidMount() {
    const data = await APIRequest(`/driver/${this.id}`);
    if (data.success) {
      const tripData = data.trips.length === 0 ? undefined : tripReducer(data.trips);
      this.setState({
        ...this.state,
        tripInfo: tripData,
        name: data.name,
        loading: false,
      });
    }
  }

  render() {
    const { loading, tripInfo, name } = this.state;

    return (
      <Fragment>
        <h1>Driving Results</h1>
        {loading && <p>Loading...</p>}
        {!loading && !tripInfo && <p>No trips recorded for driver {name}</p>}
        {!loading && tripInfo && (
          <Fragment>
            <p>Results for {name}</p>
            <p>Total miles driven: {tripInfo.totalMiles}</p>
            <p>Average Speed: {tripInfo.averageSpeed}</p>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

DrivingResults.propTypes = {
  match: PropTypes.object.isRequired,
};

export default DrivingResults;
