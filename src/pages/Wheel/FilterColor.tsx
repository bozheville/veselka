import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Input,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Spinner
} from '@chakra-ui/core';

import { FilterColorProps, UrlProps } from './types';
import useLink from 'hooks/useLink';
import { rgb } from 'polished';

const FilterColor: React.FC<FilterColorProps> = ({
  onChange,
  onViewDetailsClick,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isUrlProcessed, setIsUrlProcessed] = useState(false);
  const [color, setColor] = useState('#7f7f7f');
  const [weight, setWeight] = useState(1);
  const [defaultRed, setDeafultRed] = useState(127);
  const [defaultGreen, setDeafultGreen] = useState(127);
  const [defaultBlue, setDeafultBlue] = useState(127);

  const redRef = useRef<HTMLInputElement>(null);
  const greenRef = useRef<HTMLInputElement>(null);
  const blueRef = useRef<HTMLInputElement>(null);
  const opacityRef = useRef<HTMLInputElement>(null);
  const inputColorRef = useRef<HTMLInputElement>(null);

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


  const handleChange = useCallback(() => {
    const red = parseInt((redRef.current?.childNodes[3] as HTMLInputElement).value, 10);
    const green = parseInt((greenRef.current?.childNodes[3] as HTMLInputElement).value, 10);
    const blue = parseInt((blueRef.current?.childNodes[3] as HTMLInputElement).value, 10);
    const opacity = parseFloat((opacityRef.current?.childNodes[3] as HTMLInputElement).value);
    const newColor = rgb(red, green, blue);

    if (inputColorRef?.current) {
      inputColorRef.current.value = newColor;
    }

    setWeight(opacity);
    setColor(newColor);

    onChange(newColor, opacity);

    updateURL({
      c: newColor.replace('#', ''),
      w: opacity,
    });
  }, []);

  useEffect(() => {
    if (!isInitialized && isUrlProcessed) {
      handleChange();
      handleChange();
      setIsInitialized(true);
    }
  }, [isUrlProcessed, handleChange, isInitialized]);

  return (
    <Box
      width="100%"
      borderWidth="1px"
      rounded="lg"
      p="1em"
      backgroundColor="rgba(255,255,255,0.5)"
    >
      {isUrlProcessed ? (
      <>
        <Slider
          color="red"
          onChange={handleChange}
          ref={redRef}
          defaultValue={defaultRed}
          min={0}
          max={255}
          marginBottom="2"
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
        <Slider
          color="green"
          onChange={handleChange}
          ref={greenRef}
          defaultValue={defaultGreen}
          min={0}
          max={255}
          marginBottom="2"
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
        <Slider
          color="blue"
          onChange={handleChange}
          ref={blueRef}
          defaultValue={defaultBlue}
          min={0}
          max={255}
          marginBottom="2"
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
        <Slider
          color="black"
          onChange={handleChange}
          ref={opacityRef}
          defaultValue={weight}
          step={.01}
          min={0}
          max={1}
          marginBottom="4"
        >
          <SliderTrack />
          <SliderFilledTrack />
          <SliderThumb />
        </Slider>
        <Flex direction="row">
          <Flex direction="column">
            <Input
              ref={inputColorRef}
              textAlign="center"
              marginBottom="4"
              width="7em"
            />
          </Flex>
          <Flex direction="column" flexGrow={1} marginLeft="4">
            <Box
              backgroundColor={color}
              w="100%"
              h="10"
              marginBottom="4"
              rounded="md"
            />
          </Flex>
        </Flex>
        <Button
          marginX="auto"
          variant="solid"
          display="flex"
          onClick={onViewDetailsClick}
        >
          View details
        </Button>
      </>
    ) : (
      <Spinner />
    )}
    </Box>
  );
};

FilterColor.displayName = 'FilterColor';

export default FilterColor;
