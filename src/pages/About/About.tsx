import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import Button from 'components/Button';
import Page from 'components/Page';
import { IAboutProps } from './types';
import { Heading, Text, List, ListItem, Box } from '@chakra-ui/core';

const About: React.FC<IAboutProps> = () => {
  const { t } = useTranslation('about');

  return (
    <Page color="white" title={t('title')} maxWidth="680px">
      <Text p="2">{t('welcome')}</Text>
      <Text p="2">{t('veselka_is_different')}</Text>
      <Heading p="2" size="md">{t('why.title')}</Heading>
      <List p="2" styleType="decimal">
        {
          (t('why.list', {returnObjects: true}) as string[])
            .map((point) => (<ListItem key={point}>{point}</ListItem>))
        }
      </List>
      <Text p="2">{t('why.explain')}</Text>
      <Heading p="2" size="md">{t('possibilities.title')}</Heading>
      <List p="2" styleType="decimal">
        {
          (t('possibilities.list', {returnObjects: true}) as string[])
            .map((point) => (<ListItem key={point}>{point}</ListItem>))
        }
      </List>
      {
        (t('thanks', {returnObjects: true}) as string[])
          .map((line) => (<Text p="2" key={line}>{line}</Text>))
      }
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
      >
        <Link href="/" passHref={true}>
          <Button as="a" variantColor="purple">
            {t('lets_start')}
          </Button>
        </Link>
      </Box>
    </Page>
  );
};

About.displayName = 'About';

export default About;
