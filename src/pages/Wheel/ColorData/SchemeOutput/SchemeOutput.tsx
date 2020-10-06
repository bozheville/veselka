import React from 'react';
import {
  Box,
  Textarea,
  Radio,
  RadioGroup,
  IconButton,
} from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';
import { SchemeOutputProps } from './SchemeOutput.d';
import useSchemeOutput from './useSchemeOutput';

const SchemaOutput: React.FC<SchemeOutputProps> = ({
  colorAlias,
  value,
}) => {
  const { t } = useTranslation('details');

  const {
    exportType,
    handleExportTypeChange,
    output,
    handleCopyClick,
    outputRef,
  } = useSchemeOutput(value, colorAlias, t);

  return (
    <Box marginTop="1rem" position="relative">
      <RadioGroup
        value={exportType}
        isInline
        onChange={handleExportTypeChange}
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
        value={output}
        height="10rem"
        backgroundColor="gray.700"
        isReadOnly={true}
      />
    </Box>
  );
};

SchemaOutput.displayName = 'SchemaOutput';

export default SchemaOutput;
