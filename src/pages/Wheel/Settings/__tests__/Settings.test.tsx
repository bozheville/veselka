import React from 'react';
import { createMemoryHistory } from 'history';
import { MemoryRouter, Router } from 'react-router-dom';
import { render, fireEvent, waitFor } from 'services/test-utils';
import UrlContext, { useUrlContext } from 'services/UrlContext';
import Settings from '../Settings';

function mockRRD() {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useLocation: jest.fn().mockReturnValue({
      pathname: '/',
      search: '',
      hash: '',
      state: null,
      key: '5nvxpbdafa',
    }),
  };
}
jest.mock('react-router-dom', () => mockRRD());


const TextAppWrapperWithRouter: React.FC<{history: any}> = ({
  history,
}) => {
  const contextValue = useUrlContext();

  return (
    <Router history={history}>
      <UrlContext.Provider value={contextValue}>
        <Settings />
      </UrlContext.Provider>
    </Router>
  );
};
const TextAppWrapperWithMemoryRouter: React.FC<{initialEntries: string[]}> = ({
  initialEntries,
}) => {
  const contextValue = useUrlContext();

  return (
    <MemoryRouter initialEntries={initialEntries}>
      <UrlContext.Provider value={contextValue}>
        <Settings />
      </UrlContext.Provider>
    </MemoryRouter>
  );
};

describe('Settings section', () => {
  test('Color sliders control color input value and URL', async () => {

    const history = createMemoryHistory();

    const { container, getByTestId } = render(<TextAppWrapperWithRouter history={history} />);

    const textInput = container?.querySelector('input[name="color"]') as HTMLInputElement;

    expect(textInput.value).toBe('#7f7f7f');

    fireEvent.input(getByTestId('red-slider'), {target: {value: '1'}});
    expect(textInput.value).toBe('#017f7f');

    fireEvent.input(getByTestId('green-slider'), {target: {value: '2'}});
    expect(textInput.value).toBe('#01027f');

    fireEvent.input(getByTestId('blue-slider'), {target: {value: '3'}});
    expect(textInput.value).toBe('#010203');

    waitFor(() => {
      expect((new URLSearchParams(history.location.search)).get('c')).toBe('010203');
    });
  });

  test('Balance slider controls url', async () => {
    const history = createMemoryHistory();

    const { getByTestId } = render(<TextAppWrapperWithRouter history={history} />);

    const balanceSlider = await waitFor(() => getByTestId('balance-slider'));

    fireEvent.input(
      balanceSlider,
      {target: {value: '0.45'}}
    );

    waitFor(() => {
      expect((new URLSearchParams(history.location.search)).get('w')).toBe('0.45');
    });
  });

  test('Color input controls url', async () => {
    const history = createMemoryHistory();

    const { getByTestId } = render(<TextAppWrapperWithRouter history={history} />);

    const colorInput = await waitFor(() => getByTestId('color-input'));

    waitFor(() => {
      expect((new URLSearchParams(history.location.search)).get('c')).toBe('7f7f7f');
    });

    fireEvent.input(
      colorInput,
      {target: {value: '#fefefe'}}
    );

    waitFor(() => {
      expect((new URLSearchParams(history.location.search)).get('c')).toBe('fefefe');
    });
  });

  test.todo('Values can be initialized from url');
});
