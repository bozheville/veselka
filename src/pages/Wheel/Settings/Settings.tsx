import React from 'react';
import {
  Box,
  Button,
  Grid,
} from '@chakra-ui/core';
import styled from '@emotion/styled';

import { Range } from 'components';
import { SettingsProps } from './types.d';
import useSettings from './useSettings';

const BalanceRange = styled(Range)`
  margin-top: 6px!important;
`;

const FilterColor: React.FC<SettingsProps> = ({
  defaultColor,
  defaultBalance,
}) => {
  const {
    redRef,
    greenRef,
    blueRef,
    balanceRef,
    handlerandomClick,
    sliders,
    color,
    handleSliderChange,
  } = useSettings(defaultColor, defaultBalance);

  return (
    <Box
      width="100%"
      borderWidth="1px"
      rounded="lg"
      padding="4"
      backgroundColor="rgba(255,255,255,0.7)"
    >
      <Range
        ref={redRef}
        name="red"
        max="255"
        data-testid="red-slider"
        onChange={handleSliderChange}
        defaultValue={sliders.red}
      />
      <Range
        ref={greenRef}
        name="green"
        max="255"
        data-testid="green-slider"
        onChange={handleSliderChange}
        defaultValue={sliders.green}
      />
      <Range
        ref={blueRef}
        name="blue"
        max="255"
        data-testid="blue-slider"
        onChange={handleSliderChange}
        defaultValue={sliders.blue}
      />
      <Grid
        templateColumns="30px 1fr 30px"
        gap="2"
      >
        <img
          src="/images/palette.svg"
          width="30px"
          height="30px"
          alt="hue"
        />
        <BalanceRange
          ref={balanceRef}
          name="balance"
          color="black"
          max="0.8"
          min="0.3"
          step="0.05"
          data-testid="balance-slider"
          onChange={handleSliderChange}
          defaultValue={sliders.balance}
        />
        <Box
          data-testid="color-preview"
          backgroundColor={color}
          width="30px"
          height="30px"
        />
      </Grid>
      <Button
        mt="4"
        w="100%"
        variantColor="purple"
        onClick={handlerandomClick}
      >
        Get random
      </Button>
    </Box>
  );
};

FilterColor.displayName = 'FilterColor';

export default FilterColor;
