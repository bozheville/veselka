import {
  ChangeEvent,
  useContext,
  useRef
} from 'react';
import debounce from 'lodash.debounce';

import UrlContext from 'services/UrlContext';
import ColorSchemaContext from 'services/ColorSchemaContext';

import { getRandomColorHex, getRandomBalance, hex2rgb, rgb2hex} from 'services/vizarunok';
import { useTranslation } from 'next-i18next';

export interface FormValues {
  [color: string]: string;
}

const useSettings = (defaultColor: string, defaultBalance: number) => {
  const sliders = {
    red: hex2rgb(defaultColor)[0],
    green: hex2rgb(defaultColor)[1],
    blue: hex2rgb(defaultColor)[2],
    balance: defaultBalance,
    color: defaultColor.replace('#', ''),
  };

  const { t } = useTranslation('details');
  const redRef = useRef<HTMLInputElement>(null);
  const greenRef = useRef<HTMLInputElement>(null);
  const blueRef = useRef<HTMLInputElement>(null);
  const balanceRef = useRef<HTMLInputElement>(null);

  const { updateUrl, shade: urlShade, balance: urlBalance, keepBW } = useContext(UrlContext);
  const { recalculateSchema } = useContext(ColorSchemaContext);

  const handlerandomClick = () => {
    const randomColor = getRandomColorHex();
    const randomBalance = getRandomBalance();
    const [r,g,b] = hex2rgb(randomColor);

    if (redRef.current) {
      redRef.current.value = String(r);
    }

    if (greenRef.current) {
      greenRef.current.value = String(g);
    }

    if (blueRef.current) {
      blueRef.current.value = String(b);
    }

    if (balanceRef.current) {
      balanceRef.current.value = String(randomBalance);
    }

    updateUrl({
      shade: randomColor.replace('#', ''),
      balance: randomBalance,
    });

    recalculateSchema(`#${randomColor}`, randomBalance, keepBW);
  }

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const red = parseInt(redRef?.current?.value || '0', 10);
    const green = parseInt(greenRef?.current?.value || '0', 10);
    const blue = parseInt(blueRef?.current?.value || '0', 10);

    let updatedColor = rgb2hex(
      name === 'red' ? parseInt(value, 10) : red,
      name === 'green' ? parseInt(value, 10) : green,
      name === 'blue' ? parseInt(value, 10) : blue
    );

    const updatedBalance = parseFloat(balanceRef?.current?.value || '0.3');

    recalculateSchema(updatedColor, updatedBalance, keepBW);
    updateUrl({
      shade: updatedColor.replace('#', ''),
      balance: updatedBalance
    });
  };

  const debouncedHandleSliderChange = debounce(handleSliderChange, 400);
  const onSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.persist();
    debouncedHandleSliderChange(event);
  };

  const handleBWChange = () => {
    const updated = !keepBW;
    recalculateSchema(`#${urlShade}`, urlBalance, updated);
    updateUrl({keepBW: updated});
  }

  return {
    t,
    redRef,
    greenRef,
    blueRef,
    balanceRef,
    sliders,
    handlerandomClick,
    keepBW,
    color: `#${urlShade}`,
    handleSliderChange: onSliderChange,
    handleBWChange,
  };
};

export default useSettings;
