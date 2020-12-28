import React, { useCallback, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { mix } from 'polished';

import { Flex } from '@chakra-ui/core';

import { Page, Welcome } from 'components';
import { useLocalStorage } from 'hooks';
import { IWheelProps } from './types';

import FilterColor from './Settings';
import ColorData from './ColorData';
import UrlContext from 'services/UrlContext';

import {
  Circle,
  ColorAlias,
  SchemeOutput,
  Spectre,
} from 'organisms';

const VIOLET = '#92278f';
const ORANGE = '#f7941e';
const GREEN = '#00a651';

const RED_VIOLET = mix(0.5, RED, VIOLET);
const RED_ORANGE = mix(0.5, RED, ORANGE);
const BLUE_VIOLET = mix(0.5, BLUE, VIOLET);
const BLUE_GREEN = mix(0.5, BLUE, GREEN);
const YELLOW_GREEN = mix(0.5, YELLOW, GREEN);
const YELLOW_ORANGE = mix(0.5, YELLOW, ORANGE);

const BLACK = '#000000';
const GRAY = '#555555';
const WHITE = '#ffffff';
//
const defaultColors = {
  // PRIMARY
  RED,
  BLUE,
  YELLOW,

  // SECONDARY
  VIOLET,
  GREEN,
  ORANGE,

  // TERTIARY
  RED_ORANGE,
  RED_VIOLET,
  BLUE_VIOLET,
  BLUE_GREEN,
  YELLOW_GREEN,
  YELLOW_ORANGE,

  // BASIC
  BLACK,
  GRAY,
  WHITE,
};

const Wheel: React.FC<IWheelProps> = () => {
  const [isFilterVisible, setIsFilterVIsible] = useState(false);
  const [filterColor, setFilterColor] = useState('');
  const [filterWeight, setFilterWeight] = useState(1);
  const [colors, setColors] = useState<{[key:string]: string}>(defaultColors);
  const { t } = useTranslation('pages');
  const [ isWelcomeClosed, setIsWelcomeClosed ] = useLocalStorage<boolean>('isWelcomeClosed', false);

  const handleWelcomeClose = useCallback(() => setIsWelcomeClosed(true), [setIsWelcomeClosed]);
  const {shade, balance, colorAlias, updateUrl} = useContext(UrlContext);

  useEffect(() => {
    setFilterColor(`#${shade}`);
    setFilterWeight(1-(balance));
    setIsFilterVIsible(true);
  }, [shade, balance]);

  useEffect(() => {
    if (!filterColor) {
      setColors(defaultColors);
    } else {
      setColors(
        Object
          .entries(defaultColors)
          .reduce((result, color) => {
            const [ colorKey, colorValue ] = color;
            const isBasic = ['BLACK', 'GRAY', 'WHITE'].includes(colorKey);
            const weightModifier = (isBasic ? (1-filterWeight)/2 : 0);
            const updatedColor = mix(
              filterWeight + weightModifier,
              colorValue,
              filterColor
            );

            return {
              ...result,
              [colorKey]: updatedColor
            };
          }, {})
      );
    }

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
