import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Grid,
  Flex,
  FormLabel,
  Switch,
} from '@chakra-ui/core';

import { ColorShadesProps } from './colorData.d';
import { orderedColors, shadesList } from './constants';

const ColorShades: React.FC<ColorShadesProps> = ({
  schema,
  isBWShadesOn,
  onShadesChande,
}) => {
  const { t } = useTranslation('colorShades');

  return (
    <>
      <Flex justify="center" align="center">
        <FormLabel htmlFor="enable-bw-shades">
          {t('switch')}
        </FormLabel>
        <Switch
          value={isBWShadesOn}
          onChange={onShadesChande}
          size="lg"
          id="enable-bw-shades"
        />
      </Flex>
      <Grid templateColumns="repeat(16, 1fr)">
        {shadesList.map(shade => (
          <React.Fragment key={`shade-${shade}`}>
            <Box>{shade}</Box>
            {orderedColors.map(colorName => {
              const shadeNum = !isBWShadesOn && ['BLACK', 'WHITE'].includes(colorName) ? 500 : shade;

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
    </>
  );
};

ColorShades.displayName = 'ColorShades';

export default ColorShades;
