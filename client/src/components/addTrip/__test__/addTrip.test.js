import React from 'react';
import { fireEvent, wait } from 'react-testing-library';
import { renderWithRouter, mockDriver, mockTrip } from '../../../testing';
import { APIRequest as mockAPI } from '../../../utils';
import AddTrip from '..';

jest.mock('../../../utils/api', () => ({
  APIRequest: jest.fn(),
}));

describe('AddTrip', () => {
  it('should be rendered', () => {
    const { getByText } = renderWithRouter(<AddTrip />);
    getByText(/add trip/i);
  });

  it('should have an input for driver, startTime, endTime and miles', () => {
    const { getByLabelText } = renderWithRouter(<AddTrip />);

    getByLabelText(/driver name/i);
    getByLabelText(/start time/i);
    getByLabelText(/end time/i);
    getByLabelText(/miles/i);
  });

  it('should fetch the diver id from the name on submit', async () => {
    mockAPI.mockImplementationOnce(jest.fn(() => Promise.resolve({ success: true, id: mockDriver.id })));
    const { container, getByLabelText, getByText } = renderWithRouter(<AddTrip />);

    fireEvent.change(getByLabelText(/driver name/i, { id: 'driver-name' }), {
      target: { value: mockDriver.name },
    });
    fireEvent.change(getByLabelText(/start time/i, { id: 'start-time' }), {
      target: { value: '07:14' },
    });
    fireEvent.change(getByLabelText(/end time/i, { id: 'end-time' }), {
      target: { value: '08:15' },
    });
    fireEvent.change(getByLabelText(/miles/i, { id: 'miles' }), {
      target: { value: mockDriver.miles },
    });

    fireEvent.click(getByText(/submit/i));
    expect(mockAPI).toHaveBeenCalledWith('/driver/get-by-name', 'POST', { name: mockDriver.name });
    await wait(() => {
      expect(container).toBeTruthy();
    });
  });

  it('should tell the driver that there was no match for the driver', async () => {
    const { getByLabelText, getByText } = renderWithRouter(<AddTrip />);
    mockAPI.mockImplementationOnce(jest.fn(() => Promise.resolve({ success: false, error: {} })));

    fireEvent.change(getByLabelText(/driver name/i, { id: 'driver-name' }), {
      target: { value: 'no one' },
    });

    fireEvent.click(getByText(/submit/i));
    await wait(() => {
      getByText(/there was no match for driver no one/i);
    });
  });
});
