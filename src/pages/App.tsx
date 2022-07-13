import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import Layout from 'components/Layout';
import PageDataContext, { usePageContext } from 'components/Page/PageContext';
// import PagePlaceholder from 'components/PagePlaceholder';
import menuJson from 'services/menu-items.json';
import { AppProps, MenuItem } from 'types';
import UrlContext, { useUrlContext } from 'services/UrlContext';
import ColorSchemaContext, { useColorSchemaContext } from 'services/ColorSchemaContext';
import WheelPage from 'pages/Wheel';

const menuItems = menuJson as unknown as MenuItem[];

const App: React.FC<AppProps> = ({
  color,
  balance,
  defaultColors,
  defaultSchema,
  initialColorAlias,
  isWelcomeClosed,
}) => {
  const { t } = useTranslation('common');

  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon.svg"
        />
        <meta
          property="og:title"
          content={t('title')}
        />
        <meta
          property="og:image"
          content="/images/favicon.svg"
        />
        <meta
          property="og:description"
          content={t('descriptoin')}
        />
      </Head>
      <UrlContext.Provider value={useUrlContext(color, balance, initialColorAlias)}>
        <ColorSchemaContext.Provider value={useColorSchemaContext(defaultColors, defaultSchema)}>
          <PageDataContext.Provider value={usePageContext()}>
              <Layout menuItems={menuItems}>
                <WheelPage isWelcomeClosed={isWelcomeClosed} />
              </Layout>
          </PageDataContext.Provider>
        </ColorSchemaContext.Provider>
      </UrlContext.Provider>
    </>
  );
};

App.displayName = 'Veselka';

export default App;
