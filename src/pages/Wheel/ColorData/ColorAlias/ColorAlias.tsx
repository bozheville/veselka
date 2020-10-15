import React from 'react';
import {
  Box,
  Button,
  Grid,
  Flex,
  Input,
  Text,
} from '@chakra-ui/core';

import { orderedColors } from '../constants';
import { ColorAliasProps } from './colorAlias.d';
import useColorAlias from './useColorAlias';

const ColorAlias: React.FC<ColorAliasProps> = ({
  value: schema,
}) => {
  const {
    isColorAliasVisible,
    errors,
    handleFormSubmit,
    handleAliasExpand,
    register,
    validate,
    t,
  } = useColorAlias();

  return isColorAliasVisible ? (
    <form onSubmit={handleFormSubmit}>
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
              data-test-id={`color-${color}`}
            />
            <Box>
              <Input
                flexGrow={1}
                name={`color_alias_${color}`}
                ref={register({ validate })}
                placeholder={color.toLocaleLowerCase()}
                backgroundColor="gray.700"
                isInvalid={Boolean(errors[`color_alias_${color}`])}
                errorBorderColor="red.600"
              />
              {errors[`color_alias_${color}`] && (
                <Text fontSize="xs">
                  {errors[`color_alias_${color}`].message}
                </Text>
              )}
            </Box>
          </React.Fragment>
        ))}
        <div />
        <Button
          variantColor="purple"
          type="submit"
        >
          {t('buttons.update_color_names')}
        </Button>
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
        variantColor="purple"
        onClick={handleAliasExpand}
      >
        {t('buttons.set_color_names')}
      </Button>
    </Flex>
  );
};

ColorAlias.displayName = 'ColorAlias';

export default ColorAlias;
