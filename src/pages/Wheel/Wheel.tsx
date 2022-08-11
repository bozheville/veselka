import React from 'react';
import Script from 'next/script';
import { Flex } from '@chakra-ui/core';

import { Page, Welcome } from 'components';
import {
  Circle,
  ColorAlias,
  SchemeOutput,
  Spectre,
  Header,
} from 'organisms';

import { IWheelProps } from './types';
import Settings from './Settings';
import { useWheel } from './useWheel';

const Wheel: React.FC<IWheelProps> = ({
  isWelcomeClosed,
}) => {
  const {
    t,
    wasWelcomeClosed,
    handleWelcomeClose,
    colorAlias,
    colors,
    schema,
    handleAliasChange,
    shade,
    balance,
  } =  useWheel(isWelcomeClosed);

  return (
    <>
    <Script id="pls-src" defer data-domain="alpha.veselka.app" src="https://p.veselka.app/js/script.js" />
    <Script id="pls-init" strategy="afterInteractive" dangerouslySetInnerHTML={{
      __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`
    }} />
    <Header />
    <Page title={t('wheel.title')}>
      <Welcome isVisible={!wasWelcomeClosed} onClose={handleWelcomeClose} />
      <Flex
        justifyContent="space-between"
        flexDirection={['column', 'column', 'row', 'row']}
      >
        <Flex
          flexDirection={['row', 'row', 'column', 'column']}
          width={['100%', '100%', '67%', '70%']}
          maxHeight={['45vh', '45vh', '80vh', null]}
          marginBottom={['2rem', '2rem', 0, 0]}
        >
          <Circle colors={colors} size={450} />
        </Flex>
        <Flex
          flexDirection={['row', 'row', 'column', 'column']}
          width={['100%', '100%', '33%', '30%']}
          paddingLeft={['0', '0', '4', '0']}
        >
          <Settings defaultColor={shade} defaultBalance={balance} />
        </Flex>
      </Flex>
      <Spectre value={schema} />
      <ColorAlias
        defaultValue={colorAlias}
        schema={schema}
        onChange={handleAliasChange}
      />
      <SchemeOutput value={schema} colorAlias={colorAlias} />
    </Page>
    </>
  );
};

Wheel.displayName = 'Wheel';

export default Wheel;
