import React from 'react';
import { Box, Button, Heading, Text } from '@chakra-ui/core';
import { CookieBannerProps } from './CookieBanner.d';

const CookieBanner: React.FC<CookieBannerProps> = ({
  onClose,
}) => {
  return (
    <Box
      position="fixed"
      bottom="4"
      right="4"
      width="300px"
      maxWidth="calc(100% - 2rem)"
      backgroundColor="blue.800"
      color="white"
      padding="4"
      fontSize="13px"
      zIndex={100}
      border="1px solid"
      borderColor="gray.200"
      rounded="md"
      boxShadow="0 0 4px 1px rgba(255,255,255,0.6)"
    >
      <Heading as="h4" size="md">We use localStorage.</Heading>
      <Text>We don't send storred data anywhere.</Text>
      <Text>No third parties, no tracking. </Text>
      <Text>Only your best user experience.</Text>

      <Button
        marginTop="4"
        variantColor="teal"
        onClick={onClose}
      >
        Fine, I trust you
      </Button>
    </Box>
  );
};

CookieBanner.displayName = 'CookieBanner';

export default CookieBanner;
