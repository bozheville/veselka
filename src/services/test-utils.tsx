import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Global } from '@emotion/core';

import 'services/i18n';
import globalStyles from 'styled/global';
import theme from './theme';

const TypedThemeProvider = ThemeProvider as React.FC<React.PropsWithChildren<{ theme?: unknown }>>;

export const CustomWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {

  const customTheme = theme(false);
  // const global = globalStyles(customTheme)

  return (
    <TypedThemeProvider theme={customTheme}>
      <CSSReset />
      <Global styles={globalStyles} />
      {children}
    </TypedThemeProvider>
  );
};

export const RouterWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <CustomWrapper>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </CustomWrapper>
);

const customRender = (component: React.ReactElement ) =>
  render(component, { wrapper: CustomWrapper });

export const renderWithRouter = (component: React.ReactElement ) =>
  render(component, { wrapper: RouterWrapper });

export * from '@testing-library/react';
export { customRender as render };
