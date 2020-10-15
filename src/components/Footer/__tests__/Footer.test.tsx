import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render } from 'services/test-utils';

import Footer from '../Footer';

describe('Footer component', () => {
  test('Footer component renders', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Footer menuItems={[{titleKey: 'title', link: '/404'}]} />
      </MemoryRouter>
    );
  });
});
