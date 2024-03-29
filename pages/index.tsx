import { GetServerSideProps, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { calculateColors, calculateSchema, getRandomColorHex, getRandomBalance, deserializeColorAlias } from 'services/vizarunok';

export { default } from 'pages/App';

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en', query, req }) => {
  const {
    c: color = getRandomColorHex(),
    w: balance = getRandomBalance(),
    a: alias = '',
    s: keepBW = '0',
  } = query;

  const isWelcomeClosed =
    JSON.parse(
      req.headers.cookie?.split(';')
      .find((cookie: string) => cookie.trim().startsWith(`isWelcomeClosed=`))?.trim().split('=')[1]
      || 'false'
    );

  const numericBalance = parseFloat(String(balance));

  const initialKeepBW = keepBW !== '0';
  const defaultColors = calculateColors(`#${color}`, numericBalance, initialKeepBW);
  const defaultSchema = calculateSchema(defaultColors);
  const initialColorAlias = deserializeColorAlias(String(alias));

  return ({
    props: {
      color,
      balance: numericBalance,
      defaultColors,
      defaultSchema,
      initialColorAlias,
      isWelcomeClosed,
      initialKeepBW,
      ...(await serverSideTranslations(locale, [
        'common',
        'details',
        'footer',
        'pages',
        'welcome',
      ])),
    },
  });
} ;
