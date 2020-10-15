import React, { forwardRef } from 'react';
// import { SliderProps } from './types.d';

import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderProps,
} from '@chakra-ui/core';


const SettingsSlider = forwardRef<HTMLInputElement, SliderProps>(({
  min = 0,
  max = 255,
  marginBottom = '2',
  ...props
}, ref) => {
  return (
    <Slider
      ref={ref}
      min={min}
      max={max}
      marginBottom={marginBottom}
      {...props}
    >
      <SliderTrack />
      <SliderFilledTrack />
      <SliderThumb />
    </Slider>
  );
});

Slider.displayName = 'Slider';

export default SettingsSlider;
