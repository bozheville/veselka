import { useCallback, useEffect, useRef, useState } from 'react';
import { rgb } from 'polished';

import { useDebounce, useLink } from 'hooks';
import { UrlProps } from '../types';

const DEFAULT_COLOR = '#7f7f7f';
const DEFAULT_COLOR_PARTIAL = 127;
const DEFAULT_WEIGHT = 0.2;

const useSettings = (onChange: any) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isUrlProcessed, setIsUrlProcessed] = useState(false);
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [weight, setWeight] = useState(DEFAULT_WEIGHT);
  const [defaultRed, setDeafultRed] = useState(DEFAULT_COLOR_PARTIAL);
  const [defaultGreen, setDeafultGreen] = useState(DEFAULT_COLOR_PARTIAL);
  const [defaultBlue, setDeafultBlue] = useState(DEFAULT_COLOR_PARTIAL);

  const redRef = useRef<HTMLInputElement>(null);
  const greenRef = useRef<HTMLInputElement>(null);
  const blueRef = useRef<HTMLInputElement>(null);
  const opacityRef = useRef<HTMLInputElement>(null);
  const inputColorRef = useRef<HTMLInputElement>(null);

  const { updateURL, queryParams } = useLink<UrlProps>();

  const debouncedColor = useDebounce(color, 200);
  const debouncedWeight = useDebounce(weight, 200);

  const handleChange = useCallback(() => {
    const red = parseInt((redRef.current?.childNodes[3] as HTMLInputElement).value, 10);
    const green = parseInt((greenRef.current?.childNodes[3] as HTMLInputElement).value, 10);
    const blue = parseInt((blueRef.current?.childNodes[3] as HTMLInputElement).value, 10);
    const opacity = parseFloat((opacityRef.current?.childNodes[3] as HTMLInputElement).value) ?? 1;
    const newColor = rgb(red, green, blue);

    if (inputColorRef?.current) {
      inputColorRef.current.value = newColor;
    }

    setWeight(opacity);
    setColor(newColor);

  }, [onChange]);

  useEffect(() => {
    if (!isUrlProcessed) {
      const { c, w } = queryParams;

      const weight = w ? parseFloat(String(w)) : DEFAULT_WEIGHT;
      let color: string|null = null;
      setWeight(weight);

      if (c && /[a-f0-9]{6}/.test(c)) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);
        setDeafultRed(parseInt(result?.[1] as string, 16));
        setDeafultGreen(parseInt(result?.[2] as string, 16));
        setDeafultBlue(parseInt(result?.[3] as string, 16));
        color = `#${c}`;
        setColor(color);
        onChange(color, weight);
      }

      setIsUrlProcessed(true);
    }
  }, [queryParams, isUrlProcessed, onChange]);

  useEffect(() => {
    updateURL({
      c: debouncedColor.replace('#', ''),
      w: debouncedWeight,
    });

    onChange(debouncedColor, debouncedWeight);
  }, [updateURL, debouncedColor, debouncedWeight]);

  useEffect(() => {
    if (!isInitialized && isUrlProcessed) {
      setIsInitialized(true);
    }
  }, [isUrlProcessed, handleChange, isInitialized]);

  return {
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
  }


}

export default useSettings;
