import React from 'react';

import { render } from 'services/test-utils';

import Wheel from '../Wheel';

describe('Wheel page', () => {
  test('Wheel page renders', () => {
    render(<Wheel />)
  });
});
