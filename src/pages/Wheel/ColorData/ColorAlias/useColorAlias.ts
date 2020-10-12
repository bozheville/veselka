import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import useLink from 'hooks/useLink';

import { UrlProps } from '../../types';
import { orderedColors, defaultColorAlias } from '../constants';
import { ColorAliasList } from './colorAlias.d';

const useColorAlias = () => {
  const { t } = useTranslation('details');

  const [ isColorAliasVisible, setisColorAliasVisible ] = useState<boolean>(false);
  const { updateURL, queryParams } = useLink<UrlProps>();

  const { register, handleSubmit, errors, reset, getValues } = useForm();

  const handleAliasExpand = useCallback(() => {
    setisColorAliasVisible(true);

    const urlValue = queryParams?.a?.split('~').reduce((result, alias, index) => ({
      ...result,
      [`color_alias_${orderedColors[index]}`]: alias || ''
    }), {});

    reset(urlValue);
  }, []);

  const handleFormSubmit = useCallback(handleSubmit((data: ColorAliasList) => {
    const normalizedData: ColorAliasList = Object
      .keys(data)
      .filter(key => data[key])
      .reduce((result, key) => ({
        ...result,
        [key.replace('color_alias_', '')]: data[key],
      }), {});

      updateURL({
        a: orderedColors.map(
          (color) => defaultColorAlias[color] !== normalizedData[color]
            ? normalizedData[color]
            : ''
        ).join('~'),
      })
  }), []);

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

  const handleAliasChange = useCallback((value: ColorAliasList) => {
    const urlAProp = orderedColors.map(
      (color) => defaultColorAlias[color] !== value[color]
        ? value[color]
        : ''
    ).join('~');

    //  ____                                                ___   _____
    // |  _ \    ___   _ __ ___     ___   __   __   ___    |_ _| |_   _|
    // | |_) |  / _ \ | '_ ` _ \   / _ \  \ \ / /  / _ \    | |    | |
    // |  _ <  |  __/ | | | | | | | (_) |  \ V /  |  __/    | |    | |
    // |_| \_\  \___| |_| |_| |_|  \___/    \_/    \___|   |___|   |_|
    //
    console.log('urlAProp', urlAProp);
    // ^^^^^^^^


    updateURL({
      a: urlAProp,
    })
  }, [updateURL]);

  return {
    isColorAliasVisible,
    errors,
    handleFormSubmit,
    handleAliasExpand,
    register,
    validate,
    handleAliasChange,
    t,
  };
};

export default useColorAlias;
