import React, { Suspense, useMemo, useState } from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Global } from '@emotion/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from 'components/Layout';
import PageDataContext from 'components/Page/PageContext';
import PagePlaceholder from 'components/PagePlaceholder';
import customTheme from 'services/theme';
import menuJson from 'services/menu-items.json';
import globalStyles from 'styled/global';
import { MenuItem } from 'types';
import UrlContext, { useUrlContext } from 'services/UrlContext';

const menuItems = menuJson as unknown as MenuItem[];

const AboutPage = React.lazy(() => import('pages/About'));
const WheelPage = React.lazy(() => import('pages/Wheel'));
const Page404 = React.lazy(() => import('pages/Page404'));

const App: React.FC = () => {
  const [title, setTitle] = useState('');

  const pageContextState = useMemo(() => ({ title, setTitle }), [title, setTitle]);
  const urlContextvalue = useUrlContext();

  return (
    <ThemeProvider theme={customTheme}>
      <UrlContext.Provider value={urlContextvalue}>
      <CSSReset />
      <Global styles={globalStyles} />
      <BrowserRouter>
        <PageDataContext.Provider value={pageContextState}>
            <Layout menuItems={menuItems}>
              <Suspense fallback={<PagePlaceholder />}>
                <Switch>
                  <Route path="/about" exact component={AboutPage} />
                  <Route path="/" exact component={WheelPage} />
                  <Route component={Page404} />
                </Switch>
              </Suspense>
            </Layout>
        </PageDataContext.Provider>
      </BrowserRouter>
      </UrlContext.Provider>
    </ThemeProvider>
  );
};

App.displayName = 'Veselka';

export default App;
