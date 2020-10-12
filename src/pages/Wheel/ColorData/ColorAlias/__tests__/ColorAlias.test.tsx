import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor } from 'services/test-utils';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ColorAlias from '../ColorAlias';

const color2rgb = (color: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

  return `rgb(${
    String(parseInt(result?.[1] as string, 16))
  }, ${
    String(parseInt(result?.[2] as string, 16))
  }, ${
    String(parseInt(result?.[3] as string, 16))
  })`;
}

describe('ColorAlias component', () => {
  test('click on a button opens a form', () => {
    const { getByText, queryByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <ColorAlias />
      </MemoryRouter>
    );

    expect(queryByText('Update color names')).toBeNull();

    fireEvent.click(getByText('Set custom color names'));

    expect(queryByText('Update color names')).not.toBeNull();
  });

  test('ColorAlias values can be initialized from URL', () => {
    const { container, getByText } = render(
      <MemoryRouter initialEntries={['/?a=bloodymary~~~~~teal~~~~~~sunset~~~']}>
        <ColorAlias />
      </MemoryRouter>
    );

    fireEvent.click(getByText('Set custom color names'));

    expect((container?.querySelector('input[name="color_alias_RED"]') as HTMLInputElement)?.value).toBe('bloodymary');
    expect((container?.querySelector('input[name="color_alias_BLUE_GREEN"]') as HTMLInputElement)?.value).toBe('teal');
    expect((container?.querySelector('input[name="color_alias_RED_ORANGE"]') as HTMLInputElement)?.value).toBe('sunset');
  });

  test('Sumbitting a form updates URL', async () => {
    expect.assertions(1);
    const history = createMemoryHistory();

    const { container, getByText } = render(
      <Router history={history}>
        <ColorAlias />
      </Router>
    );

    fireEvent.click(getByText('Set custom color names'));

    fireEvent.change(
      container.querySelector('input[name="color_alias_RED"]') as HTMLInputElement,
      {target: {value: 'bloodymary'}}
    );

    fireEvent.click(getByText('Update color names'));

    waitFor(() => {
      expect(
        (new URLSearchParams(history.location.search)).get('a')
      ).toBe('bloodymary~~~~~~~~~~~~~~');
    })
  });

  test('value prop controlls color boxes', () => {
    const colors = {

      RED: { 500: '#f4562e' },
      BLUE: { 500: '#6f8b89' },
      YELLOW: { 500: '#ffd618' },
      VIOLET: { 500: '#bd5d6e' },
      GREEN: { 500: '#66a949' },
      ORANGE: { 500: '#fa9e2a' },
      RED_ORANGE: { 500: '#f77a2c' },
      RED_VIOLET: { 500: '#d8594d' },
      BLUE_VIOLET: { 500: '#96747b' },
      BLUE_GREEN: { 500: '#6a9a68' },
      YELLOW_GREEN: { 500: '#b2c030' },
      YELLOW_ORANGE: { 500: '#fcba21'},
      BLACK: '#32220c',
      GRAY: { 500: '#766650' },
      WHITE: '#ffeed8',
    };

    const { container, getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <ColorAlias value={colors} />
      </MemoryRouter>
    );

    fireEvent.click(getByText('Set custom color names'));

    const redBox = container.querySelector('[data-test-id="color-RED"]') as HTMLElement;
    const redStyle = window.getComputedStyle(redBox) as any;
    expect(redStyle['background-color']).toBe(color2rgb('#f4562e'));

    const violetBox = container.querySelector('[data-test-id="color-VIOLET"]') as HTMLElement;
    const violetStyle = window.getComputedStyle(violetBox) as any;
    expect(violetStyle['background-color']).toBe(color2rgb('#bd5d6e'));

    const yellowGreenBox = container.querySelector('[data-test-id="color-YELLOW_GREEN"]') as HTMLElement;
    const yellowGreenStyle = window.getComputedStyle(yellowGreenBox) as any;
    expect(yellowGreenStyle['background-color']).toBe(color2rgb('#b2c030'));
  });
});
