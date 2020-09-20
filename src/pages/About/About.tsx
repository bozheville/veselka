import React from 'react';
import { useTranslation } from 'react-i18next';

import Page from 'components/Page';
import { IAboutProps } from './types';
import { Heading, Text } from '@chakra-ui/core';

const About: React.FC<IAboutProps> = () => {
  const { t } = useTranslation('pages');

  return (
    <Page color="white" title={t('about.title')}>
      <Heading mb="2rem" as="h1" size="xl">{t('about.title')}</Heading>

      <Text>
        Welcome to veselka - the easiest way to create a color schema for your project.
        Don't expect too much. It's simple, primitive and can't do much.
        All for making the process easy and fast.
      </Text>
      <Text>
        There are a lot of outstanding services for creating a wonderful
        thoughtful color schemas for proffessional UX designers.
      </Text>
      <Text>
        Veselka is for others. Using veselta you can create a unique
        color schema for your project in seconds. Why do you need it?
      </Text>
      <Text>
        1. Because you want a unique look for your site
        <br />
        2. Because you don't wan't to spend much time on it
      </Text>
      <Text>
        I created veselka because I create some
      </Text>
      <Text>
        Thanks for using it.
      </Text>
      <Text>
        Denys Grybov
      </Text>
    </Page>
  );
};

About.displayName = 'About';

export default About;
