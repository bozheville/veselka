import React from 'react';
import { IWheelContainerProps } from './types';
import Wheel from './Wheel';

const WheelContainer: React.FC<IWheelContainerProps> = (props) => {
  // const {  } = match.params;

  return (
    <Wheel {...props} />
  );
};

WheelContainer.displayName = 'WheelContainer';

export default WheelContainer;
