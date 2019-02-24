import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import { APIRequest as mockAPI } from '../../../utils';
import { mockDriver } from '../../../testing';
import NewDriver from '..';

jest.mock('../../../utils/api', () => ({
  APIRequest: jest.fn(() => Promise.resolve({ success: true, driver: mockDriver.name })),
}));

describe('NewDriver', () => {
  it('should have a form to enter in a driver', () => {
    const { getByLabelText } = render(<NewDriver />);
    getByLabelText(/driver name/i);
  });

  it('should add driver on submit', () => {
    const { getByText, getByLabelText } = render(<NewDriver />);
    fireEvent.change(getByLabelText(/driver name/i, { id: 'driver-name' }), {
      target: { value: mockDriver.name },
    });
    fireEvent.click(getByText(/submit/i));
  });
});
