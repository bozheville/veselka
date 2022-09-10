import { useContext } from 'react';
import { useTranslation } from 'next-i18next';

import { plausible } from 'services/plausible';
import ThemeSwitchContext from 'services/ThemeSwitchContext';

export const useHeader = () => {
  const { t } = useTranslation('footer');
  const { isLightTheme, setIsLightTheme } = useContext(ThemeSwitchContext);

  const handleSwitchTheme = () => setIsLightTheme(!isLightTheme);
  const handleCoffeeClick = () => plausible('buy-me-a-coffee');

  return {
    handleCoffeeClick,
    handleSwitchTheme,
    isLightTheme,
    t,
  };
};
