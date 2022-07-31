import { useRef } from 'react';
import { useToast } from '@chakra-ui/core';
import { useTranslation } from 'next-i18next';

export const useSpectre = () => {
  const { t } = useTranslation('details');
  const toast = useToast();
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleClick = (colorCode: string) => () => {
    if (ref.current) {
      ref.current.value = colorCode;
      ref?.current?.select();
      document.execCommand('copy');
    };

    toast({
      description: t('hex_copied_to_clipboard', {color: colorCode}),
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return { handleClick, ref };
};
