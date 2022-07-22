import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';

import { CircleProps } from './circle.d';
import WheelContext from './WheelContext';
import Sector from './Sector';
import Arc from './Arc';

const SvgWrapper = styled.svg`
  min-height: 40vh;
  flex-direction: column;
  flex-grow: 1;
`;

const dAngle = 360/3;
const dAngleTertiary = 360/6;

const Circle: React.FC<CircleProps> = ({
  colors,
  size = 600,
}) => {
  const [center, setCenter] = useState({x: size/2, y: size/2});
  const [radius, setRadius] = useState(size/2);

  useEffect(() => {
    setRadius(size/2);
    setCenter({x: size/2, y: size/2});
  }, [size]);

  const wheelContextValue = { center, radius };

  const [basic, arcs] = useMemo(() => {
    const basicColors = [
      colors.BLACK,
      colors.GRAY,
      colors.WHITE,
    ].map((color, index) => ({
      color,
      radius: radius/4,
      from: index * dAngle,
      to: (index+1)*dAngle,
    }));

    const primary = [
      'RED',
      'BLUE',
      'YELLOW',
    ].map((color, index) => ({
      color: colors[color],
      radius: radius*2/4,
      thickness: radius/4,
      name: color,
      startAngle: index * dAngle,
      endAngle: (index+1)*dAngle,
    }));

    const secondary = [
      'VIOLET',
      'GREEN',
      'ORANGE',
    ].map((color, index) => ({
      color: colors[color],
      radius: radius*3/4,
      thickness: radius/4,
      name: color,
      startAngle: 60 + index * dAngle,
      endAngle: 60 + (index+1)*dAngle,
    }));

    const tertiary = [
      'RED_ORANGE',
      'RED_VIOLET',
      'BLUE_VIOLET',
      'BLUE_GREEN',
      'YELLOW_GREEN',
      'YELLOW_ORANGE',
    ].map((color, index) => ({
      radius,
      color: colors[color],
      thickness: radius/4,
      name: color,
      startAngle: index * dAngleTertiary,
      endAngle: (index+1)*dAngleTertiary,
    }));

    return [basicColors, [...primary, ...secondary, ...tertiary]];
  }, [colors, radius]);

  return (
    <WheelContext.Provider value={wheelContextValue}>
      <SvgWrapper viewBox={`0 0 ${size} ${size}`}>
        {basic.map(sector => <Sector {...sector} key={sector.color} />)}
        {arcs.map(arc => <Arc {...arc} key={`${arc.name}-${arc.color}`} />)}
      </SvgWrapper>
    </WheelContext.Provider>
  );
};

Circle.displayName = 'Circle';

export default Circle;
