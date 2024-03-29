import React from 'react';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/core';

import Button from '../Button';
import { WelcomeProps } from './Welcome.d';
import { useTranslation } from 'next-i18next';

const Welcome: React.FC<WelcomeProps> = ({
  isVisible = true,
  onClose,
}) => {
  const { t } = useTranslation('welcome');
  const display = isVisible ? 'block' : 'none';

  return (
    <Box
      paddingX="8"
      paddingY="4"
      marginBottom="4"
      rounded="lg"
      backgroundColor="purple.600"
      color="white"
      display={display}
    >
      <Heading as="h1" size="xl">
        {t('title')}
      </Heading>
      <Heading
        as="h2"
        size="md"
        marginBottom="4"
      >
        {t('subtitle')}
      </Heading>
      <Text>{t('all_you_need')}</Text>
      <List as="ol" styleType="decimal">
        {(t('steps', {returnObjects: true}) as string[] || []).map((step) => (
          <ListItem key={step}>{step}</ListItem>
        ))}
      </List>
      <Text paddingTop="4">{t('you_can_do_it_in_seconds')}</Text>
      <Text paddingTop="4">{t('you_can_rename')}</Text>
      <Button
        marginTop="6"
        variantColor="purple"
        onClick={onClose}
      >
        Got it
      </Button>
    </Box>
  );
};

Welcome.displayName = 'Welcome';

export default Welcome;
