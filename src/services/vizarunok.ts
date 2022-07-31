import { mix, shade as darken, tint } from 'polished';

import { ColorAlias, ColorSchema } from 'types';

import { defaultColors, orderedColors, defaultColorAlias } from './constants';

const hex = (value: number) => value.toString(16);

const getChannelColor = (min: number, max: number) => min + Math.round(Math.random() * (max-min));

export const getRandomColorHex = () => {
  const min = 64;
  const max = 191;

  const red = getChannelColor(min, max);
  const green = getChannelColor(min, max);
  const blue = getChannelColor(min, max);

  return `${hex(red)}${hex(green)}${hex(blue)}`;
};

export const getRandomBalance = () => {
  const balanceList = [.3, .35, .4, .45, .5];

  return balanceList[Math.floor(Math.random() * balanceList.length)];
};

export const hex2rgb = (hex: string): number[] => {
  const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const match = hexRegex.exec(hex.replace('#', ''));

  if (!match) {
    throw new Error(`wrong input format of a value "${hex}"`);
  }

  match.shift();
  return match.map((partial) => parseInt(partial, 16));
};

export const rgb2hex = (red: number, green: number, blue: number) => `#${hex(red)}${hex(green)}${hex(blue)}`;

export const calculateSchema = (colors: ColorAlias): ColorSchema =>
  Object.entries(colors)
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

export const calculateColors = (rootColor: string, balance: number): ColorAlias =>
  Object
    .entries(defaultColors)
    .reduce((result, color) => {
      const [ colorKey, colorValue ] = color;

      const isBasic = ['BLACK', 'GRAY', 'WHITE'].includes(colorKey);
      const numericBalance = parseFloat(String(balance));
      const weightModifier = isBasic ? (1-numericBalance)/2 : 0;
      const colorweight = numericBalance - weightModifier;

      const updatedColor = mix(
        colorweight,
        rootColor,
        colorValue
      );

      return {
        ...result,
        [colorKey]: updatedColor
      };
    }, {}) as ColorAlias;;

export const deserializeColorAlias = (aliasString: string) => {
  let aliasValue: ColorAlias = {...defaultColorAlias};

  const urlAlias = aliasString.split('~');

  for (const [index, color] of Object.entries(orderedColors)) {
    if (urlAlias[parseInt(index, 10)]) {
      aliasValue[color] = urlAlias[parseInt(index, 10)];
    }
  }

  return aliasValue;
};
