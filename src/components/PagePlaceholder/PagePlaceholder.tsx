import React from 'react';
import { Box, Spinner } from '@chakra-ui/core';

const PagePlaceholder: React.FC = () => {
  return (
    <Box
      textAlign="center"
      marginTop="50%"
      color="white"
      transform="translateY(-50%)"
    >
      <Spinner
        size="xl"
        thickness="4px"
        speed="0.65s"
        color="gray.300"
      />
    </Box>
  );
}

PagePlaceholder.displayName = 'PagePlaceholder';

export default PagePlaceholder;
