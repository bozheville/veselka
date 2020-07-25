import React, { useEffect, useState } from 'react';
import { CircleProps } from './types';
import WheelContext from './WheelContext';
import Sector from './Sector';
import Arc from './Arc';

const Circle: React.FC<CircleProps> = ({
  colors,
  size = 600,
}) => {
  const [center, setCenter] = useState({x:0,y:0});
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    setRadius(size/2);
    setCenter({x: size/2, y: size/2});
  }, [size]);

  const wheelContextValue = { center, radius };

  const dAngle = 360/3;
  const dAngleTertiary = 360/6;


  const sectors = colors.slice(0, 3).map((color, index) => ({
    color,
    radius: radius/3,
    from: index * dAngle,
    to: (index+1)*dAngle,
  }));

  const arcs = colors.slice(3, 6).map((color, index) => ({
    color,
    radius: radius*2/3,
    thickness: radius/3,
    startAngle: 60 + index * dAngle,
    endAngle: 60 + (index+1)*dAngle,
  }));

  const tertiary = colors.slice(6).map((color, index) => ({
    color,
    radius: radius,
    thickness: radius/3,
    startAngle: index * dAngleTertiary,
    endAngle: (index+1)*dAngleTertiary,
  }));

  return (
    <WheelContext.Provider value={wheelContextValue}>
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
    >
      {sectors.map(sector => (
        <Sector {...sector} key={sector.color} />
      ))}
      {arcs.map(arc => (
        <Arc {...arc} key={arc.color} />
      ))}
      {tertiary.map(arc => (
        <Arc {...arc} key={arc.color} />
      ))}
    </svg>
    </WheelContext.Provider>
  );
};

Circle.displayName = 'Circle';

export default Circle;
