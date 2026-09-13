import { ColorAlias, ColorSchema } from 'types';
import { calculateColors, calculateSchema, getRandomColorHex, getRandomBalance, deserializeColorAlias } from './vizarunok';

export interface InitialWheelState {
  color: string;
  balance: number;
  defaultColors: ColorAlias;
  defaultSchema: ColorSchema;
  initialColorAlias: ColorAlias;
  initialKeepBW: boolean;
}

// Reads ?c=/&w=/&a=/&s= from the URL on the client; falls back to random
// defaults during static generation, where there is no request to read.
const resolveInitialWheelState = (): InitialWheelState => {
  const searchParams = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search)
    : null;

  const color = searchParams?.get('c') || getRandomColorHex();
  const balance = parseFloat(searchParams?.get('w') || String(getRandomBalance()));
  const alias = searchParams?.get('a') || '';
  const initialKeepBW = (searchParams?.get('s') || '0') !== '0';

  const defaultColors = calculateColors(`#${color}`, balance, initialKeepBW);
  const defaultSchema = calculateSchema(defaultColors);
  const initialColorAlias = deserializeColorAlias(alias);

  return { color, balance, defaultColors, defaultSchema, initialColorAlias, initialKeepBW };
};

export default resolveInitialWheelState;
