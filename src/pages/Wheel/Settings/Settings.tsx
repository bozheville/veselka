import React from 'react';
import {
  Box,
  FormControl,
  FormErrorMessage,
  Flex,
  Grid,
  Input,
  Spinner,
} from '@chakra-ui/core';

import { Range } from 'components';
import paletteSvg from './palette.svg';
import { SettingsProps } from './types.d';
import useSettings from './useSettings';

const FilterColor: React.FC<SettingsProps> = () => {
  const {
    register,
    inputColorRef,
    isUrlProcessed,
    color,
    handleColorSubmit,
    errors,
  } = useSettings();

  return (
    <Box
      width="100%"
      borderWidth="1px"
      rounded="lg"
      padding="4"
      backgroundColor="rgba(255,255,255,0.7)"
    >
      {isUrlProcessed ? (
        <form onSubmit={handleColorSubmit}>
          <Range
            name="red"
            ref={register}
            max="255"
          />
          <Range
            name="green"
            max="255"
            ref={register}
          />
          <Range
            name="blue"
            ref={register}
            max="255"
          />
          <Flex
            direction="row"
            alignItems="start"
            justifyContent="space-between"
          >
            <img src={paletteSvg} width="30px" />
            <Box
              marginBottom="4"
              marginX="3"
              width="auto"
              flexGrow={1}
            >
              <Range
                name="balance"
                color="black"
                ref={register}
                max="0.8"
                min="0.3"
                step="0.05"
              />
            </Box>
            <Box
              backgroundColor={Boolean(errors.color) ? 'transparent' : color}
              width="30px"
              height="30px"
            />
          </Flex>
          <FormControl isInvalid={!!errors.color}>
            <Grid templateColumns="1fr" gap="2">
              <Input
                ref={inputColorRef}
                textAlign="center"
                errorBorderColor="red.500"
                isInvalid={Boolean(errors.color)}
                name="color"
              />
              {errors.color && <FormErrorMessage>{errors.color.message}</FormErrorMessage>}
            </Grid>
          </FormControl>
        </form>
      ) : (
        <Spinner />
      )}
    </Box>
  );
};

FilterColor.displayName = 'FilterColor';

export default FilterColor;
