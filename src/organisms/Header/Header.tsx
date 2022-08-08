import React, { useContext } from 'react';
import Image from 'next/image';
import { Box, IconButton, Image as ChakraImage } from '@chakra-ui/core';

import { useTranslation } from 'next-i18next';
import Container from 'components/Container';
import Button from 'components/Button';
import ThemeSwitchContext from 'services/ThemeSwitchContext';

export const useHeader = () => {
  const { t } = useTranslation('footer');
  const { isLightTheme, setIsLightTheme } = useContext(ThemeSwitchContext);

  const handleSwitchTheme = () => setIsLightTheme(!isLightTheme);

  return {
    handleSwitchTheme,
    isLightTheme,
    t,
  };
};

const Header: React.FC = () => {
  const {
    handleSwitchTheme,
    isLightTheme,
    t,
  } = useHeader();


  return (
    <Box borderBottom="1px solid indianred">
      <Container
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
      >
        <Image
          src="/images/veselka_logo.svg"
          width={100}
          height={32}
          alt="Veselka"
        />
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <Button
            as="a"
            href="https://www.buymeacoffee.com/denysgrybov"
            target="_blank"
            variantColor="purple"
            size="sm"
            mr={4}
          >
            <ChakraImage
              src="/images/bmc-logo-64.png"
              height="4"
              width="3"
              marginRight="2"
              alt={t('buy_me_a_coffee')}
            />
            {t('buy_me_a_coffee')}
          </Button>
          <IconButton
            aria-label="Switch theme"
            icon={isLightTheme ? 'moon' : 'sun'}
            variantColor={isLightTheme ? 'yellow' : 'purple'}
            size="sm"
            onClick={handleSwitchTheme}
          />
        </Box>
      </Container>
    </Box>
  );
};

Header.displayName = 'Header';

export default Header;
