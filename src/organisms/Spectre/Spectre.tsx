import React from 'react';
import { Box, Grid } from '@chakra-ui/core';
import { SpectreProps } from './types.d';

import { shadesList, keyColors, orderedColors } from 'services/constants';
import { Shade } from 'types';
import { useSpectre } from './useSpectre';
import { ClipboardInput, SpectreCell } from './SpectreComponents';

const Spectre: React.FC<SpectreProps> = ({value }) => {
  const { handleClick, ref } = useSpectre();

  return (
    <Grid templateColumns="repeat(16, 0fr)" padding="4" justifyContent="center">
      {shadesList.map((shade) => (
        <React.Fragment key={`shade-${shade}`}>
          <Box color="white" padding="40% 6px 0 0">{shade}</Box>
          {orderedColors.map(colorName => {
            const shadeNum: Shade = keyColors.has(colorName) ? 500 : shade as Shade;

            return (
              <SpectreCell
                key={`shade-${colorName}-${shade}`}
                color={value[colorName][shadeNum]}
                hasBorderRadius={!keyColors.has(colorName)}
                onClick={handleClick(value[colorName][shadeNum])}
              />
            );
          })}

        </React.Fragment>
      ))}
      <ClipboardInput ref={ref} />
    </Grid>
  );
};

Spectre.displayName = 'Spectre';

export default Spectre;
