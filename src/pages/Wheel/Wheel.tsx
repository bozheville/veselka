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

const defaultColors = [
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
];


const Wheel: React.FC<IWheelProps> = () => {
  const [filterColor, setFilterColor] = useState('');
  const [filterWeight, setFilterWeight] = useState(1);
  const [colors, setColors] = useState<string[]>([...defaultColors]);
  const { t } = useTranslation('pages');

  const handleFilterColorChange = useCallback((color, weight) => {
    setFilterColor(color);
    setFilterWeight(weight);
  }, []);

  useEffect(() => {
    if (!filterColor) {
      setColors(defaultColors);
    } else {
      setColors(defaultColors.map(color => mix(filterWeight, color,filterColor )));
    }
  }, [filterColor, filterWeight]);

  return (
    <Page title={t('wheel.title')}>
      <Flex justifyContent="space-between">
        <Flex>
          <Circle colors={colors} size={450} />
        </Flex>
        <Flex>
          <FilterColor onChange={handleFilterColorChange} />
        </Flex>

      </Flex>
      <ColorData colors={colors} />
    </Page>
  );
};

Wheel.displayName = 'Wheel';

export default Wheel;
