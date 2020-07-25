import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Spinner } from '@chakra-ui/core';

import { FilterColorProps, UrlProps } from './types';
import useLink from 'hooks/useLink';
import { rgb } from 'polished';

const FilterColor: React.FC<FilterColorProps> = ({
  onChange,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isUrlProcessed, setIsUrlProcessed] = useState(false);
  const [color, setColor] = useState('#7f7f7f');
  const [weight, setWeight] = useState(1);
  const [defaultRed, setDeafultRed] = useState(127);
  const [defaultGreen, setDeafultGreen] = useState(127);
  const [defaultBlue, setDeafultBlue] = useState(127);
  const redRef = useRef<HTMLInputElement>();
  const greenRef = useRef<HTMLInputElement>();
  const blueRef = useRef<HTMLInputElement>();
  const opacityRef = useRef<HTMLInputElement>();

  const { updateURL, queryParams } = useLink<UrlProps>();

  useEffect(() => {
    if (!isUrlProcessed) {
      const { c, w } = queryParams;

      if (/[a-f0-9]{6}/.test(c)) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
        setDeafultRed(parseInt(result?.[1] as string, 16));
        setDeafultGreen(parseInt(result?.[2] as string, 16));
        setDeafultBlue(parseInt(result?.[3] as string, 16));
        setColor(`#${c}`);
      }

      if (Boolean(w)) {
        setWeight(w);
      }

      setIsUrlProcessed(true);
    }
  }, [queryParams, isUrlProcessed]);


  const handleUpdatePreview = useCallback(() => {
    const red = parseInt((redRef.current?.childNodes[3] as HTMLInputElement).value, 10);
    const green = parseInt((greenRef.current?.childNodes[3] as HTMLInputElement).value, 10);
    const blue = parseInt((blueRef.current?.childNodes[3] as HTMLInputElement).value, 10);
    const opacity = parseFloat((opacityRef.current?.childNodes[3] as HTMLInputElement).value);

    setWeight(opacity);
    setColor(rgb(red, green, blue));
  }, []);

  const handleChange = useCallback(() => {
    onChange(color, weight);

    updateURL({
      c: color.replace('#', ''),
      w: weight,
    });
  }, [color, weight, onChange, updateURL]);


  useEffect(() => {
    if (!isInitialized && isUrlProcessed) {
      handleUpdatePreview();
      handleChange();
      setIsInitialized(true);
    }
  }, [isUrlProcessed, handleChange, handleUpdatePreview,isInitialized]);

  return (
    <Box
    minWidth="200px"
    borderWidth="1px"
    rounded="lg"
    p="1em"
    backgroundColor="rgba(255,255,255,0.5)"
  >
    {isUrlProcessed ? (
      <>
        <Slider
          color="red"
          onChange={handleUpdatePreview}
          onMouseUp={handleChange}
          onKeyUp={handleChange}
          ref={redRef}
          defaultValue={defaultRed}
          min={0}
          max={255}
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
        <Slider
          color="green"
          onChange={handleUpdatePreview}
          onMouseUp={handleChange}
          onKeyUp={handleChange}
          ref={greenRef}
          defaultValue={defaultGreen}
          min={0}
          max={255}
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
        <Slider
          color="blue"
          onChange={handleUpdatePreview}
          onMouseUp={handleChange}
          onKeyUp={handleChange}
          ref={blueRef}
          defaultValue={defaultBlue}
          min={0}
          max={255}
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
        <Slider
          color="black"
          onChange={handleUpdatePreview}
          onMouseUp={handleChange}
          onKeyUp={handleChange}
          ref={opacityRef}
          defaultValue={weight}
          step={.01}
          min={0}
          max={1}
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
        <Box backgroundColor={color} w="100%" h="50px" />
      </>
    ) : (
      <Spinner />
    )}


    </Box>
  );
};

FilterColor.displayName = 'FilterColor';

export default FilterColor;
