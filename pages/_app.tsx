import React from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Global } from '@emotion/core';
import globalStyles from 'styled/global';

import customTheme from 'services/theme';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={customTheme}>
    <CSSReset />
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default appWithTranslation(MyApp);
