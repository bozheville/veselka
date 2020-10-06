import { useState, useCallback, useEffect } from 'react';
import { tint, shade } from 'polished';

import useLink from 'hooks/useLink';

import { UrlProps } from '../types';

import { orderedColors, defaultColorAlias } from './constants';
import { ColorAlias, ColorSchema } from './colorData.d';

const useColorData = (colors: ColorAlias ) => {
  const [ schema, setSchema ] = useState<ColorSchema>();
  const [ colorAlias, setColorAlias ] = useState<ColorAlias>({});

  const { updateURL, queryParams } = useLink<UrlProps>();

  const handleAliasChange = useCallback((value: ColorAlias) => {
    updateURL({
      a: orderedColors.map(
        (color) => defaultColorAlias[color] !== value[color]
          ? value[color]
          : ''
      ).join('~'),
    })
  }, [updateURL]);

  useEffect(() => {
    const totalShadesNum = 9;
    const shadesNum = (totalShadesNum - 1) / 2;
    const schema = {} as ColorSchema;

    for (const [colorName, color] of Object.entries(colors)) {
      let colorShades = {
        500: color,
        50: tint(5*.7/shadesNum, color)
      };

      for (let i = 1; i <= shadesNum; i++) {
        const darkKey = (i+shadesNum + 1)*100;
        const lightKey = (shadesNum - i + 1)*100;

        const shadeGrade = i*.7/shadesNum;

        colorShades = {
          ...colorShades,
          [lightKey]: tint(shadeGrade, color),
          [darkKey]: shade(shadeGrade, color),
        };
      }

      schema[colorName] = colorShades;
    }

    setSchema(schema);
  }, [colorAlias, colors,]);

  useEffect(() => {
    if (queryParams.a) {
      const colorAlias: ColorAlias = {};
      const urlAlias = queryParams.a.split('~');

      for (const [index, color] of Object.entries(orderedColors)) {
        if (urlAlias[parseInt(index, 10)]) {
          colorAlias[color] = urlAlias[parseInt(index, 10)];
        }
      }

      setColorAlias(colorAlias);
    } else {
      setColorAlias({});
    }
  }, [queryParams.a])

  return {
    schema,
    colorAlias,
    handleAliasChange,
  };
};

export default useColorData;
