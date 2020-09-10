import React, { useEffect, useState } from 'react';
import { CircleProps } from './circle.d';
import WheelContext from '../WheelContext';
import Sector from './Sector';
import Arc from './Arc';
import styled from '@emotion/styled';

const SvgWrapper = styled.svg`
  min-height: 40vh;
  flex-direction: column;
  flex-grow: 1;
`;

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


  const sectors = [
    colors.RED,
    colors.BLUE,
    colors.YELLOW,
  ].map((color, index) => ({
    color,
    radius: radius/3,
    from: index * dAngle,
    to: (index+1)*dAngle,
  }));

  const arcs = [
    colors.VIOLET,
    colors.GREEN,
    colors.ORANGE,
  ].map((color, index) => ({
    color,
    radius: radius*2/3,
    thickness: radius/3,
    startAngle: 60 + index * dAngle,
    endAngle: 60 + (index+1)*dAngle,
  }));

  const tertiary = [
    colors.RED_ORANGE,
    colors.RED_VIOLET,
    colors.BLUE_VIOLET,
    colors.BLUE_GREEN,
    colors.YELLOW_GREEN,
    colors.YELLOW_ORANGE,
  ].map((color, index) => ({
    color,
    radius: radius,
    thickness: radius/3,
    startAngle: index * dAngleTertiary,
    endAngle: (index+1)*dAngleTertiary,
  }));

  return (
    <WheelContext.Provider value={wheelContextValue}>
    <SvgWrapper
      viewBox={`0 0 ${size} ${size}`}
    >
      <rect x="0" y={size/2} width={size/2} height={size/2} fill={colors.WHITE} />
      <rect x={size/2} y="0" width={size/2} height={size/2} fill={colors.GRAY} />
      <rect x={size/2} y={size/2} width={size/2} height={size/2} fill={colors.BLACK} />

      {sectors.map(sector => (
        <Sector {...sector} key={sector.color} />
      ))}
      {arcs.map(arc => (
        <Arc {...arc} key={arc.color} />
      ))}
      {tertiary.map(arc => (
        <Arc {...arc} key={arc.color} />
      ))}
    </SvgWrapper>
    </WheelContext.Provider>
  );
};

Circle.displayName = 'Circle';

export default Circle;
