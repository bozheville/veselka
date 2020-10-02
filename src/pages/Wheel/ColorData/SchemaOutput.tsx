import React, { useCallback, useRef } from 'react';
import { SchemaOutputProps } from './colorData.d';
import {
  Box,
  Textarea,
  Radio,
  RadioGroup,
  IconButton,
  useToast,
} from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';

const SchemaOutput: React.FC<SchemaOutputProps> = ({
  exportType,
  value,
  onExportTypeChange,
}) => {
  const { t } = useTranslation('details');
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const toast = useToast();

  const handleCopyClick = useCallback(() => {
    outputRef?.current?.select();
    document.execCommand('copy');
    toast({
      description: t('toast'),
      status: "success",
      duration: 3000,
      isClosable: true,
    })
  }, [toast]);

  return (
    <Box marginTop="1rem" position="relative">
      <RadioGroup
        value={exportType}
        isInline
        onChange={onExportTypeChange}
        variantColor="purple"
      >
        <Radio value="json">{t('types.json')}</Radio>
        <Radio value="sass">{t('types.sass')}</Radio>
      </RadioGroup>
      <IconButton
        icon="copy"
        aria-label="copy"
        onClick={handleCopyClick}
        position="absolute"
        bottom="4"
        right="4"
        zIndex={2}
        variantColor="purple"
      />
      <Textarea
        ref={outputRef}
        value={value}
        height="10rem"
        backgroundColor="gray.700"
        isReadOnly={true}
      />
    </Box>
  );
};

SchemaOutput.displayName = 'SchemaOutput';

export default SchemaOutput;
