import React from 'react';
import { renderWithRouter } from '../../../testing';

import Home from '..';

/**
 * React testing library has get functions that will fail the test if not found.
 * That is why there is no need for expect here.
 */
test('Home component', () => {
  const { getByText } = renderWithRouter(<Home />);
  getByText(/You are on the home page/i);
  getByText(/add new driver/i);
  getByText(/add trip/i);
});
