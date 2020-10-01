import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/core';
import { FooterProps } from './Footer.d';

const Footer: React.FC<FooterProps> = ({
  menuItems,
}) => {
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
            <Link to={item.link}>{item.title}</Link>
          </Text>
        ))}

        <Text padding="4">
          <a href="https://github.com/bozheville/veselka/issues/new" target="_blank">Suggest a feature</a>
        </Text>
        <Text padding="4">
          <a href="https://github.com/bozheville/veselka/issues/new?labels=bug&body=OS:%3Cwindows/linux/macOS%3E%0D%0Abrowser:%3Cchrome/firefox/safari%3E%0D%0ASteps%20to%20reproduce:" target="_blank">Report a bug</a>
        </Text>

      </Box>
      <p>Created by Denys Grybov in 2020</p>
    </Box>
  );
};

Footer.displayName = 'Footer';

export default Footer;
