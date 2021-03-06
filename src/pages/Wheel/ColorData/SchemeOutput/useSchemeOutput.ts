import { useCallback, useContext, useEffect, useState, useRef } from 'react';
import { useToast } from '@chakra-ui/core';
import { TFunction } from 'i18next';

import UrlContext from 'services/UrlContext';
import { ColorAlias, ColorSchema } from '../colorData.d';
import { shadesList, defaultColorAlias } from '../constants';

const KEY_COLORS = ['BLACK', 'WHITE'];

const getSassSchema = (colorAlias: ColorAlias, schema: ColorSchema) => {
  const sassSchema = [];

  for (const key of Object.keys(schema)) {
    if (KEY_COLORS.includes(key)) {
      const varName = `@color-${colorAlias[key] || defaultColorAlias[key]}`;
      sassSchema.push(`${varName}: ${schema[key][500]};`);
    } else {
      for (const saturation of shadesList) {
        const varName = `@color-${colorAlias[key] || defaultColorAlias[key]}--${saturation}`;
        sassSchema.push(`${varName}: ${schema[key][saturation]};`);
      }
    }

    sassSchema.push('');
  }

  return sassSchema.join('\n');
};

const getJSONSchema = (colorAlias: ColorAlias, schema: ColorSchema) => {
  const jsonSchema: ColorSchema = {};

  for (const key of Object.keys(schema)) {
    const outputKey = colorAlias[key] || defaultColorAlias[key];
    const outputValue = KEY_COLORS.includes(key)
      ? schema[key][500]
      : schema[key];
    jsonSchema[outputKey] = outputValue;
  }

  return JSON.stringify(jsonSchema, null, 2);
};

const useSchemeOutput = (value: ColorSchema, t: TFunction) => {
  const [ output, setOutput ] = useState<string>('');
  const [ exportType, setExportType ] = useState<string>('json');
  const toast = useToast();
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const { colorAlias } = useContext(UrlContext);

  useEffect(() => {
    let outputString = '';

    switch (exportType) {
      case 'sass':
        outputString = getSassSchema(colorAlias, value);
        break;
      case 'json':
        outputString = getJSONSchema(colorAlias, value);
        break;
    }

    setOutput(outputString);
  }, [colorAlias, value, exportType]);

  const handleExportTypeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setExportType(event.target.value);
  }, []);

  const handleCopyClick = useCallback(() => {
    outputRef?.current?.select();
    document.execCommand('copy');
    toast({
      description: t('toast'),
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, [toast, t]);

  return {
    output,
    exportType,
    handleExportTypeChange,
    handleCopyClick,
    outputRef,
  }
};

export default useSchemeOutput;
