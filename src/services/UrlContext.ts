import React, { useCallback, useEffect, useState } from 'react';
import { useLink } from 'hooks';
import { UrlProps } from 'pages/Wheel/types';
import { orderedColors, defaultColorAlias } from 'services/constants';
import { getRandomBalance, getRandomColorHex, deserializeColorAlias } from 'services/vizarunok';
import { ColorAlias } from 'types';
interface UpdateUrlProps {
  colorAlias?: ColorAlias;
  shade?: string;
  balance?: number;
  keepBW?: boolean;
}

interface ContextValue {
  colorAlias: ColorAlias;
  shade: string;
  balance: number;
  keepBW: boolean;
  updateUrl: (update: UpdateUrlProps) => void;
}

const DEFAULT_COLOR_ALIAS: ColorAlias = {...defaultColorAlias};
const DEFAULT_SHADE = getRandomColorHex();
const DEAFULT_BALANCE = getRandomBalance();

export const useUrlContext = (
  initialColor: string,
  initialBalance: number,
  initialColorAlias: ColorAlias,
  initialKeepBW: boolean,
) => {
  const [colorAlias, setColorAlias] = useState<ColorAlias>(initialColorAlias);
  const [shade, setShade] = useState<string>(initialColor);
  const [balance, setBalance] = useState<number>(initialBalance);
  const [keepBW, setKeepBW] = useState(initialKeepBW);

  const { updateURL } = useLink<UrlProps>();

  const updateUrl = useCallback(({
    colorAlias,
    shade,
    balance,
    keepBW,
  }: UpdateUrlProps) => {
    const updateObject: UrlProps = {};

    if (colorAlias) {
      updateObject.a = orderedColors.map(
        (color) => defaultColorAlias[color] !== colorAlias[color]
          ? colorAlias[color]
          : ''
      ).join('~');

      setColorAlias(deserializeColorAlias(updateObject.a ));
    }

    if (typeof keepBW !== 'undefined') {
      updateObject.s = keepBW ? 1 : 0;
      setKeepBW(keepBW);
    }

    if (shade) {
      updateObject.c = shade;
      setShade(shade);
    }

    if (balance) {
      updateObject.w = balance;
      setBalance(balance);
    }

    setTimeout(() => updateURL(updateObject), 0);
  }, [updateURL]);

  return {
    colorAlias,
    shade,
    balance,
    updateUrl,
    keepBW,
  };
};

const UrlContext = React.createContext<ContextValue>({
  colorAlias: defaultColorAlias,
  shade: DEFAULT_SHADE,
  balance: DEAFULT_BALANCE,
  keepBW: false,
  updateUrl: (update: UpdateUrlProps) => {},
});

export default UrlContext;
