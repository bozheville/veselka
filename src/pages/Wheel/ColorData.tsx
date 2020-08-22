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
  'RED',
  'RED_VIOLET',
  'VIOLET',
  'BLUE_VIOLET',
  'BLUE',
  'BLUE_GREEN',
  'GREEN',
  'YELLOW_GREEN',
  'YELLOW',
  'YELLOW_ORANGE',
  'ORANGE',
  'RED_ORANGE',
  'BLACK',
  'GRAY',
  'WHITE',
];

const shadesList = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const ColorData: React.FC<ColorDataProps> = ({
  colors,
}) => {
  const { t } = useTranslation('pages');

  const {
    // PRIMARY
    RED,
    BLUE,
    YELLOW,

    // SECONDARY
    VIOLET,
    GREEN,
    ORANGE,

    RED_VIOLET,
    RED_ORANGE,
    BLUE_VIOLET,
    BLUE_GREEN,
    YELLOW_GREEN,
    YELLOW_ORANGE,

    BLACK,
    GRAY,
    WHITE,
 } = colors;

  const totalShadesNum = 9;

  const shadesNum = (totalShadesNum - 1) / 2;


  let schema = {} as ColorSchema;

  for (const [colorName, color] of Object.entries(colors)) {
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
          <Text>{t('wheel.colors.red')}: {RED}</Text>
          <Text>{t('wheel.colors.blue')}: {BLUE}</Text>
          <Text>{t('wheel.colors.yellow')}: {YELLOW}</Text>
      </Box>

      <Box marginBottom="1rem">
        <Heading as="h2" size="lg">{t('wheel.colorGroups.secondary')}</Heading>
          <Text>{t('wheel.colors.violet')}: {VIOLET}</Text>
          <Text>{t('wheel.colors.green')}: {GREEN}</Text>
          <Text>{t('wheel.colors.orange')}: {ORANGE}</Text>
      </Box>

      <Box marginBottom="1rem">
        <Heading as="h2" size="lg">{t('wheel.colorGroups.tertiary')}</Heading>
          <Text>{t('wheel.colors.red_violet')}: {RED_VIOLET}</Text>
          <Text>{t('wheel.colors.blue_violet')}: {BLUE_VIOLET}</Text>
          <Text>{t('wheel.colors.blue_green')}: {BLUE_GREEN}</Text>
          <Text>{t('wheel.colors.yellow_green')}: {YELLOW_GREEN}</Text>
          <Text>{t('wheel.colors.yellow_orange')}: {YELLOW_ORANGE}</Text>
          <Text>{t('wheel.colors.red_orange')}: {RED_ORANGE}</Text>
      </Box>

      <Grid templateColumns="repeat(16, 1fr)">
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
