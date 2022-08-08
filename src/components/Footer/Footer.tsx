import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Box, Text } from '@chakra-ui/core';
import { FooterProps } from './Footer.d';

const Footer: React.FC<FooterProps> = ({
  menuItems,
}) => {
  const { t } = useTranslation('footer');

  return (
    <Box
      as="footer"
      bg="footerBackground"
      p="1rem"
      pb="1.5rem"
      color="textColor"
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
            <Link href={item.link} passHref={true}>
            <a>{t(`menu_items.${item.titleKey}`)}</a>
            </Link>
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
      <p>{t('created_by')}</p>
    </Box>
  );
};

Footer.displayName = 'Footer';

export default Footer;
