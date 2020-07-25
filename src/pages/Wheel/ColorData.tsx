import React from 'react';
import { ColorDataProps } from './types'
import { Box, Grid, Text, Heading, Textarea } from '@chakra-ui/core';
import { tint, shade } from 'polished';

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
        <Heading as="h2" size="lg">Primary</Heading>
          <Text>Red: {red}</Text>
          <Text>Blue: {blue}</Text>
          <Text>Yellow: {yellow}</Text>
      </Box>

      <Box marginBottom="1rem">
        <Heading as="h2" size="lg">Secondary</Heading>
          <Text>Violet: {violet}</Text>
          <Text>Green: {green}</Text>
          <Text>Orange: {orange}</Text>
      </Box>

      <Box marginBottom="1rem">
        <Heading as="h2" size="lg">Tertiary</Heading>
          <Text>Red-Violet: {red_violet}</Text>
          <Text>Blue-Violet: {blue_violet}</Text>
          <Text>Blue-Green: {blue_green}</Text>
          <Text>Yellow-Green: {yellow_green}</Text>
          <Text>Yellow-Orange: {yellow_orange}</Text>
          <Text>Red-Orange: {red_orange}</Text>
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
