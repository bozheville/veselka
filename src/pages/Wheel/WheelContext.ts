import { createContext } from 'react';

const WheelContext = createContext({
  center: {
    x:0,
    y:0,
  },
  radius: 0,
});

export default WheelContext;
