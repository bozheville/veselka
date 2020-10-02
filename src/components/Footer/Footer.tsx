import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/core';
import { FooterProps } from './Footer.d';
import { useTranslation } from 'react-i18next';

const Footer: React.FC<FooterProps> = ({
  menuItems,
}) => {
  const { t } = useTranslation('footer');
  return (
    <Box
      as="footer"
      bg="gray.800"
      p="1rem"
      pb="1.5rem"
      color="white"
      fontSize="0.75rem"
      textAlign="center"
    >
      <Box
        display="flex"
        flexDirection={['column','column', 'row', 'row']}
        justifyContent={["space-around","space-around",'center','center']}
      >
        {menuItems.map((item) => (
          <Text padding="4"key={`menu-${item.link}`}>
            <Link to={item.link}>{t(`menuItems.${item.titleKey}`)}</Link>
          </Text>
        ))}

        <Text padding="4">
          <a
            href="https://github.com/bozheville/veselka/issues/new"
            target="_blank"
          >
            {t(`menuItems.suggest_a_feature`)}
          </a>
        </Text>
        <Text padding="4">
          <a
            href="https://github.com/bozheville/veselka/issues/new?labels=bug&body=OS:%3Cwindows/linux/macOS%3E%0D%0Abrowser:%3Cchrome/firefox/safari%3E%0D%0ASteps%20to%20reproduce:"
            target="_blank"
          >
            {t(`menuItems.report_a_bug`)}
          </a>
        </Text>

      </Box>
      <p>{t('created_by')}</p>
    </Box>
  );
};

Footer.displayName = 'Footer';

export default Footer;
