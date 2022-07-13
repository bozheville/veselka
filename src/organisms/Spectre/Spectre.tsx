import React from 'react';
import copy from 'copy-to-clipboard';
import { Box, Grid, useToast } from '@chakra-ui/core';
import { SpectreProps } from './types.d';

import { shadesList, keyColors, orderedColors } from 'services/constants';
import { Shade } from 'types';

const Spectre: React.FC<SpectreProps> = ({value }) => {
  const toast = useToast();

  const handleClick = (colorCode: string) => () => {
    copy(colorCode, {
      onCopy: () => {
        toast({
          description: `${colorCode} copied to clipboard (literal)`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

  return (
    <Grid templateColumns="repeat(16, 0fr)" padding="4" justifyContent="center">
      {shadesList.map((shade) => (
        <React.Fragment key={`shade-${shade}`}>
          <Box color="white" padding="40% 6px 0 0">{shade}</Box>
          {orderedColors.map(colorName => {
            const shadeNum: Shade = keyColors.has(colorName) ? 500 : shade as Shade;

            return (
              <Box
                as="button"
                cursor="pointer"
                key={`shade-${colorName}-${shade}`}
                backgroundColor={value[colorName][shadeNum]}
                width="12"
                height="12"
                borderRadius={keyColors.has(colorName) ? '' : '4px'}
                onClick={handleClick(value[colorName][shadeNum])}
              />
            );
          })}
        </React.Fragment>
      ))}
    </Grid>
  );
};

Spectre.displayName = 'Spectre';

export default Spectre;
