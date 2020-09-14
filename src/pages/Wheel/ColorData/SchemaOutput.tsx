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

const SchemaOutput: React.FC<SchemaOutputProps> = ({
  exportType,
  value,
  onExportTypeChange,
}) => {
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const toast = useToast();

  const handleCopyClick = useCallback(() => {
    outputRef?.current?.select();
    document.execCommand('copy');
    toast({
      description: "Color schema copied to clipboard",
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
      >
        <Radio value="json">JSON</Radio>
        <Radio value="sass">SASS/LESS</Radio>
      </RadioGroup>
      <IconButton
        icon="copy"
        aria-label="copy"
        onClick={handleCopyClick}
        position="absolute"
        bottom="4"
        right="4"
        zIndex={2}
        variantColor="transparent"
      />
      <Textarea
        ref={outputRef}
        value={value}
        height="10rem"
        backgroundColor="#444"
        isReadOnly={true}
      />
    </Box>
  );
};

SchemaOutput.displayName = 'SchemaOutput';

export default SchemaOutput;
