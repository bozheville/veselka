import React from 'react';
import {
  Box,
  Grid,
} from '@chakra-ui/core';

import { ColorShadesProps } from './colorData.d';
import { orderedColors, shadesList } from './constants';

const ColorShades: React.FC<ColorShadesProps> = ({
  schema,
}) => {

  return (
    <Grid templateColumns="repeat(16, 1fr)">
      {shadesList.map(shade => (
        <React.Fragment key={`shade-${shade}`}>
          <Box>{shade}</Box>
          {orderedColors.map(colorName => {
            const shadeNum = ['BLACK', 'WHITE'].includes(colorName) ? 500 : shade;

            return (
              <Box
                key={`shade-${colorName}-${shade}`}
                backgroundColor={schema?.[colorName]?.[shadeNum]}
                w="100%"
                h="8"
              />
            );
          })}
        </React.Fragment>
      ))}
    </Grid>
  );
};

ColorShades.displayName = 'ColorShades';

export default ColorShades;
