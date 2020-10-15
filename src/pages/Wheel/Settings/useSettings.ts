import { useContext, useEffect, useState } from 'react';
import { rgb } from 'polished';
import { useForm } from 'react-hook-form';

import { useDebounce } from 'hooks';
import UrlContext from 'services/UrlContext';

const DEFAULT_COLOR = '#7f7f7f';
const DEFAULT_COLOR_PARTIAL = 127;
const DEFAULT_WEIGHT = 0.3;
const DEBOUNCE_TIMEOUT = 300;

export interface FormValues {
  [color: string]: string;
}

const useSettings = () => {
  const [isUrlProcessed, setIsUrlProcessed] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    errors,
    reset,
    watch
  } = useForm();

  const {
    color,
    balance,
    red,
    blue,
    green,
  } = watch();

  const inputColorRef = register({
    validate: (value: string) => /^#[a-zA-Z0-9]{6}$/.test(value) || 'Incorrect color'
  });

  const { updateUrl, shade: urlShade, balance: urlBalance } = useContext(UrlContext);

  const debouncedColor = useDebounce(color, DEBOUNCE_TIMEOUT);
  const debouncedWeight = useDebounce(balance, DEBOUNCE_TIMEOUT);

  useEffect(() => {
    const newColor = rgb(parseInt(red, 10), parseInt(green, 10), parseInt(blue, 10));
    setValue('color', newColor);
  }, [red, green, blue, setValue]);

  const handleColorSubmit = handleSubmit((data: FormValues) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(data.color);

    setValue('red', String(parseInt(result?.[1] as string, 16)));
    setValue('green', String(parseInt(result?.[2] as string, 16)));
    setValue('blue', String(parseInt(result?.[3] as string, 16)));

    const newColor = data.color;
    updateUrl({
      shade: newColor.replace('#', ''),
      balance: parseFloat(data.balance),
    });
  });

  useEffect(() => {
    if (isUrlProcessed) {
      return;
    }

    const updatedBalance = urlBalance ? parseFloat(String(urlBalance)) : DEFAULT_WEIGHT;
    let updatedShade: string|null = DEFAULT_COLOR;

    let red = DEFAULT_COLOR_PARTIAL;
    let green = DEFAULT_COLOR_PARTIAL;
    let blue = DEFAULT_COLOR_PARTIAL;

    if (urlShade && /[a-f0-9]{6}/.test(urlShade)) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(urlShade);
      red = parseInt(result?.[1] as string, 16);
      green = parseInt(result?.[2] as string, 16);
      blue = parseInt(result?.[3] as string, 16);
      updatedShade = `#${urlShade}`;
    }

    reset({
      color: updatedShade,
      red: String(red),
      green: String(green),
      blue: String(blue),
      balance: String(updatedBalance),
    });

    setIsUrlProcessed(true);
  }, [urlShade, urlBalance, isUrlProcessed, reset]);

  useEffect(() => {
    if (debouncedWeight && debouncedColor) {
      handleColorSubmit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedColor, debouncedWeight]);

  return {
    inputColorRef,
    register,
    isUrlProcessed,
    color,
    handleColorSubmit,
    errors,
  };
};

export default useSettings;
