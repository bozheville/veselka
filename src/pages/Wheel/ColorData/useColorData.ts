import { useState, useCallback, useEffect } from 'react';
import { tint, shade } from 'polished';

import useLink from 'hooks/useLink';

import { UrlProps } from '../types';

import { shadesList, defaultColorAlias } from './constants';
import { ColorAlias, ColorSchema } from './colorData.d';

const useColorData = (colors: ColorAlias, exportType: string, colorAlias: ColorAlias) => {
  const [ output, setOutput ] = useState<string>('');
  const [ schema, setSchema ] = useState<ColorSchema>();
  const [ isBWShadesOn, setIsBWShadesOn ] = useState<boolean>(false);

  const { updateURL, queryParams } = useLink<UrlProps>();

  const [ isColorAliasVisible, setIsColorAliasVisible ] = useState<boolean>(false);

  const handleAliasExpand = useCallback(() => {
    setIsColorAliasVisible(true);
  }, []);

  const getJSONSchema = useCallback((colorAlias: ColorAlias) => (schema: ColorSchema) => {
    const jsonSchema: ColorSchema = {};

    for (const key of Object.keys(schema)) {
      const outputKey = colorAlias[key] || defaultColorAlias[key];
      const outputValue = !isBWShadesOn && ['BLACK', 'WHITE'].includes(key)
        ? schema[key][500]
        : schema[key];
      jsonSchema[outputKey] = outputValue;
    }

    setOutput(JSON.stringify(jsonSchema, null, 2));
  }, [isBWShadesOn]);

  const getSassSchema = useCallback((colorAlias: ColorAlias) => (schema: ColorSchema) => {
    const sassSchema = [];

    for (const key of Object.keys(schema)) {
      if (!isBWShadesOn && ['BLACK', 'WHITE'].includes(key)) {
        const varName = `@color-${colorAlias[key] || defaultColorAlias[key]}`;
        sassSchema.push(`${varName}: ${schema[key][500]};`);
      } else {
        for(const shade of shadesList) {
          const varName = `@color-${colorAlias[key] || defaultColorAlias[key]}-${shade}`;
          sassSchema.push(`${varName}: ${schema[key][shade]};`);
        }
      }

      sassSchema.push('');
    }

    setOutput(sassSchema.join('\n'));
  }, [isBWShadesOn]);

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

    if (exportType === 'sass') {
      getSassSchema(colorAlias)(schema);
    } else {
      getJSONSchema(colorAlias)(schema);
    }
  }, [exportType, colorAlias, colors, isBWShadesOn, getJSONSchema, getSassSchema]);

  useEffect(() => {
    setIsBWShadesOn(Boolean(parseInt(String(queryParams.s) || '0', 10)));
  }, [queryParams.s]);

  const handleShadesChande = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    updateURL({
      s: event.target.checked ? 1 : 0
    })
  }, [updateURL]);

  return {
    output,
    schema,
    isColorAliasVisible,
    isBWShadesOn,
    handleAliasExpand,
    handleShadesChande,
  };
};

export default useColorData;
