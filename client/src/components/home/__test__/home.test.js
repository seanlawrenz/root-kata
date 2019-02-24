import React from 'react';
import { render } from 'react-testing-library';

import Home from '..';

test('Home component', () => {
  const { getByText } = render(<Home />);
  getByText(/You are on the home page/i);
});
