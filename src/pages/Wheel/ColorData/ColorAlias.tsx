import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Flex,
  Input,
  Text,
} from '@chakra-ui/core';

import { useForm } from 'react-hook-form';

import { orderedColors } from './constants';
import { ColorAlias as ColorAliasData, ColorAliasProps } from './colorData.d';

const ColorAlias: React.FC<ColorAliasProps> = ({
  value: schema,
  onChange,
}) => {
  const [ isColorAliasVisible, setisColorAliasVisible ] = useState<boolean>(false);
  const handleAliasExpand = useCallback(() => setisColorAliasVisible(true), []);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: ColorAliasData) => {
    const normalizedData = Object
      .keys(data)
      .filter(key => data[key])
      .reduce((result, key) => ({
        ...result,
        [key.replace('color_alias_', '')]: data[key],
      }), {});

    onChange(normalizedData);
  };

  return isColorAliasVisible ? (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        marginTop="4"
        templateColumns={[
          '2.5rem 1fr',
          '2.5rem 1fr',
          '2.5rem 1fr 2.5rem 1fr',
          '2.5rem 1fr 2.5rem 1fr 2.5rem 1fr',
        ]}
        gap="4"
        marginBottom="4"
      >
        {orderedColors.map(color => (
          <React.Fragment key={color}>
            <Box
              width="10"
              height="10"
              backgroundColor={schema?.[color]?.[500]}
              rounded="md"
            />
            <Box>
              <Input
                flexGrow={1}
                name={`color_alias_${color}`}
                ref={register({ validate: (value) => /^[A-Za-z_-]*$/.test(value) || 'Incorrect value. Only letters, _ and - allowed' })}
                placeholder={color.toLocaleLowerCase()}
                backgroundColor="gray.700"
                isInvalid={errors[`color_alias_${color}`]}
              />
              {errors[`color_alias_${color}`] && <Text fontSize="xs">{errors[`color_alias_${color}`].message}</Text>}
            </Box>
          </React.Fragment>
        ))}
        <div></div>
        <Button variantColor="purple" type="submit">Update color names</Button>
      </Grid>
    </form>
  ) : (
    <Flex
      marginTop="4"
      flexDirection="column"
      justifyContent="center"
    >
      <Button
        margin="0 auto"
        variantColor="blue"
        onClick={handleAliasExpand}
      >
        Set custom color names
      </Button>
    </Flex>
  );
};

ColorAlias.displayName = 'ColorAlias';

export default ColorAlias;
