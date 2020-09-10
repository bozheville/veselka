import { useState, useCallback, useEffect } from 'react';
import { tint, shade } from 'polished';

import { shadesList, defaultColorAlias } from './constants';
import { ColorAlias, ColorSchema } from './colorData.d';

const useColorData = (colors: ColorAlias, exportType: string, colorAlias: ColorAlias) => {
  const [ output, setOutput ] = useState<string>('');
  const [ schema, setSchema ] = useState<ColorSchema>();
  const [ isColorAliasVisible, setIsColorAliasVisible ] = useState<boolean>(false);

  const handleAliasExpand = useCallback(() => {
    setIsColorAliasVisible(true);
  }, []);

  const getJSONSchema = useCallback((colorAlias: ColorAlias) => (schema: ColorSchema) => {
    const jsonSchema: ColorSchema = {};

    for (const key of Object.keys(schema)) {
      jsonSchema[colorAlias[key] || defaultColorAlias[key]] = schema[key];
    }

    setOutput(JSON.stringify(jsonSchema, null, 2));
  }, []);

  const getSassSchema = useCallback((colorAlias: ColorAlias) => (schema: ColorSchema) => {
    const sassSchema = [];

    for (const key of Object.keys(schema)) {
      for(const shade of shadesList) {
        sassSchema.push(`@color-${colorAlias[key] || defaultColorAlias[key]}-${shade}: ${schema[key][shade]};`);
      }

      sassSchema.push('');
    }

    setOutput(sassSchema.join('\n'));
  }, []);

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
  }, [exportType, colorAlias, colors]);

  return {
    output,
    schema,
    isColorAliasVisible,
    handleAliasExpand,
  };
};

export default useColorData;
