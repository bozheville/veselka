import { Color, ColorAlias } from 'types';
import { mix } from 'polished';

export const keyColors = new Set(['BLACK', 'WHITE']);

export const orderedColors: Color[] = [
  'RED',
  'RED_VIOLET',
  'VIOLET',
  'BLUE_VIOLET',
  'BLUE',
  'BLUE_GREEN',
  'GREEN',
  'YELLOW_GREEN',
  'YELLOW',
  'YELLOW_ORANGE',
  'ORANGE',
  'RED_ORANGE',
  'GRAY',
  'BLACK',
  'WHITE',
];

export const shadesList = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

export const RED = '#ed1c24';
export const BLUE = '#0f75bc';
export const YELLOW = '#fff200';
export const VIOLET = '#92278f';
export const ORANGE = '#f7941e';
export const GREEN = '#00a651';
export const RED_VIOLET = mix(0.5, RED, VIOLET);
export const RED_ORANGE = mix(0.5, RED, ORANGE);
export const BLUE_VIOLET = mix(0.5, BLUE, VIOLET);
export const BLUE_GREEN = mix(0.5, BLUE, GREEN);
export const YELLOW_GREEN = mix(0.5, YELLOW, GREEN);
export const YELLOW_ORANGE = mix(0.5, YELLOW, ORANGE);
export const BLACK = '#000000';
export const GRAY = '#555555';
export const WHITE = '#ffffff';

export const defaultColors = {
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

export const defaultColorAlias: ColorAlias = {
  RED: 'red',
  RED_VIOLET: 'red_violet',
  VIOLET: 'violet',
  BLUE_VIOLET: 'blue_violet',
  BLUE: 'blue',
  BLUE_GREEN: 'blue_green',
  GREEN: 'green',
  YELLOW_GREEN: 'yellow_green',
  YELLOW: 'yellow',
  YELLOW_ORANGE: 'yellow_orange',
  ORANGE: 'orange',
  RED_ORANGE: 'red_orange',
  GRAY: 'gray',
  BLACK: 'black',
  WHITE: 'white',
};
