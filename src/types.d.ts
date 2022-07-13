declare module "*.json" {
  const value: any;
  export default value;
}

declare module '*.png'

declare module "*.svg" {
  const content: string;
  export default content;
}

export interface MenuItem {
  titleKey: string;
  link: string;
}

export type TPageState = 'initial'|'loading'|'contentful'|'error'|'empty';

export type Color =
  'RED'|
  'RED_VIOLET'|
  'VIOLET'|
  'BLUE_VIOLET'|
  'BLUE'|
  'BLUE_GREEN'|
  'GREEN'|
  'YELLOW_GREEN'|
  'YELLOW'|
  'YELLOW_ORANGE'|
  'ORANGE'|
  'RED_ORANGE'|
  'GRAY'|
  'BLACK'|
  'WHITE';

export type Shade = 50|100|200|300|400|500|600|700|800|900;

export type ColorShades = {
  [shade in Shade]: string;
};

export type ColorSchema = {
  [color in Color]: ColorShades;
};

export type ColorAlias = {
  [color in Color]: string;
};

export interface AppProps {
  color: string;
  balance:  number;
  defaultColors: ColorAlias;
  defaultSchema: ColorSchema;
  initialColorAlias: ColorAlias;
  isWelcomeClosed: boolean;
}
