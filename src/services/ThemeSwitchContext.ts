

import React from 'react';

type Setter = (value: boolean) => boolean;

interface ContextValue {
  isLightTheme: boolean,
  setIsLightTheme: (value: boolean|Setter) => void;
}

const ThemeSwitchContext = React.createContext<ContextValue>({
  isLightTheme: false,
  setIsLightTheme: (value) => null,
});

export default ThemeSwitchContext;
