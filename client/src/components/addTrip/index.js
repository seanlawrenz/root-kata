import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { APIRequest } from '../../utils';
import { Redirect } from 'react-router-dom';

import './styles.css';

class AddTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driver: '',
      startTime: '',
      endTime: '',
      miles: 0,
      error: {
        isError: false,
        message: '',
      },
      addedSuccessfully: false,
    };

    this.onChange = this.onChange.bind(this);
    this.getDriverId = this.getDriverId.bind(this);
    this.addTrip = this.addTrip.bind(this);
  }

  onChange(e) {
    const {
      target: { name, value },
    } = e;

    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  async getDriverId(e) {
    e.preventDefault();

    const { driver } = this.state;
    const driverResponse = await APIRequest('/driver/get-by-name', 'POST', { name: driver });
    if (driverResponse.success) {
      this.setState({
        ...this.state,
        error: {
          isError: false,
          message: '',
        },
      });
      this.addTrip(driverResponse.id);
    } else {
      this.setState({
        ...this.state,
        error: {
          isError: true,
          message: `There was no match for driver ${driver}`,
        },
      });
    }
  }

  async addTrip(driverId) {
    const { startTime, endTime, miles } = this.state;
    const startArray = startTime.split(':');
    const endArray = endTime.split(':');

    const start = moment()
      .hour(parseInt(startArray[0], 10))
      .minute(parseInt(startArray[1], 10));

    const end = moment()
      .hour(parseInt(endArray[0], 10))
      .minute(parseInt(endArray[1], 10));

    const data = await APIRequest('/trip/new', 'POST', { driver: driverId, startTime: start, endTime: end, miles });
    if (data.success) {
      this.setState({
        ...this.state,
        addedSuccessfully: true,
      });
    }
  }

  render() {
    const {
      driver,
      startTime,
      endTime,
      miles,
      error: { isError, message },
      addedSuccessfully,
    } = this.state;
    return (
      <Fragment>
        <h1>Add Trip</h1>
        {isError && <p>{message}</p>}
        {addedSuccessfully && <Redirect to="/" />}
        <form>
          <div className="form-container">
            <label htmlFor="driver-name">Driver Name</label>
            <input type="text" id="driver-name" name="driver" className="form-input" value={driver} onChange={this.onChange} />

            <label htmlFor="start-time">Start time</label>
            <input type="text" id="start-time" name="startTime" className="form-input" value={startTime} onChange={this.onChange} />

            <label htmlFor="end-time">End time</label>
            <input type="text" id="end-time" name="endTime" className="form-input" value={endTime} onChange={this.onChange} />

            <label htmlFor="miles">Miles</label>
            <input type="text" id="miles" name="miles" className="form-input" value={miles} onChange={this.onChange} />

            <button type="submit" className="form-submit" onClick={this.getDriverId}>
              Submit
            </button>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default AddTrip;
