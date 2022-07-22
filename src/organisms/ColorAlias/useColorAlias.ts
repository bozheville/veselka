import { useCallback, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';

import { orderedColors, defaultColorAlias } from 'services/constants';
import { ColorAlias, Color } from 'types';

interface UseColorAlias {
  defaultValue: ColorAlias;
  onChange: (value: ColorAlias) => void;
}

const useColorAlias = ({
  defaultValue: colorAlias,
  onChange,
}: UseColorAlias) => {
  const { t } = useTranslation('details');

  const [ isColorAliasVisible, setisColorAliasVisible ] = useState<boolean>(false);
  const { register, handleSubmit, errors, reset, getValues } = useForm();

  const handleAliasExpand = useCallback(() => {
    setisColorAliasVisible(true);

    const values = orderedColors.reduce((result, color) => ({
      ...result,
      [`color_alias_${color}`]: colorAlias[color] || '',
    }), {});

    reset(values);
  }, [colorAlias, reset]);

  const handleFormSubmit = useCallback(handleSubmit((data: ColorAlias) => {
    const normalizedData = Object.entries(data)
      .filter(([color, value]) => value)
      .reduce((result, [color, value]) => ({
        ...result,
        [color.replace('color_alias_', '')]: value,
      }), {}) as ColorAlias;

      onChange(normalizedData);
  }), [onChange]);

  const validate = useCallback((value) => {
    if (!/^[A-Za-z_-]*$/.test(value)) {
      return t('color_error') as string;
    }

    if (value) {
      const values = getValues();

      const { length } = Object.entries(values)
        .filter(
          ([key, val]) => (val || defaultColorAlias[key.replace('color_alias_', '') as Color]) === value
        );

      if (length > 1) {
        return t('color_duplicated_error') as string;
      }
    }
  }, [getValues, t]);

  return {
    isColorAliasVisible,
    errors,
    handleFormSubmit,
    handleAliasExpand,
    register,
    validate,
    t,
  };
};

export default useColorAlias;
