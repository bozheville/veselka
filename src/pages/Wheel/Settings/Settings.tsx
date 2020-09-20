import React from 'react';
import { Box, Input, Flex, Spinner } from '@chakra-ui/core';

import paletteSvg from './palette.svg';
import Slider from './Slider';
import { SettingsProps } from './types.d';
import useSettings from './useSettings';

const FilterColor: React.FC<SettingsProps> = ({
  onChange,
}) => {
  const {
    defaultRed,
    defaultGreen,
    defaultBlue,
    redRef,
    greenRef,
    blueRef,
    opacityRef,
    inputColorRef,
    isUrlProcessed,
    color,
    weight,
    handleChange,
  } = useSettings(onChange);

  return (
    <Box
      width="100%"
      borderWidth="1px"
      rounded="lg"
      padding="4"
      backgroundColor="rgba(255,255,255,0.5)"
    >
      {isUrlProcessed ? (
      <>
        <Slider
          color="red"
          onChange={handleChange}
          ref={redRef}
          defaultValue={defaultRed}
        />
        <Slider
          color="green"
          onChange={handleChange}
          ref={greenRef}
          defaultValue={defaultGreen}
        />
        <Slider
          color="blue"
          onChange={handleChange}
          ref={blueRef}
          defaultValue={defaultBlue}
        />
        <Flex
          direction="row"
          alignItems="start"
          justifyContent="space-between"
        >
          <img src={paletteSvg} width="30px" />
          <Slider
            color="black"
            onChange={handleChange}
            ref={opacityRef}
            defaultValue={weight}
            step={.05}
            min={0.3}
            max={.8}
            marginBottom="4"
            marginX="3"
            width="auto"
            flexGrow={1}
          />
          <Box
            backgroundColor={color}
            width="30px"
            height="30px"
          />
        </Flex>
        <Input
          ref={inputColorRef}
          defaultValue={color}
          textAlign="center"
        />
      </>
    ) : (
      <Spinner />
    )}
    </Box>
  );
};

FilterColor.displayName = 'FilterColor';

export default FilterColor;
