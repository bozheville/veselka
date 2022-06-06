import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Global } from '@emotion/core';

import Layout from 'components/Layout';
import PageDataContext, { usePageContext } from 'components/Page/PageContext';
// import PagePlaceholder from 'components/PagePlaceholder';
import customTheme from 'services/theme';
import menuJson from 'services/menu-items.json';
import globalStyles from 'styled/global';
import { MenuItem } from 'types';
import UrlContext, { useUrlContext } from 'services/UrlContext';
import WheelPage from 'pages/Wheel';

import favicon from './favicon.svg';

const menuItems = menuJson as unknown as MenuItem[];

const App: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <ThemeProvider theme={customTheme}>
      <Head>
        {/* <link
          rel="icon"
          type="image/png"
          href={favicon}
        /> */}
        <meta
          property="og:title"
          content={t('title')}
        />
        <meta
          property="og:image"
          content={favicon}
        />
        <meta
          property="og:description"
          content={t('descriptoin')}
        />
      </Head>
      <UrlContext.Provider value={useUrlContext()}>
        <CSSReset />
        <Global styles={globalStyles} />
        <PageDataContext.Provider value={usePageContext()}>
            <Layout menuItems={menuItems}>
              <WheelPage />
            </Layout>
        </PageDataContext.Provider>
      </UrlContext.Provider>
    </ThemeProvider>
  );
};

App.displayName = 'Veselka';

export default App;
