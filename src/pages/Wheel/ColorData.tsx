import React from 'react';
import { Box, Grid, Text, Heading, Textarea } from '@chakra-ui/core';
import { tint, shade } from 'polished';
import { useTranslation } from 'react-i18next';

import { ColorDataProps } from './types'
interface ColorSchema {
  [color: string]: {
    [shade: number]: string;
  }
}

const orderedColors = [
  'red',
  'red_violet',
  'violet',
  'blue_violet',
  'blue',
  'blue_green',
  'green',
  'yellow_green',
  'yellow',
  'yellow_orange',
  'orange',
  'red_orange',
];

const shadesList = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const ColorData: React.FC<ColorDataProps> = ({
  colors,
}) => {
  const { t } = useTranslation('pages');

  const [
    // PRIMARY
    red,
    blue,
    yellow,

    // SECONDARY
    violet,
    green,
    orange,

    red_violet,
    red_orange,
    blue_violet,
    blue_green,
    yellow_green,
    yellow_orange,
  ] = colors;

  const colorMap = {
    red,
    red_violet,
    violet,
    blue_violet,
    blue,
    blue_green,
    green,
    yellow_green,
    yellow,
    yellow_orange,
    orange,
    red_orange,
  };

  const totalShadesNum = 9;

  const shadesNum = (totalShadesNum - 1) / 2;


  let schema = {} as ColorSchema;

  for (const [colorName, color] of Object.entries(colorMap)) {
    let colorShades = {
      500: color,
      50:tint(5*.7/shadesNum, color)
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

    schema = {
      ...schema,
      [colorName]: colorShades,
    };
  }

  return (
    <Box marginY="2rem" color="white">
      <Box marginBottom="1rem">
        <Heading as="h2" size="lg">{t('wheel.colorGroups.primary')}</Heading>
          <Text>{t('wheel.colors.red')}: {red}</Text>
          <Text>{t('wheel.colors.blue')}: {blue}</Text>
          <Text>{t('wheel.colors.yellow')}: {yellow}</Text>
      </Box>

      <Box marginBottom="1rem">
        <Heading as="h2" size="lg">{t('wheel.colorGroups.secondary')}</Heading>
          <Text>{t('wheel.colors.violet')}: {violet}</Text>
          <Text>{t('wheel.colors.green')}: {green}</Text>
          <Text>{t('wheel.colors.orange')}: {orange}</Text>
      </Box>

      <Box marginBottom="1rem">
        <Heading as="h2" size="lg">{t('wheel.colorGroups.tertiary')}</Heading>
          <Text>{t('wheel.colors.red_violet')}: {red_violet}</Text>
          <Text>{t('wheel.colors.blue_violet')}: {blue_violet}</Text>
          <Text>{t('wheel.colors.blue_green')}: {blue_green}</Text>
          <Text>{t('wheel.colors.yellow_green')}: {yellow_green}</Text>
          <Text>{t('wheel.colors.yellow_orange')}: {yellow_orange}</Text>
          <Text>{t('wheel.colors.red_orange')}: {red_orange}</Text>
      </Box>

      <Grid templateColumns="repeat(13, 1fr)">
        {shadesList.map(shade => (
          <React.Fragment key={`shade-${shade}`}>
            <Box>{shade}</Box>
            {orderedColors.map(colorName => (
              <Box
                key={`${colorName}-${shade}`}
                backgroundColor={schema[colorName][shade]}
                w="100%"
                h="2em"
              />
            ))}
          </React.Fragment>
        ))}
      </Grid>
      <Box marginTop="1rem">
        <Textarea
          value={JSON.stringify(schema, null, 2)}
          height="10rem"
          backgroundColor="#444"
          isReadOnly={true}
        />
      </Box>
    </Box>
  );
};

ColorData.displayName = 'ColorData';

export default ColorData;
