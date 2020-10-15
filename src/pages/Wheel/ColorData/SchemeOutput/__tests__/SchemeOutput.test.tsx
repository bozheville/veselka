import React, { useMemo } from 'react';
import { render, fireEvent } from 'services/test-utils';
import UrlContext, { useUrlContext } from 'services/UrlContext';

import SchemeOutput from '../SchemeOutput';

function mockRRD() {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useLocation: jest.fn().mockReturnValue({
      pathname: '/',
      search: 'a=~~~purple~~~~~~~~~~~',
      hash: '',
      state: null,
      key: '5nvxpbdafa',
    }),
  };
}

jest.mock('react-router-dom', () => mockRRD());

const blueViolet = {
  50: 'bv50',
  100: 'bv100',
  200: 'bv200',
  300: 'bv300',
  400: 'bv400',
  500: 'bv500',
  600: 'bv600',
  700: 'bv700',
  800: 'bv800',
  900: 'bv900'
};

const scheme1 = {
  BLUE_VIOLET: {...blueViolet},
  WHITE: {500: '#ffffff'},
  BLACK: {500: '#000000'},
};

const scheme2 = {
  BLUE_VIOLET: {...blueViolet},
  WHITE: {500: '#fefefe'},
  BLACK: {500: '#232323'},
};

const UrlContextWrapper: React.FC<{initialEntries?: string[]}> = ({
  children,
  initialEntries,
}) => {
  const contextValue = useUrlContext();
  const initialEntriesVlaue = useMemo(() => initialEntries || ['/'], [initialEntries]);

  return (
    <UrlContext.Provider value={contextValue}>
      {children}
    </UrlContext.Provider>
  );
};

describe('SchemeOutput component', () => {

  test('output depends on value prop', () => {
    const { container, rerender } = render(<SchemeOutput value={scheme1} />);

    let textarea = container.querySelector('textarea');

    expect(textarea?.value).toBe(
      `{
  "blue_violet": {
    "50": "bv50",
    "100": "bv100",
    "200": "bv200",
    "300": "bv300",
    "400": "bv400",
    "500": "bv500",
    "600": "bv600",
    "700": "bv700",
    "800": "bv800",
    "900": "bv900"
  },
  "white": "#ffffff",
  "black": "#000000"
}`);

    rerender(<SchemeOutput value={scheme2} />);
    textarea = container.querySelector('textarea');

    expect(textarea?.value).toBe(
      `{
  "blue_violet": {
    "50": "bv50",
    "100": "bv100",
    "200": "bv200",
    "300": "bv300",
    "400": "bv400",
    "500": "bv500",
    "600": "bv600",
    "700": "bv700",
    "800": "bv800",
    "900": "bv900"
  },
  "white": "#fefefe",
  "black": "#232323"
}`);
  });

  test('changing output type changes output', () => {
    const { container, getByLabelText } = render(<SchemeOutput value={scheme1} />);

    let textarea = container.querySelector('textarea');

    expect(textarea?.value).toBe(
      `{
  "blue_violet": {
    "50": "bv50",
    "100": "bv100",
    "200": "bv200",
    "300": "bv300",
    "400": "bv400",
    "500": "bv500",
    "600": "bv600",
    "700": "bv700",
    "800": "bv800",
    "900": "bv900"
  },
  "white": "#ffffff",
  "black": "#000000"
}`);

    const radio = getByLabelText('SASS/LESS')
    fireEvent.click(radio);

    textarea = container.querySelector('textarea');

    expect(textarea?.value).toBe(`@color-blue_violet-50: bv50;
@color-blue_violet-100: bv100;
@color-blue_violet-200: bv200;
@color-blue_violet-300: bv300;
@color-blue_violet-400: bv400;
@color-blue_violet-500: bv500;
@color-blue_violet-600: bv600;
@color-blue_violet-700: bv700;
@color-blue_violet-800: bv800;
@color-blue_violet-900: bv900;

@color-white: #ffffff;

@color-black: #000000;
`);
  });

  test('click on copy button shwos', () => {
    global.document.execCommand = jest.fn();

    const { container } = render(<SchemeOutput value={scheme1} />);
    const button = container.querySelector('button[aria-label="copy"]');

    button && fireEvent.click(button);

    expect(global.document.execCommand).toHaveBeenCalledWith('copy');
  });

  test('output depends on colorAlias', () => {
    const { container } = render(
      <UrlContextWrapper>
        <SchemeOutput value={scheme1} />
      </UrlContextWrapper>
    );

    let textarea = container.querySelector('textarea');

    expect(textarea?.value).toBe(
      `{
  "purple": {
    "50": "bv50",
    "100": "bv100",
    "200": "bv200",
    "300": "bv300",
    "400": "bv400",
    "500": "bv500",
    "600": "bv600",
    "700": "bv700",
    "800": "bv800",
    "900": "bv900"
  },
  "white": "#ffffff",
  "black": "#000000"
}`);
  })
});
