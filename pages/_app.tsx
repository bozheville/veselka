import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Global } from '@emotion/core';
import globalStyles from 'styled/global';
import { useCookie } from 'hooks';

import 'services/i18n';
import customTheme from 'services/theme';
import ThemeSwitchContext from 'services/ThemeSwitchContext';

const TypedThemeProvider = ThemeProvider as React.FC<React.PropsWithChildren<{ theme?: unknown }>>;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isLightTheme, setIsLightTheme] = useCookie<boolean>(
    'is_light_theme',
    typeof window !== 'undefined' && window.matchMedia("(prefers-color-scheme: light)").matches
  );

  return (
    <ThemeSwitchContext.Provider value={{isLightTheme, setIsLightTheme}}>
      <TypedThemeProvider theme={customTheme(isLightTheme)}>
        <Global styles={globalStyles} />
        <CSSReset />
        <Component {...pageProps} />
      </TypedThemeProvider>
    </ThemeSwitchContext.Provider>
  );
};

export default MyApp;
