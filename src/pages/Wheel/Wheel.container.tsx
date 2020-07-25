import React from 'react';
import { IWheelContainerProps } from './types';
import Wheel from './Wheel';

const WheelContainer: React.FC<IWheelContainerProps> = () => {
  // const {  } = match.params;

  return (
    <Wheel />
  );
};

WheelContainer.displayName = 'WheelContainer';

export default WheelContainer;
