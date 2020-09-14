import React, { useCallback, useState, useRef, useEffect } from 'react';
import {
  Box,
  Textarea,
  Radio,
  RadioGroup,
  IconButton,
} from '@chakra-ui/core';

import useLink from 'hooks/useLink';

import { ColorDataProps, UrlProps } from '../types';

import { orderedColors, defaultColorAlias } from './constants';
import useColorData from './useColorData';
import { ColorAlias } from './colorData.d';
import ColorAliasSection from './ColorAlias';
import ColorShadesSection from './ColorShades';

const ColorData: React.FC<ColorDataProps> = ({
  colors,
}) => {
  const [ exportType, setExportType ] = useState<string>('json');
  const [ colorAlias, setColorAlias ] = useState<ColorAlias>({});

  const {
    output,
    schema,
    handleShadesChande,
    isBWShadesOn
  } = useColorData(colors, exportType, colorAlias);

  const { updateURL, queryParams } = useLink<UrlProps>();

  const outputRef = useRef<HTMLTextAreaElement>(null);

  const handleCopyClick = useCallback(() => {
    outputRef?.current?.select();
    document.execCommand('copy');
  }, [])

  useEffect(() => {
    if (queryParams.a) {
      const colorAlias: ColorAlias = {};
      const urlAlias = queryParams.a.split('~');
      for (const [index, color] of Object.entries(orderedColors)) {
        if (urlAlias[parseInt(index, 10)]) {
          colorAlias[color] = urlAlias[parseInt(index, 10)];
        }
      }

      setColorAlias(colorAlias);
    } else {
      setColorAlias({});
    }
  }, [queryParams.a])

  const handleExportTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExportType(event.target.value);
  };

  const handleAliasChange = useCallback((value: ColorAlias) => {
    updateURL({
      a: orderedColors.map(
        (color) => defaultColorAlias[color] !== value[color]
          ? value[color]
          : ''
      ).join('~'),
    })
  }, [updateURL]);

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
      <Box marginTop="1rem" position="relative">
        <RadioGroup value={exportType} isInline onChange={handleExportTypeChange}>
          <Radio value="json">JSON</Radio>
          <Radio value="sass">SASS/LESS</Radio>
        </RadioGroup>
        <IconButton
          icon="copy"
          aria-label="copy"
          onClick={handleCopyClick}
          position="absolute"
          bottom="4"
          right="4"
          zIndex={1}
        />
        <Textarea
          ref={outputRef}
          value={output}
          height="10rem"
          backgroundColor="#444"
          isReadOnly={true}
        />
      </Box>
    </Box>
  );
};

ColorData.displayName = 'ColorData';

export default ColorData;
