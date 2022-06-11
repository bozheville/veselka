import React, { useCallback, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'next-i18next';
import { mix, shade as darken, tint } from 'polished';

import { Flex } from '@chakra-ui/core';

import { defaultColors } from 'services/constants';

import { ColorAlias as TColorAlias, ColorSchema } from 'types';
import { Page, Welcome } from 'components';
import { useLocalStorage } from 'hooks';
import { IWheelProps } from './types';

import FilterColor from './Settings';
import UrlContext from 'services/UrlContext';

import {
  Circle,
  ColorAlias,
  SchemeOutput,
  Spectre,
} from 'organisms';

const Wheel: React.FC<IWheelProps> = () => {
  const [isFilterVisible, setIsFilterVIsible] = useState(false);
  const [colors, setColors] = useState<{[key :string]: string}>(defaultColors);
  const [schema, setSchema] = useState<ColorSchema|null>(null);
  const { t } = useTranslation('pages');
  const [ isWelcomeClosed, setIsWelcomeClosed ] = useLocalStorage<boolean>('isWelcomeClosed', false);

  const handleWelcomeClose = useCallback(() => setIsWelcomeClosed(true), [setIsWelcomeClosed]);
  const {shade, balance, colorAlias, updateUrl} = useContext(UrlContext);

  useEffect(() => {
    const filterColor = `#${shade}`;
    const filterWeight = 1-(balance ?? 1);
    setIsFilterVIsible(true);

    if (!shade) {
      setColors(defaultColors);
    } else {
      const newColors = Object
        .entries(defaultColors)
        .reduce((result, color) => {
          const [ colorKey, colorValue ] = color;
          const isBasic = ['BLACK', 'GRAY', 'WHITE'].includes(colorKey);
          const weightModifier = isBasic ? (1-filterWeight)/2 : 0;
          const updatedColor = mix(
            filterWeight + weightModifier,
            colorValue,
            filterColor
          );

          return {
            ...result,
            [colorKey]: updatedColor
          };
        }, {}) as {[key :string]: string};

      setColors(newColors);

      const schema = Object.entries(newColors)
        .reduce((result, [colorName, color]) => ({
          ...result,
          [colorName]: {
            50: tint(5/6, color),
            100: tint(4/6, color),
            200: tint(3/6, color),
            300: tint(2/6, color),
            400: tint(1/6, color),
            500: color,
            600: darken(1/6, color),
            700: darken(2/6, color),
            800: darken(3/6, color),
            900: darken(4/6, color),
          }
        }), {}) as ColorSchema;

      setSchema(schema);
    }
  }, [shade, balance]);

  const handleAliasChange = useCallback((updatedAlias: TColorAlias) => {
    updateUrl({
      colorAlias: updatedAlias,
    });
  }, [updateUrl]);

  return (
    <Page title={t('wheel.title')}>
      {!isWelcomeClosed && <Welcome onClose={handleWelcomeClose} /> }
      <Flex
        justifyContent="space-between"
        flexDirection={['column', 'column', 'row', 'row']}
      >
        <Flex
          flexDirection={['row', 'row', 'column', 'column']}
          width={['100%', '100%', '67%', '70%']}
          maxHeight={['45vh', '45vh', '80vh', null]}
          marginBottom={['2rem', '2rem', 0, 0]}
        >
          <Circle colors={colors} size={450} />
        </Flex>
        <Flex
          flexDirection={['row', 'row', 'column', 'column']}
          width={['100%', '100%', '33%', '30%']}
          paddingLeft={['0', '0', '4', '0']}
        >
          {isFilterVisible && <FilterColor />}
        </Flex>
      </Flex>
      {schema && (
        <>
          <Spectre value={schema} />
          <ColorAlias
            defaultValue={colorAlias}
            schema={schema}
            onChange={handleAliasChange}
          />
          <SchemeOutput value={schema} colorAlias={colorAlias} />
        </>
      )}
    </Page>
  );
};

Wheel.displayName = 'Wheel';

export default Wheel;
