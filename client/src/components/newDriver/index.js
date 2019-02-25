import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { APIRequest } from '../../utils';

class NewDriver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driverName: '',
      addedSuccessfully: false,
    };

    this.onChange = this.onChange.bind(this);
    this.saveDriver = this.saveDriver.bind(this);
  }

  onChange(e) {
    const {
      target: { value },
    } = e;
    this.setState({
      driverName: value,
    });
  }

  async saveDriver(e) {
    e.preventDefault();
    const { driverName } = this.state;
    const data = await APIRequest(`/driver/new`, 'POST', { name: driverName });
    if (data.successful) {
      this.setState({
        ...this.state,
        addedSuccessfully: true,
      });
    }
  }

  render() {
    const { driverName, addedSuccessfully } = this.state;

    return (
      <Fragment>
        {addedSuccessfully && <Redirect to="/" />}
        <h1>Add New Driver</h1>
        <form>
          <label htmlFor="driver-name" className="form-label">
            Driver name
          </label>
          <input type="text" id="driver-name" name="driver-name" className="form-input" value={driverName} onChange={this.onChange} />
          <button type="submit" className="form-submit" onClick={this.saveDriver}>
            Submit
          </button>
        </form>
      </Fragment>
    );
  }
}

export default NewDriver;
