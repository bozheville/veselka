import React from 'react';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/core';

import Button from '../Button';
import { WelcomeProps } from './Welcome.d';

const Welcome: React.FC<WelcomeProps> = ({
  onClose,
}) => {
  return (
    <Box
      paddingX="8"
      paddingY="4"
      marginBottom="4"
      rounded="lg"
      backgroundColor="purple.600"
      color="white"
    >
      <Heading as="h1" size="xl">Welcome to Veselka</Heading>
      <Heading as="h3" size="md" marginBottom="4">The easiest tool for creating a color scheme</Heading>
      <Text>All you need to do is:</Text>
      <List as="ol" styleType="decimal">
        <ListItem>Pick a shade color</ListItem>
        <ListItem>Set a balance between a spectre and a shade</ListItem>
        <ListItem>Select output format</ListItem>
        <ListItem>Copy your color scheme to clipboard</ListItem>
      </List>
      <Text>You can do it in seconds</Text>
      <Text>Additionally you can rename color names if your design system requires</Text>
      <Button
        marginTop="6"
        variantColor="pink"
        onClick={onClose}
      >
        Got it
      </Button>
    </Box>
  );
};

Welcome.displayName = 'Welcome';

export default Welcome;
