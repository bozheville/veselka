
import { ColorAlias, ColorSchema, Color, Shade } from 'types';
import { shadesList, defaultColorAlias, keyColors } from 'services/constants';

export const getSassSchema = (colorAlias: ColorAlias, schema: ColorSchema) => {
  const sassSchema = [];

  for (const key of Object.keys(schema)) {
    const colorKey = key as Color;

    if (keyColors.has(key)) {
      const varName = `@color-${colorAlias[colorKey] || defaultColorAlias[colorKey]}`;
      sassSchema.push(`${varName}: ${schema[colorKey][500]};`);
    } else {
      for (const saturation of shadesList as Shade[]) {
        const varName = `@color-${colorAlias[colorKey] || defaultColorAlias[colorKey]}--${saturation}`;
        sassSchema.push(`${varName}: ${schema[colorKey][saturation]};`);
      }
    }

    sassSchema.push('');
  }

  return sassSchema.join('\n');
};

export const getJSONSchema = (colorAlias: ColorAlias, schema: ColorSchema) => {
  const jsonSchema = Object.keys(schema).reduce((result, key) => {
    const colorKey = key as Color;

    const outputKey = colorAlias[colorKey] || defaultColorAlias[colorKey];
    const outputValue = keyColors.has(colorKey)
      ? schema[colorKey][500]
      : schema[colorKey];

    return {
      ...result,
      [outputKey]: outputValue,
    };
  }, {}) as ColorSchema;

  return JSON.stringify(jsonSchema, null, 2);
};
