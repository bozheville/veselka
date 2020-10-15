import React from 'react';
import {
  Box,
  FormControl,
  FormErrorMessage,
  Grid,
  Input,
  Spinner,
} from '@chakra-ui/core';
import styled from '@emotion/styled';

import { Range } from 'components';
import paletteSvg from './palette.svg';
import { SettingsProps } from './types.d';
import useSettings from './useSettings';

const BalanceRange = styled(Range)`
  margin-top: 6px!important;
`;

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
            data-testid="red-slider"
          />
          <Range
            name="green"
            max="255"
            ref={register}
            data-testid="green-slider"
          />
          <Range
            name="blue"
            ref={register}
            max="255"
            data-testid="blue-slider"
          />
          <Grid
            templateColumns="30px 1fr 30px"
            gap="2"
          >
            <img
              src={paletteSvg}
              width="30px"
              height="30px"
              alt="hue"
            />
            <BalanceRange
              name="balance"
              color="black"
              ref={register}
              max="0.8"
              min="0.3"
              step="0.05"
              data-testid="balance-slider"
            />
            <Box
              backgroundColor={Boolean(errors.color) ? 'transparent' : color}
              width="30px"
              height="30px"
            />
          </Grid>
          <FormControl isInvalid={!!errors.color} marginTop="4">
            <Grid templateColumns="1fr" gap="2">
              <Input
                ref={inputColorRef}
                textAlign="center"
                errorBorderColor="red.500"
                isInvalid={Boolean(errors.color)}
                name="color"
                data-testid="color-input"
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
