import React from 'react';
import { Box } from '@chakra-ui/core';

import { ColorDataProps } from '../types';

import useColorData from './useColorData';
import ColorAliasSection from './ColorAlias/ColorAlias';
import ColorShadesSection from './ColorShades';
import SchemaOutputSection from './SchemeOutput';

const ColorData: React.FC<ColorDataProps> = ({
  colors,
}) => {
  const { schema, colorAlias } = useColorData(colors);

  return (
    <Box marginY="2rem" color="white">
      <ColorShadesSection schema={schema}/>
      <ColorAliasSection value={schema}/>
      {schema && <SchemaOutputSection value={schema} colorAlias={colorAlias} />}
    </Box>
  );
};

ColorData.displayName = 'ColorData';

export default ColorData;
