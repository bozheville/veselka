import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Image, Text } from '@chakra-ui/core';
import Button from '../Button';
import { FooterProps } from './Footer.d';
import coffeeImage from './bmc-logo-64.png';

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
            <Link to={item.link}>{t(`menu_items.${item.titleKey}`)}</Link>
          </Text>
        ))}

        <Text padding="4">
          <a
            href="https://github.com/bozheville/veselka/issues/new"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t(`menu_items.suggest_a_feature`)}
          </a>
        </Text>
        <Text padding="4">
          <a
            href="https://github.com/bozheville/veselka/issues/new?labels=bug&template=bug_report.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t(`menu_items.report_a_bug`)}
          </a>
        </Text>

      </Box>
      <Box marginBottom="4">
        <Button
          as="a"
          href="https://www.buymeacoffee.com/denysgrybov"
          target="_blank"
          variantColor="pink"
          size="xs"
        >
          <Image
            src={coffeeImage}
            height="4"
            marginRight="2"
          />
          Buy me a coffee
        </Button>
      </Box>
      <p>{t('created_by')}</p>
    </Box>
  );
};

Footer.displayName = 'Footer';

export default Footer;
