import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render } from 'services/test-utils';

import Wheel from '../Wheel';


describe('Wheel page', () => {
  test('Wheel page renders', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Wheel isWelcomeClosed={true} />
      </MemoryRouter>
    )
  });
});
