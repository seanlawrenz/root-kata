import React from 'react';
import { wait } from 'react-testing-library';
import { renderWithRouter, driverBuilder } from '../../../testing';
import { APIRequest as mockAPI } from '../../../utils';
import Drivers from '..';

const mockDriver1 = driverBuilder();
const mockDriver2 = driverBuilder();
const mockDriver3 = driverBuilder();

jest.mock('../../../utils/api', () => ({
  APIRequest: jest.fn(),
}));

describe('Drivers', () => {
  it('should render', () => {
    mockAPI.mockImplementationOnce(jest.fn(() => Promise.resolve({ success: true, drivers: [mockDriver1, mockDriver2, mockDriver3] })));
    const { getByText } = renderWithRouter(<Drivers />);
    getByText(/list of drivers/i);
  });

  it('should get drivers', async () => {
    mockAPI.mockImplementationOnce(jest.fn(() => Promise.resolve({ success: true, drivers: [mockDriver1, mockDriver2, mockDriver3] })));
    const { getByText, queryByText } = renderWithRouter(<Drivers />);
    await wait(() => {
      getByText(mockDriver1.name);
      expect(queryByText(/loading.../i, 500)).toBeNull();
    });
  });
});
