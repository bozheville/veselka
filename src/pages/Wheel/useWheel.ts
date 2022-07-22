import { useCallback, useContext } from 'react';
import { useTranslation } from 'next-i18next';

import { ColorAlias as TColorAlias } from 'types';
import UrlContext from 'services/UrlContext';
import ColorSchemaContext from 'services/ColorSchemaContext';
import { useCookie } from 'hooks';

export const useWheel = (isWelcomeClosed: boolean) => {
  const { t } = useTranslation('pages');
  const [ wasWelcomeClosed, setIsWelcomeClosed ] = useCookie<boolean>('isWelcomeClosed', isWelcomeClosed);
  const handleWelcomeClose = useCallback(() => setIsWelcomeClosed(true), [setIsWelcomeClosed]);
  const {
    shade,
    balance,
    colorAlias,
    updateUrl,
  } = useContext(UrlContext);
  const {colors, schema} = useContext(ColorSchemaContext);

  const handleAliasChange = useCallback((updatedAlias: TColorAlias) => {
    updateUrl({
      colorAlias: updatedAlias,
    });
  }, [updateUrl]);

  return {
    t,
    wasWelcomeClosed,
    handleWelcomeClose,
    colorAlias,
    colors,
    schema,
    handleAliasChange,
    shade,
    balance,
  };
};
