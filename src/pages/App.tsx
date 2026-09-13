import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';

import Layout from 'components/Layout';
import PageDataContext, { usePageContext } from 'components/Page/PageContext';
// import PagePlaceholder from 'components/PagePlaceholder';
import menuJson from 'services/menu-items.json';
import { MenuItem } from 'types';
import UrlContext, { useUrlContext } from 'services/UrlContext';
import ColorSchemaContext, { useColorSchemaContext } from 'services/ColorSchemaContext';
import WheelPage from 'pages/Wheel';
import resolveInitialWheelState, { InitialWheelState } from 'services/resolveInitialWheelState';
import { calculateColors, calculateSchema } from 'services/vizarunok';
import { defaultColorAlias } from 'services/constants';

const menuItems = menuJson as unknown as MenuItem[];

// Deterministic so the client's first render matches the statically
// generated HTML. resolveInitialWheelState() reads the URL and may
// randomize a color, so it only runs after mount (see useEffect below).
const FALLBACK_STATE: InitialWheelState = (() => {
  const color = '4a90d9';
  const balance = 0.4;
  const defaultColors = calculateColors(`#${color}`, balance, false);

  return {
    color,
    balance,
    defaultColors,
    defaultSchema: calculateSchema(defaultColors),
    initialColorAlias: { ...defaultColorAlias },
    initialKeepBW: false,
  };
})();

interface WheelStateProviderProps extends InitialWheelState {
  isWelcomeClosed: boolean;
}

const WheelStateProvider: React.FC<WheelStateProviderProps> = ({
  color,
  balance,
  defaultColors,
  defaultSchema,
  initialColorAlias,
  initialKeepBW,
  isWelcomeClosed,
}) => (
  <UrlContext.Provider value={useUrlContext(color, balance, initialColorAlias, initialKeepBW)}>
    <ColorSchemaContext.Provider value={useColorSchemaContext(defaultColors, defaultSchema)}>
      <PageDataContext.Provider value={usePageContext()}>
        <Layout menuItems={menuItems}>
          <WheelPage isWelcomeClosed={isWelcomeClosed} />
        </Layout>
      </PageDataContext.Provider>
    </ColorSchemaContext.Provider>
  </UrlContext.Provider>
);

const App: React.FC = () => {
  const { t } = useTranslation('common');
  const [wheelState, setWheelState] = useState<InitialWheelState & { resolved: boolean }>({
    ...FALLBACK_STATE,
    resolved: false,
  });

  useEffect(() => {
    setWheelState({ ...resolveInitialWheelState(), resolved: true });
  }, []);

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
      <WheelStateProvider
        key={wheelState.resolved ? 'resolved' : 'initial'}
        {...wheelState}
        isWelcomeClosed={false}
      />
    </>
  );
};

App.displayName = 'Veselka';

export default App;
