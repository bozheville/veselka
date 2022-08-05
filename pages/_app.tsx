import React from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Global } from '@emotion/core';
import globalStyles from 'styled/global';
import { useCookie } from 'hooks';

import customTheme from 'services/theme';
import ThemeSwitchContext from 'services/ThemeSwitchContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isLightTheme, setIsLightTheme] = useCookie<boolean>(
    'is_light_theme',
    typeof window !== 'undefined' && window.matchMedia("(prefers-color-scheme: light)").matches
  );

  return (
    <ThemeSwitchContext.Provider value={{isLightTheme, setIsLightTheme}}>
      <ThemeProvider theme={customTheme(isLightTheme)}>
        <Global styles={globalStyles} />
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </ThemeSwitchContext.Provider>
  );
};

export default appWithTranslation(MyApp);
