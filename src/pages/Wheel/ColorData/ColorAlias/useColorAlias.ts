import { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import UrlContext from 'services/UrlContext';

import { orderedColors, defaultColorAlias } from '../constants';
import { ColorAliasList } from './colorAlias.d';

const useColorAlias = () => {
  const { t } = useTranslation('details');

  const [ isColorAliasVisible, setisColorAliasVisible ] = useState<boolean>(false);
  const { colorAlias, updateUrl } = useContext(UrlContext);
  const { register, handleSubmit, errors, reset, getValues } = useForm();

  const handleAliasExpand = useCallback(() => {
    setisColorAliasVisible(true);

    const values = orderedColors.reduce((result, color, index) => ({
      ...result,
      [`color_alias_${color}`]: colorAlias[color] || ''
    }), {});

    reset(values);
  }, []);

  const handleFormSubmit = useCallback(handleSubmit((data: ColorAliasList) => {
    const normalizedData: ColorAliasList = Object
      .keys(data)
      .filter(key => data[key])
      .reduce((result, key) => ({
        ...result,
        [key.replace('color_alias_', '')]: data[key],
      }), {});

      updateUrl({
        colorAlias: normalizedData,
      })
  }), [updateUrl]);

  const validate = useCallback((value) => {
    if (!/^[A-Za-z_-]*$/.test(value)) {
      return t('color_error') as string;
    }

    if (value) {
      const values = getValues();

      const { length } = Object.entries(values)
        .filter(
          ([key, val]) => (val || defaultColorAlias[key.replace('color_alias_', '')]) === value
        );

      if (length > 1) {
        return 'Duplicated names not allowed';
      }
    }
  }, [getValues]);

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
