import React from 'react';
import { Box } from '@chakra-ui/core';

import { ColorDataProps } from '../types';

import useColorData from './useColorData';
import ColorAliasSection from './ColorAlias';
import ColorShadesSection from './ColorShades';
import SchemaOutputSection from './SchemaOutput';

const ColorData: React.FC<ColorDataProps> = ({
  colors,
}) => {
  const {
    output,
    schema,
    exportType,
    handleShadesChande,
    isBWShadesOn,
    handleExportTypeChange,
    handleAliasChange,
  } = useColorData(colors);

  return (
    <Box marginY="2rem" color="white">
      <ColorShadesSection
        schema={schema}
        isBWShadesOn={isBWShadesOn}
        onShadesChande={handleShadesChande}
      />
      <ColorAliasSection
        value={schema}
        onChange={handleAliasChange}
      />
      <SchemaOutputSection
        value={output}
        exportType={exportType}
        onExportTypeChange={handleExportTypeChange}
      />
    </Box>
  );
};

ColorData.displayName = 'ColorData';

export default ColorData;
