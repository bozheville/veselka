import React, { useState } from 'react';

import { ColorAlias, ColorSchema } from 'types';

import { defaultColors } from './constants';
import { calculateColors, calculateSchema } from './vizarunok';

interface ColorSchemaContextValue {
  colors: ColorAlias;
  schema: ColorSchema;
  recalculateSchema: (color: string, balance: number, keepBW: boolean) => void;
}

export const useColorSchemaContext = (
  defaultColors: ColorAlias,
  defaultSchema: ColorSchema,
): ColorSchemaContextValue => {
  const [colors, setColors] = useState<ColorAlias>(defaultColors);
  const [schema, setSchema] = useState<ColorSchema>(defaultSchema);

  const recalculateSchema = (updatedColor: string, updatedBalance: number, keepBW: boolean) => {
    const newColors = calculateColors(updatedColor, updatedBalance, keepBW);
    setColors(newColors);
    setSchema(calculateSchema(newColors));
  };

  return {
    colors,
    schema,
    recalculateSchema,
  };
};

const ColorSchemaContext = React.createContext<ColorSchemaContextValue>({
  colors: defaultColors,
  schema: calculateSchema(defaultColors),
  recalculateSchema: () => {}
});

export default ColorSchemaContext;
