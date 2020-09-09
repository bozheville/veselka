import React, { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { mix } from 'polished';

import { Flex } from '@chakra-ui/core';

import { Page } from 'components';
import { IWheelProps } from './types';
import Circle from './Circle';
import FilterColor from './FilterColor';
import ColorData from './ColorData';

const RED = '#ed1c24';
const BLUE = '#0f75bc';
const YELLOW = '#fff200';

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
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [filterColor, setFilterColor] = useState('');
  const [filterWeight, setFilterWeight] = useState(1);
  const [colors, setColors] = useState<{[key:string]: string}>({...defaultColors});
  const { t } = useTranslation('pages');

  const handleFilterColorChange = useCallback((color, weight) => {
    setFilterColor(color);
    setFilterWeight(weight);
  }, []);

  const handleViewDetailsClick = useCallback(() => setIsDetailsVisible(true), []);

  useEffect(() => {
    if (!filterColor) {
      setColors(defaultColors);
    } else {
      setColors(
        Object
          .entries(defaultColors)
          .reduce((result, color) => ({
            ...result,
            [color[0]]: mix(filterWeight + (['BLACK', 'GRAY', 'WHITE'].includes(color[0]) ? (1-filterWeight)/2 : 0), color[1], filterColor )
          }), {})
      );
    }

    setIsDetailsVisible(false);
  }, [filterColor, filterWeight]);

  return (
    <Page title={t('wheel.title')}>
      <Flex justifyContent="space-between" flexDirection={['column', 'column', 'row', 'row']}>
        <Flex
          flexDirection={['row', 'row', 'column', 'column']}
          width={['100%', '100%', '67%', '75%']}
          maxHeight={['45vh', '45vh', '80vh', null]}
          marginBottom={['2rem', '2rem', 0, 0]}
        >
          <Circle colors={colors} size={450} />
        </Flex>
        <Flex
          flexDirection={['row', 'row', 'column', 'column']}
          width={['100%', '100%', '33%', '25%']}
        >
          <FilterColor
            onChange={handleFilterColorChange}
            onViewDetailsClick={handleViewDetailsClick}
          />
        </Flex>
      </Flex>
      { isDetailsVisible && <ColorData colors={colors} /> }
    </Page>
  );
};

Wheel.displayName = 'Wheel';

export default Wheel;
