import { useCallback, useState, useRef, useEffect } from 'react';
import { useToast } from '@chakra-ui/core';
import { TFunction } from 'i18next';

import { ColorAlias, ColorSchema } from 'types';
import { getJSONSchema, getSassSchema } from './converters';
import { plausible } from 'services/plausible';

interface UseSchemeOutput {
  value: ColorSchema;
  colorAlias: ColorAlias;
  t: TFunction;
}

const useSchemeOutput = ({
  value,
  colorAlias,
  t,
}: UseSchemeOutput) => {
  const [ output, setOutput ] = useState<string>('');
  const [ exportType, setExportType ] = useState<string>('json');
  const toast = useToast();
  const outputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setOutput(
      exportType === 'json'
        ? getJSONSchema(colorAlias as ColorAlias, value)
        : getSassSchema(colorAlias as ColorAlias, value)
    );
  }, [value, colorAlias, exportType]);

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

    plausible('copy-scheme', {props: {format: exportType}});
  }, [toast, t]);

  return {
    output,
    exportType,
    handleExportTypeChange,
    handleCopyClick,
    outputRef,
  };
};

export default useSchemeOutput;
