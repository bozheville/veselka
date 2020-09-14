import React, { useEffect, useMemo, useState } from 'react';
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

const dAngle = 360/3;
const dAngleTertiary = 360/6;

const Circle: React.FC<CircleProps> = ({
  colors,
  size = 600,
}) => {
  const [center, setCenter] = useState({ x:0, y:0 });
  const [radius, setRadius] = useState(0);

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
      colors.RED,
      colors.BLUE,
      colors.YELLOW,
    ].map((color, index) => ({
      color,
      radius: radius*2/4,
      thickness: radius/4,
      startAngle: index * dAngle,
      endAngle: (index+1)*dAngle,
    }));

    const secondary = [
      colors.VIOLET,
      colors.GREEN,
      colors.ORANGE,
    ].map((color, index) => ({
      color,
      radius: radius*3/4,
      thickness: radius/4,
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
      radius,
      thickness: radius/4,
      startAngle: index * dAngleTertiary,
      endAngle: (index+1)*dAngleTertiary,
    }));

    return [basicColors, [...primary, ...secondary, ...tertiary]];
  }, [colors, radius]);

  return (
    <WheelContext.Provider value={wheelContextValue}>
      <SvgWrapper viewBox={`0 0 ${size} ${size}`}>
        {basic.map(sector => <Sector {...sector} key={sector.color} />)}
        {arcs.map(arc => <Arc {...arc} key={arc.color} />)}
      </SvgWrapper>
    </WheelContext.Provider>
  );
};

Circle.displayName = 'Circle';

export default Circle;
