import React, { useCallback, useEffect, useState } from 'react';
import { useLink } from 'hooks';
import { UrlProps } from 'pages/Wheel/types';
import { orderedColors, defaultColorAlias } from 'pages/Wheel/ColorData/constants';
import { ColorAliasList } from 'pages/Wheel/ColorData/ColorAlias/colorAlias.d';

interface UpdateUrlProps {
  colorAlias?: ColorAliasList;
  shade?: string;
  balance?: number;
}

interface ContextValue {
  colorAlias: ColorAliasList;
  shade: string;
  balance: number;
  updateUrl: (update: UpdateUrlProps) => void;
}

const DEFAULT_COLOR_ALIAS = {};
const DEFAULT_SHADE = '7f7f7f';
const DEAFULT_BALANCE = 0.3;

export const useUrlContext = () => {
  const [colorAlias, setColorAlias] = useState<ColorAliasList>(DEFAULT_COLOR_ALIAS);
  const [shade, setShade] = useState<string>(DEFAULT_SHADE);
  const [balance, setBalance] = useState<number>(DEAFULT_BALANCE);
  const {queryParams, updateURL} = useLink<UrlProps>();

  const updateUrl = useCallback(({
    colorAlias,
    shade,
    balance,
  }: UpdateUrlProps) => {
    const updateObject: UrlProps = {};

    if (colorAlias) {
      updateObject.a = orderedColors.map(
        (color) => defaultColorAlias[color] !== colorAlias[color]
          ? colorAlias[color]
          : ''
      ).join('~');
    }

    if (shade) {
      updateObject.c = shade;
    }

    if (balance) {
      updateObject.w = balance;
    }

    updateURL(updateObject);
  }, [updateURL]);

  useEffect(() => {
    let aliasValue: ColorAliasList = DEFAULT_COLOR_ALIAS;

    if (queryParams?.a) {
      const urlAlias = queryParams.a.split('~');

      for (const [index, color] of Object.entries(orderedColors)) {
        if (urlAlias[parseInt(index, 10)]) {
          aliasValue[color] = urlAlias[parseInt(index, 10)];
        }
      }
    }

    setColorAlias({...aliasValue});
    setBalance(queryParams?.w || DEAFULT_BALANCE);
    setShade(queryParams?.c?.replace('#', '') || DEFAULT_SHADE);
  }, [queryParams]);

  return {
    colorAlias,
    shade,
    balance,
    updateUrl,
  };
};

const UrlContext = React.createContext<ContextValue>({
  colorAlias: {},
  shade: DEFAULT_SHADE,
  balance: DEAFULT_BALANCE,
  updateUrl: (update: UpdateUrlProps) => {},
});

export default UrlContext;
