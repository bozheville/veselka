import React from 'react';
import { SpectreProps } from './types.d';
import { Box, Grid } from '@chakra-ui/core';

import { shadesList, keyColors, orderedColors } from 'services/constants';
import { Shade } from 'types';

const Spectre: React.FC<SpectreProps> = ({value }) => {
  return (
      <Grid templateColumns="repeat(16, 1fr)" padding="4">
        {shadesList.map((shade) => (
          <React.Fragment key={`shade-${shade}`}>
            <Box color="white">{shade}</Box>
            {orderedColors.map(colorName => {
              const shadeNum: Shade = keyColors.has(colorName) ? 500 : shade as Shade;

              return (
                <Box
                  key={`shade-${colorName}-${shade}`}
                  backgroundColor={value[colorName][shadeNum]}
                  width="100%"
                  height="8"
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
