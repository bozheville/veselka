import { createContext } from 'react';

const CircleContext = createContext({
  center: {
    x:0,
    y:0,
  },
  radius: 0,
});

export default CircleContext;
