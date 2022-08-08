import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

import PageContext from './PageContext';

import { IPageProps } from './types';
import Container from '../Container';

const Page: React.FC<IPageProps> = ({
  children,
  title,
  ...props
}) => {
  const { setTitle } = useContext(PageContext);
  const { t } = useTranslation('common');

  useEffect(() => {
    setTitle(title || '');
  }, [title, setTitle]);

  return (
    <Container {...props}>
      <Head>
        <title>{`${title} • ${t('title')}`}</title>
        <meta name="description" content={`${t('title')}: ${t('subtitle')}`} />
      </Head>
      {children}
    </Container>
  );
};

Page.displayName = 'Page';

export default Page;
