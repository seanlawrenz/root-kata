import React from 'react';
import { render, wait } from 'react-testing-library';
import { mockDriver, mockTrip } from '../../../testing';
import { APIRequest as mockAPI } from '../../../utils';
import DrivingResults from '..';

jest.mock('../../../utils/api', () => ({
  APIRequest: jest.fn(),
}));

describe('Driving Results', () => {
  it('should render', () => {
    mockAPI.mockImplementationOnce(jest.fn(() => Promise.resolve({ success: true, name: mockDriver.name, trips: [] })));
    const { getByText } = render(<DrivingResults match={{ params: { id: mockDriver._id } }} />);
    getByText(/driving results/i);
  });

  it('should show no data for driver with no trips', async () => {
    mockAPI.mockImplementationOnce(jest.fn(() => Promise.resolve({ success: true, name: mockDriver.name, trips: [] })));
    const { getByText } = render(<DrivingResults match={{ params: { id: mockDriver._id } }} />);
    await wait(() => {
      getByText(`No trips recorded for driver ${mockDriver.name}`);
    });
  });

  it('should show the trips', async () => {
    mockAPI.mockImplementationOnce(jest.fn(() => Promise.resolve({ success: true, name: mockDriver.name, trips: [mockTrip] })));
    const { getByText } = render(<DrivingResults match={{ params: { id: mockDriver._id } }} />);
    await wait(() => {
      getByText(`Results for ${mockDriver.name}`);
    });
  });
});
