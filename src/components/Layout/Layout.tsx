import React from 'react';
import { Box } from '@chakra-ui/core';

import Footer from '../Footer';

import { ILayoutProps } from './types';

const Layout: React.FC<ILayoutProps> = ({
  menuItems,
  children
}) => {
  return (
    <>
      <Box
        as="section"
        flex="1 0 auto"
      >
        {children}
      </Box>
      <Footer menuItems={menuItems} />
    </>
  );
};

Layout.displayName = 'Layout';

export default Layout;
