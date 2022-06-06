import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next'

export { default } from 'pages/App';

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'common',
      'details',
      'footer',
      'pages',
      'welcome',
    ])),
  },
});
